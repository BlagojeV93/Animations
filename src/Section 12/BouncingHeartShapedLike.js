import React, { useState } from "react";
import { Animated, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import Heart from "./helpers/Heart";

const getTransformationAnimation = (animation, scale, y, x, rotate, opacity) => {
  const inputRange = [0, 1]

  const scaleAnimation = animation.interpolate({
    inputRange,
    outputRange: [0, scale]
  })
  const xAnimation = animation.interpolate({
    inputRange,
    outputRange: [0, x]
  })
  const yAnimation = animation.interpolate({
    inputRange,
    outputRange: [0, y]
  })
  const rotateAnimation = animation.interpolate({
    inputRange,
    outputRange: ['0deg', rotate]
  })
  const opacityAnimation = animation.interpolate({
    inputRange,
    outputRange: [0, opacity]
  })

  return {
    opacity: opacityAnimation,
    transform: [
      { scale: scaleAnimation },
      { translateX: xAnimation },
      { translateY: yAnimation },
      { rotate: rotateAnimation }
    ]
  }
}

const BouncingHeartShapedLike = () => {
  const [liked, setLiked] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const [animations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ])

  const triggerLiked = () => {
    setLiked(!liked)

    const showAnimations = animations.map((animation) => {
      return Animated.spring(animation, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false
      })
    })

    const hideAnimations = animations.map((animation) => {
      return Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false
      })
    }).reverse()

    Animated.parallel([
      Animated.spring(animation, {
        toValue: 2,
        friction: 3,
        useNativeDriver: false
      }),
      Animated.sequence([
        Animated.stagger(50, showAnimations),
        Animated.delay(100),
        Animated.stagger(50, hideAnimations)
      ])
    ]).start(() => animation.setValue(0))
  }

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.8, 1]
  })

  const heartStyles = {
    transform: [
      { scale: scaleInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <View>
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[5], .4, -280, 0, "10deg", .7)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[4], .7, -120, 40, "45deg", .5)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[3], .8, -120, -40, "-45deg", .3)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[2], .3, -150, 120, "-35deg", .6)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[1], .3, -120, -120, "-35deg", .7)]} />
        <Heart filled style={[styles.heart, getTransformationAnimation(animations[0], .8, -60, 0, "35deg", .8)]} />
        <TouchableWithoutFeedback onPress={triggerLiked}>
          <Animated.View style={heartStyles}>
            <Heart filled={liked} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heart: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export default BouncingHeartShapedLike