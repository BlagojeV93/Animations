import React, { useRef } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const ColorBackgroundColor = () => {
  const animation = useRef(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation.current, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false
      }).start()
    })
  }

  const backgroundInterpolation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', 'purple']
  })

  const colorInterpolation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['tomato', 'white']
  })

  const boxStyle = {
    backgroundColor: backgroundInterpolation
  }

  const textStyle = {
    color: colorInterpolation,
    fontWeight: 'bold'
  }

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.box, boxStyle]}>
        <Animated.Text style={textStyle}>OH YEAH!</Animated.Text>
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

export default ColorBackgroundColor;
