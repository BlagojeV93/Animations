import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'

const questions = [
  "Do you tend to follow directions when given?",
  "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
  "Would you enjoy making sure your customers leave happy?",
  "Are you willing to work nights and weekends (and possibly holidays)?",
]

const { width } = Dimensions.get('screen')

const AnimatedQuestionnaire = () => {
  const [index, setIndex] = useState(0)
  const [animation] = useState(new Animated.Value(0))
  const [progress] = useState(new Animated.Value(0))

  useEffect(() => {
    if (index > 0) {
      animation.setValue(0)
    }
  }, [index])

  const handleAnswer = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 400,
        useNativeDriver: false
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false
      })
    ]).start(() => setIndex(prevIndex => prevIndex + 1))
  }

  const resetAction = () => {
    animation.setValue(0)
    progress.setValue(0)
    setIndex(0)
  }

  const question = questions[index]
  let nextQuetion;
  if (index - 1 < questions.length) {
    nextQuetion = questions[index + 1]
  }

  const mainQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width]
  })

  const nextQuetionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0]
  })

  const progressInterpolate = progress.interpolate({
    inputRange: [0, questions.length],
    outputRange: ['0%', '100%']
  })

  const progressStyle = {
    width: progressInterpolate
  }

  const mainStyle = {
    transform: [
      { translateX: mainQuestionInterpolate }
    ]
  }

  const nextStyle = {
    transform: [
      { translateX: nextQuetionInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>

        <Animated.Text style={[styles.questionText, mainStyle]}>
          {question}
        </Animated.Text>
        <Animated.Text style={[styles.questionText, nextStyle]}>
          {nextQuetion}
        </Animated.Text>

        <View style={styles.progress}>
          <Animated.View style={[styles.bar, progressStyle]} />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleAnswer}
        style={styles.option}
        activeOpacity={0.7}
      >
        <Text style={styles.optionText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAnswer}
        style={[styles.option, styles.yes]}
        activeOpacity={0.7}
      >
        <Text style={styles.optionText}>Yes</Text>
      </TouchableOpacity>
      <Text onPress={resetAction} style={styles.XStyle}>X</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  yes: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  optionText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 50
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionText: {
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    marginHorizontal: 10
  },
  progress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 10
  },
  bar: {
    height: '100%',
    backgroundColor: 'white'
  },
  XStyle: {
    position: 'absolute',
    top: 30,
    right: 30,
    fontSize: 30,
    color: 'white'
  }
})

export default AnimatedQuestionnaire