import React from "react";
import { View, StyleSheet } from 'react-native'
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { cancelAnimation, useAnimatedGestureHandler, useDerivedValue, useSharedValue, withDecay } from "react-native-reanimated";
import { PanGestureScrollPage, PAGE_WIDTH } from "./common/PanGestureScrollPage";

const titles = [`What's`, `up`, `mobile`, `devs`]
const MAX_TRANSLATE_X = - PAGE_WIDTH * (titles.length - 1)

const PanGestureHandlerScrollView = () => {

  const translateX = useSharedValue(0)

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X)
  })

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.prevTranslateX = clampedTranslateX.value
      cancelAnimation(translateX)
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.prevTranslateX
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX })
    }
  })

  const renderPages = () => titles.map((title, i) => {
    return (
      <PanGestureScrollPage
        key={i}
        index={i}
        title={title}
        translateX={clampedTranslateX}
      />
    )
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={styles.pagesView}>
          {renderPages()}
        </Animated.View>
      </PanGestureHandler>
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
  pagesView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  }
})

export default PanGestureHandlerScrollView