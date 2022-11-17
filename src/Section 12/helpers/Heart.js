import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const Heart = (props) => {
  const { filled, style } = props

  const filledStyle = filled ? styles.filledHeart : styles.empty

  const centerNonFilled = () => (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
    </View>
  )

  return (
    <Animated.View {...props} style={[styles.heart, style]}>
      <View style={[styles.leftHeart, styles.heartShape, filledStyle]} />
      <View style={[styles.rightHeart, styles.heartShape, filledStyle]} />
      {!filled && centerNonFilled()}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent'
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  filledHeart: {
    backgroundColor: '#e31745'
  },
  fit: {
    transform: [
      { scale: 0.9 }
    ]
  },
  emptyFill: {
    backgroundColor: 'white'
  },
  empty: {
    backgroundColor: '#ccc'
  },
  leftHeart: {
    transform: [
      { rotate: '-45deg' }
    ],
    left: 5
  },
  rightHeart: {
    transform: [
      { rotate: '45deg' }
    ],
    right: 5
  }
})

export default Heart