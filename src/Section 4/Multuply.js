import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Multiply = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 50,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    });
  }

  const randomValue = new Animated.Value(5);
  // const randomValue = 5;
  const newAnimation = Animated.multiply(animation, randomValue);

  const animatedStyles = {
    transform: [
      { translateY: newAnimation }
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

export default Multiply;
