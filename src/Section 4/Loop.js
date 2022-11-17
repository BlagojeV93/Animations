import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, Text } from 'react-native';

const Loop = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.loop(Animated.timing(animation, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false
    }), { iterations: 5 }).start()
  }

  const rotationInterpolate = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  })

  const animationStyle = {
    transform: [
      { rotate: rotationInterpolate }
    ]
  }

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.box, animationStyle]}>
        <Text>OOOOH YEAH</Text>
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

export default Loop;
