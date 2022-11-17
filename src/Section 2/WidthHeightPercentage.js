import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const WidthHeightPercentage = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start()
  }

  const widthInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '50%']
  })

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '100%']
  })

  const animationStyle = {
    width: widthInterpolate,
    height: heightInterpolate
  }

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.box, animationStyle]} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    // width: '20%',
    // height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});

export default WidthHeightPercentage;
