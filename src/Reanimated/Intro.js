import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from "react-native-reanimated";

const SIZE = 100

const handleRotation = (progress) => {
  'worklet'
  return `${progress.value * 2 * Math.PI}rad`
}

const Intro = () => {
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  useEffect(() => {
   progress.value = withRepeat(withSpring(0.5), 3, true)
   scale.value = withRepeat(withSpring(1), 3, true) // second parameter - num of repetitions, third parameter - reverse

   // Infinite with - 1
   // progress.value = withRepeat(withSpring(0.5), -1, true)
   // scale.value = withRepeat(withSpring(1), -1, true) 
  }, [])

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * SIZE / 2,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(progress) }
      ]
    }
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mainContainer, reanimatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContainer: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'blue'
  }
})

export default Intro