import React from "react";
import { View, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler'

const SIZE = 80
const CIRCLE_RADIUS = SIZE * 2

const PanGestureHandlerBasics = () => {
  const transalteX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.prevTranslateX = transalteX.value
      context.prevTranslateY = translateY.value
    },
    onActive: (event, context) => {
      transalteX.value = event.translationX + context.prevTranslateX
      translateY.value = event.translationY + context.prevTranslateY
    },
    onEnd: () => {
      const distance = Math.sqrt(transalteX.value ** 2 + translateY.value ** 2)
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        transalteX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  }, [])

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transalteX.value },
        { translateY: translateY.value }
      ]
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
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
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
  }
})

export default PanGestureHandlerBasics