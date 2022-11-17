import React, { useRef, useState } from 'react';
import { StyleSheet, Pressable, Animated, View, Text } from 'react-native';

const PointerEvents = () => {
  const [animation] = useState(new Animated.Value(0))
  const [toggled, setToggled] = useState(true)

  const pressed = useRef(false)

  const startAnimation = () => {
    const toValue = pressed.current ? 1 : 0
    Animated.timing(animation, {
      toValue,
      duration: 500,
      useNativeDriver: false
    }).start()
    pressed.current = !pressed.current
  }

  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'purple']
  })

  const animatedStyles = {
    backgroundColor: backgroundInterpolate
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </Pressable>
      <View
        style={[StyleSheet.absoluteFill, styles.cover]}
        pointerEvents={toggled ? 'none' : 'auto'}
      />
      <Pressable onPress={() => setToggled(!toggled)}>
        <Text>TOGGLE POINTER EVENTS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 150,
    height: 150,
  },
  cover: {
    backgroundColor: 'transparent'
  }
});

export default PointerEvents;
