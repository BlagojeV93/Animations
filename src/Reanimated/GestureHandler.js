import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SIZE = 80

const useFollowAnimatedPosition = ({ x, y }) => {

  const followX = useDerivedValue(() => {
    return withSpring(x.value)
  })

  const followY = useDerivedValue(() => {
    return withSpring(y.value)
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: followX.value },
        { translateY: followY.value }
      ]
    }
  })

  return { followX, followY, rStyle }
}

const GestureHandler = () => {

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const context = useSharedValue({ x: 0, y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value }
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x
      translateY.value = event.translationY + context.value.y
    })
    .onEnd(() => {
      if (translateX.value < SCREEN_WIDTH / 2) {
        translateX.value = 0
      } else {
        translateX.value = SCREEN_WIDTH - SIZE
      }
    })

  const { followX: blueX, followY: blueY, rStyle: blueStyle } = useFollowAnimatedPosition({ x: translateX, y: translateY })
  const { followX: redX, followY: redY, rStyle: redStyle } = useFollowAnimatedPosition({ x: blueX, y: blueY })
  const { rStyle: greenStyle } = useFollowAnimatedPosition({ x: redX, y: redY })

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.circleStyle, greenStyle, { backgroundColor: 'green' }]} />
      <Animated.View style={[styles.circleStyle, redStyle, { backgroundColor: 'red' }]} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circleStyle, blueStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  circleStyle: {
    height: SIZE,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: SIZE / 2,
    opacity: 0.8,
    position: 'absolute'
  }
})

export default GestureHandler