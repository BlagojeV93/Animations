import { interpolateNumber, interpolateRgb } from 'd3-interpolate';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';

const D3Interpolate = () => {
  const [animation] = useState(new Animated.Value(0))
  const viewRef = useRef()

  useEffect(() => {
    const positionInterpolate = interpolateNumber(0, 200)
    const colorInterpolate = interpolateRgb('red', 'yellow')
    animation.addListener(({ value }) => {
      const position = positionInterpolate(value)
      const color = colorInterpolate(value)
      const style = [styles.box, { backgroundColor: color, transform: [{ translateY: position }] }]
      viewRef.current.setNativeProps({ style })
    })
  }, [])

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start()
  }

  // const backgroundInterpolate = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['green', 'red']
  // })

  // const yInterpolate = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 200]
  // })

  // const animatedStyles = {
  //   backgroundColor: backgroundInterpolate,
  //   transform: [
  //     { translateY: yInterpolate }
  //   ]
  // }

  return (
    <View style={styles.container}>
      <Pressable onPress={startAnimation}>
        <View ref={viewRef} style={[styles.box]} />
      </Pressable>
    </View>
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
    width: 50,
    height: 50,
    backgroundColor: 'red'
  }
});

export default D3Interpolate;
