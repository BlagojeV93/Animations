import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const ColorBackgroundColor = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: false
    }).start(() => animation.setValue(0))
  }

  const boxBackgroundInterpolate = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['green', 'blue', 'brown']
  })

  const containerBackgroundInterpolate = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ['rgba(123, 88, 55, 1)', 'rgba(123, 88, 55, 0)']
  })

  return (
    <Animated.View style={[styles.container, { backgroundColor: containerBackgroundInterpolate }]}>
      <Pressable onPress={startAnimation}>
        <Animated.View style={[styles.box, { backgroundColor: boxBackgroundInterpolate }]} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red'
  }
});

export default ColorBackgroundColor;
