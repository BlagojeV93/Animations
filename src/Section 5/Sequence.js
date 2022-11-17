import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const Sequence = () => {
  const [backgroundAnimation] = useState(new Animated.Value(0))
  const [scaleAnimation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(backgroundAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(scaleAnimation, {
        toValue: 2,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(backgroundAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }),
    ]).start()
  }

  const backgroundInterpolation = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['yellow', 'brown']
  })

  const boxStyle = {
    backgroundColor: backgroundInterpolation,
    transform: [{
      scale: scaleAnimation
    }]
  }

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.box, boxStyle]}>
        <Animated.Text>OH YEAH!</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Sequence;
