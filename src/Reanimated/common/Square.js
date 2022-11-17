import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'

const N = 12
const SQUARE_SIZE = 12
const offset = (2 * Math.PI) / N

const Square = ({ index, progress }) => {
  const finalAngle = offset * (N - 1 - index)

  const rotate = useDerivedValue(() => {
    if (progress.value <= (2 * Math.PI)) {
      return Math.min(finalAngle, progress.value)
    }

    if (progress.value - (2 * Math.PI) < finalAngle) {
      return finalAngle
    }
    return progress.value
  }, [])

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE)
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE)
    }
    return withTiming(- index * SQUARE_SIZE)
  }, [])

  const rStyle = useAnimatedStyle(() => {
    const transform = [
      { rotate: `${rotate.value}rad` },
      { translateY: translateY.value },
    ]

    return {
      transform
    }
  })

  return (
    <Animated.View style={[
      styles.square,
      rStyle
    ]} />
  )
}

const styles = StyleSheet.create({
  square: {
    height: SQUARE_SIZE,
    aspectRatio: 1,
    backgroundColor: 'white',
    position: 'absolute'
  }
})

export default Square