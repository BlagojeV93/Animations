import React, { useCallback } from "react";
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ColorPrickerComponent from "./common/ColorPrickerComponent";

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white'
]
const { width } = Dimensions.get('window')
const CIRCLE_WIDTH = width * 0.8

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)'

const ColorPicker = () => {
  const pickedColor = useSharedValue(COLORS[0])

  const onColorChanged = useCallback((color) => {
    'worklet'
    pickedColor.value = color
  }, [])

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPrickerComponent
          colors={COLORS}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onColorChanged={onColorChanged}
        />
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
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    justifyContent: 'center'
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2
  }
})

export default ColorPicker