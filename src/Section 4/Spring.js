import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const Spring = () => {
  const [animation] = useState(new Animated.Value(1))

  useEffect(() => {
    animation.addListener(({ value }) => {
      console.log(value)
    })

    return () => animation.removeListener()
  }, [])

  const startAnimation = () => {
    Animated.spring(animation, {
      toValue: 2,
      friction: 2,
      tension: 160,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }

  const animatedStyles = {
    transform: [
      { scale: animation }
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
    width: 50,
    height: 50,
    backgroundColor: 'red'
  }
});

export default Spring;
