import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Rotation = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start()
  }

  const xInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    // outputRange: ['0rad', '6.28319rad']
  })

  const yInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '0deg', '180deg']
  })

  const animatedStyles = {
    transform: [
      { rotateX: xInterpolate },
      { rotateY: yInterpolate }
    ]
  }

  return (
    <Animated.View style={styles.container}>
      <Pressable onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
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

export default Rotation;
