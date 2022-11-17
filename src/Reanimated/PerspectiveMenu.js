import React, { useCallback } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withTiming, interpolate, Extrapolate } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const BACKGROUND_COLOR = '#1e1e23'
const { width: SCREEN_WIDTH } = Dimensions.get('window')

const THRESHOLD = SCREEN_WIDTH / 3

const PerspectiveMenu = () => {
  const translateX = useSharedValue(0)

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0)
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2)
    }
  }, [])

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.prevTranslateX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.prevTranslateX
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0)
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2)
      }
    }
  })

  const rStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP
    )

    const borderRadius = interpolate(translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolate.CLAMP
    )

    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `-${rotateY}deg` }
      ]
    }
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.mainView, rStyle]}>
            <Icon
              name='menu'
              size={32}
              color={BACKGROUND_COLOR}
              style={styles.iconStyle}
              onPress={onPress}
            />
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BACKGROUND_COLOR
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconStyle: {
    margin: 15
  }
})

export default PerspectiveMenu