import React, { useCallback } from "react";
import { StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const PICKER_WIDTH = Dimensions.get('window').width * 0.9
const CIRCLE_PICKER_SIZE = 35
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2

const ColorPrickerComponent = ({ colors, start, end, onColorChanged }) => {
  const transalteX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(transalteX.value, 0), PICKER_WIDTH - CIRCLE_PICKER_SIZE)
  })

  const onEnd = useCallback(() => {
    'worklet'
    translateY.value = withTiming(0)
    scale.value = withTiming(1)
  }, [])

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.prevTranslateX = adjustedTranslateX.value
    },
    onActive: (event, context) => {
      transalteX.value = event.translationX + context.prevTranslateX
    },
    onEnd
  })

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE - 5)
      scale.value = withTiming(1.2)
      transalteX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE)
    },
    onEnd
  })

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    }
  })

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, i) => (i / colors.length) * PICKER_WIDTH)

    const backgroundColor = interpolateColor(transalteX.value, inputRange, colors)

    onColorChanged(backgroundColor)

    return {
      backgroundColor
    }
  })

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
    >
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={styles.container}>
            <LinearGradient
              colors={colors}
              start={start}
              end={end}
              style={styles.linearGradient}
            />
            <Animated.View style={[styles.picker, rStyles]}>
              <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  linearGradient: {
    height: 30,
    width: PICKER_WIDTH,
    borderRadius: 20
  },
  picker: {
    position: 'absolute',
    backgroundColor: 'white',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  internalPicker: {
    height: INTERNAL_PICKER_SIZE,
    width: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }
})

export default ColorPrickerComponent