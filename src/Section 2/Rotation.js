import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, Text } from 'react-native';

const Rotation = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 360,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const rotationInterpolate = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
    //outputRange: ['0deg', '1080deg'],
    //outputRange: ['0deg', '-1080deg']
  })

  const animationStyle = {
    transform: [
      { rotate: rotationInterpolate },
      //{ rotateY: rotationInterpolate },
      //{ rotateX: rotationInterpolate }
    ]
  }

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.box, animationStyle]}>
        <Text>HERE I AM</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
});

export default Rotation;
