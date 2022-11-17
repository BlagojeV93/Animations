import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native'

const AnimatedProgressBar = () => {
  const [animation] = useState(new Animated.Value(0))
  const [opacity] = useState(new Animated.Value(1))

  const handleOnPress = () => {
    animation.setValue(0)
    opacity.setValue(1)

    Animated.timing(animation, {
      // toValue: 0.6,
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
  }

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  })

  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'orange']
  })

  const progressStyles = {
    // backgroundColor: backgroundInterpolate,
    // width: progressInterpolate,
    // bottom: 0,
    opacity,

    // right: 0,
    // height: progressInterpolate,

    height: 5,
    top: null,
    bottom: 0,
    width: progressInterpolate,
    backgroundColor: 'rgba(255,255,255,0.5)'
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOnPress}>
        <View style={styles.button}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progress, progressStyles]} />
          </View>
          <Text style={styles.buttonText}>Get it!</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: 'hidden'
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0
  }
})

export default AnimatedProgressBar