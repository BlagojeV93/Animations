import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Opacity = () => {
  const [animation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }

  const animatedStyles = {
    opacity: animation
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

export default Opacity;
