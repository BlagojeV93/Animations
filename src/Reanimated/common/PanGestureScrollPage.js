import React from "react";
import { StyleSheet, Dimensions, Text } from 'react-native'
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width: PAGE_WIDTH } = Dimensions.get('window')

const PanGestureScrollPage = ({ index, title, translateX }) => {

  const pageOffset = PAGE_WIDTH * index

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value + pageOffset }
      ]
    }
  }, [])

  const backgroundColor = `rgba(0,0,256,0.${index + 2})`

  return (
    <Animated.View
      style={[
        styles.pageStyle,
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor
        },
        rStyle
      ]}
    >
      <Text style={styles.titleText}>{title}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  pageStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1.5
  }
})

export { PanGestureScrollPage, PAGE_WIDTH }