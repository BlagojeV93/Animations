import React, { useCallback } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import Animated, { useSharedValue, withTiming, useAnimatedProps, useDerivedValue } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ReText } from 'react-native-redash'

const BACKROUND_COLOR = '#444B6F'
const BACKGROUND_STROKE_COLOR = '#303858'
const STROKE_COLOR = '#A6E1FA'

const { width, height } = Dimensions.get('window')

const CIRCLE_LENGTH = 1000 // obim kruga
const R = CIRCLE_LENGTH / (2 * Math.PI) // matematika

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CircularProgressBar = () => {
  const progress = useSharedValue(0)

  const onPress = useCallback(() => {
    progress.value = withTiming(
      progress.value > 0 ? 0 : 1
      , { duration: 2000 })
  }, [])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }))

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  return (
    <View style={styles.container}>
      <ReText style={styles.text} text={progressText} />
      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={20}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={10}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap='round'
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttoText}>Run</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BACKROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 70,
    color: 'rgba(256,256,256, 0.7)'
  },
  button: {
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    position: 'absolute',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttoText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2
  }
})

export default CircularProgressBar