import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const InterruptedAnimation = () => {
  const [animation] = useState(new Animated.Value(1))
  const [opacity] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 300,
        duration: 1500,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false
      })
    ], { stopTogether: false }).start(({ finished }) => {
      if (!finished) {
        // setTimeout(() => {
        //   Animated.spring(animation, {
        //     toValue: 0,
        //     useNativeDriver: false
        //   }).start()
        //   Animated.spring(opacity, {
        //     toValue: 1,
        //     useNativeDriver: false
        //   }).start()
        // }, 0)
      }
    })

    setTimeout(() => {
      // opacity.setValue(1)
      animation.setValue(0)
    }, 500)
  }

  const animatedStyles = {
    opacity,
    transform: [
      { translateY: animation }
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

export default InterruptedAnimation;
