import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Extrapolate = () => {
  const [animation] = useState(new Animated.Value(1))

  const startAnimation = () => {
    Animated.timing(animation, {
      //toValue: 2,
      toValue: 3,
      duration: 1500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        //toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
  }

  const scaleInterpolate = animation.interpolate({
    inputRange: [1, 2],
    //outputRange: [1, 2],
    outputRange: [1, 1.1],
    extrapolate: 'identity',
    //extrapolate: 'clamp',
    //extrapolateLeft: 'clamp',
    // extrapolateRight: 'clamp'
  })

  const animatedStyles = {
    transform: [
      { scale: scaleInterpolate }
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

export default Extrapolate;
