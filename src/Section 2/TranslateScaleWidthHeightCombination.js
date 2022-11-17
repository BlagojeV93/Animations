import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, View, Pressable } from 'react-native';

const TranslateScaleWidthHeightCombination = () => {
  const [animation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  const yInterpolate = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -25]
  });

  const animatedStyles = {
    transform: [
      { scaleY: animation },
      { translateY: yInterpolate }
    ]
  }

  return (
    <Pressable onPress={startAnimation}>
      <View style={styles.box2} />
      <Animated.View style={[styles.box, animatedStyles]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow'
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  }
});

export default TranslateScaleWidthHeightCombination;
