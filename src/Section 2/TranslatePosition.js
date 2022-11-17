import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const TranslatePostion = () => {
  const [animation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.timing(animation, {
      // toValue: -300,
      toValue: 100,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(0)
    })
  }

  const animatedStyles = {
    transform: [
      { translateY: animation },
      { translateX: animation }
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

export default TranslatePostion;
