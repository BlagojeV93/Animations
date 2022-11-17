import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated, Text } from 'react-native';

const Scale = () => {
  const [animation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: -2,
      //toValue: 2,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }

  const animatedStyles = {
    transform: [
      { scaleY: animation }
      //{ scaleX: animation }
    ]
  }

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text>JEL VREME</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow'
  }
});

export default Scale;
