import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ICON_SIZE = 20
const SLIDER_WIDTH = 170
const MAX_SLIDE_OFFESET = SLIDER_WIDTH * 0.3

const clamp = (value, min, max) => {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

const SlidingCounter = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const [count, setCount] = useState(0)

  const changeCount = useCallback((increment) => {
    runOnJS(setCount(count => increment ? count + 1 : count - 1))
  }, [])

  const resetCount = useCallback(() => {
    runOnJS(setCount(0))
  }, [])

  const panGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      if (translateY.value === 0) {
        translateX.value = clamp(event.translationX, -MAX_SLIDE_OFFESET, MAX_SLIDE_OFFESET)
      }
      translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFESET)
    },
    onEnd: () => {
      if (translateX.value === MAX_SLIDE_OFFESET) {
        runOnJS(changeCount)(true)
      } else if (translateX.value === -MAX_SLIDE_OFFESET) {
        runOnJS(changeCount)()
      } else if (translateY.value === MAX_SLIDE_OFFESET) {
        runOnJS(resetCount)()
      }
      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
    }
  })

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })

  const iconsStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(translateX.value,
      [-MAX_SLIDE_OFFESET, 0, MAX_SLIDE_OFFESET],
      [0.4, 0.8, 0.4]
    )
    const opacityY = interpolate(translateY.value,
      [0, MAX_SLIDE_OFFESET],
      [1, 0]
    )

    return {
      opacity: opacityX * opacityY
    }
  })

  const clearIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value,
      [0, MAX_SLIDE_OFFESET],
      [0, 0.8]
    )
    return {
      opacity
    }
  })

  const rMainStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * 0.1 },
        { translateY: translateY.value * 0.1 }
      ]
    }
  })

  return (
    <GestureHandlerRootView>
      <Animated.View style={[styles.mainContainer, rMainStyle]}>
        <View style={styles.counterView}>
          <Animated.View style={[iconsStyle]}>
            <Icon size={ICON_SIZE} name='minus' color='white' />
          </Animated.View>
          <Animated.View style={[clearIconStyle]}>
            <Icon size={ICON_SIZE} name='close' color='white' />
          </Animated.View>
          <Animated.View style={[iconsStyle]}>
            <Icon size={ICON_SIZE} name='plus' color='white' />
          </Animated.View>
          <View style={styles.circleWrapper}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View style={[styles.circle, circleStyle]}>
                <Text style={styles.countText}>{count}</Text>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  counterView: {
    height: 70,
    width: SLIDER_WIDTH,
    borderRadius: 50,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: '#232323',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontSize: 25,
    color: 'white'
  }
})

export default SlidingCounter