import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const AnimateHidden = () => {
  const [animation] = useState(new Animated.Value(1))
  const [visible, setVisible] = useState(true)

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false
    }).start(({ finished }) => {
      setTimeout(() => {
        if (finished) {
          setVisible(false)
        } else {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: false
          }).start()
        }
      }, 0)
    });
  }

  const yInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0]
  })

  const animatedStyles = {
    opacity: animation,
    transform: [
      { translateY: yInterpolate }
    ]
  }

  return (
    <Pressable onPress={startAnimation}>
      {visible &&
        <Animated.View style={[styles.box, animatedStyles]} />
      }
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

export default AnimateHidden;
