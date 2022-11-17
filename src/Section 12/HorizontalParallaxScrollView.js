import React, { useState } from "react";
import { Animated, View, Image, Text, ScrollView, Dimensions, StyleSheet } from "react-native";

import images from '../../assets/HorizontalParallaxImages'
import Moment from "./helpers/Moment";

const { width } = Dimensions.get('window')

const getTranslateX = (animatedScroll, i) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150]

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  })
}

const getSeparator = (i) => (
  <View
    key={i}
    style={[styles.separate, { left: (i - 1) * width - 2.5 }]} />
)

const HorizontalParallaxScrollView = () => {
  const [animatedScroll] = useState(new Animated.Value(0))

  const renderImages = () => images.map((image, i) => (
    <Moment
      key={i}
      {...image}
      translateX={getTranslateX(animatedScroll, i)}
    />
  ))

  const renderSeparator = () => Array.apply(null, { length: images.length + 1 }).map((_, i) => getSeparator(i))

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: animatedScroll
              }
            }
          }
        ], { useNativeDriver: false })}
      >
        {renderImages()}
        {renderSeparator()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  separate: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5
  }
})

export default HorizontalParallaxScrollView