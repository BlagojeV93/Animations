import React from "react";
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import ScrollPage from "./common/ScrollPage";

const WORDS = [`What's`, `up`, `mobile`, `devs`]

const ScrollViewInterpolate = () => {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  }, [])

  const renderWords = () => WORDS.map((word, index) => {
    return (
      <ScrollPage
        key={index}
        title={word}
        index={index}
        translateX={translateX}
      />
    )
  })

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {renderWords()}
    </Animated.ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
})

export default ScrollViewInterpolate