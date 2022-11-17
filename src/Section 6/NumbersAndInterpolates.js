import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const NumbersAndInterpolates = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
  }

  const animationInterpolate = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 300, 0]
  })

  const opacityInterpolatedInterpolate = animationInterpolate.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5]
  })

  const translateXInterpolate = animationInterpolate.interpolate({
    inputRange: [0, 30, 80, 123, 202, 260, 300],
    outputRange: [0, -10, 100, 93, -44, 59.1, 100]
  })

  const animatedStyles = {
    transform: [
      { translateY: animationInterpolate },
      { translateX: translateXInterpolate }
    ],
    opacity: opacityInterpolatedInterpolate
  }

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red'
  }
});

export default NumbersAndInterpolates;
