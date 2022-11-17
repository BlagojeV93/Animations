import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheetComponent = forwardRef((props, ref) => {
  const isActive = useSharedValue(false)
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  const scrollTo = useCallback((destination) => {
    'worklet'
    console.log(destination)
    isActive.value = destination !== 0
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  const isActiveHandler = useCallback(() => {
    return isActive.value
  }, [])

  useImperativeHandle(ref, () => {
    return { scrollTo, isActiveHandler }
  }, [])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
      if (translateY.value < - SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y)
      } else if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0)
      }
    })

  const rStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    )
    return {
      borderRadius,
      transform: [
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.mainContainer, rStyle]}>
        <View style={styles.line} />
        {props.children}
      </Animated.View>
    </GestureDetector>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2
  }
})

export default BottomSheetComponent