import React from "react";
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

const { width, height } = Dimensions.get('window')
const SIZE = width * 0.7

const ScrollPage = ({ translateX, index, title }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    )

    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      SIZE / 2,
      0
    ],
      Extrapolate.CLAMP
    )

    return {
      borderRadius,
      transform: [
        { scale }
      ]
    }
  }, [])

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2
    ],
      Extrapolate.CLAMP
    )

    const opacity = interpolate(translateX.value, inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    )

    return {
      opacity,
      transform: [
        { translateY }
      ]
    }
  }, [])

  const backgroundColor = `rgba(0,0,256,0.${index + 2})`

  return (
    <View style={[styles.pageStyle, { backgroundColor }]} key={index}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
        <Text style={styles.titleText}>{title}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)'
  },
  titleText: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700'
  }
})

export default ScrollPage