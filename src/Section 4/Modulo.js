import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Modulo = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 12,
      duration: 3500,
      useNativeDriver: true
    }).start()
  }

  const randomValue = 3;
  const newAnimation = Animated.modulo(animation, randomValue);

  const interpolated = newAnimation.interpolate({
    inputRange: [0, 3],
    outputRange: ['0deg', '270deg']
  })

  const animatedStyles = {
    transform: [
      { rotate: interpolated }
    ]
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
    backgroundColor: 'purple'
  }
});

export default Modulo;
