import React, { useState, useMemo } from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';

const Decay = () => {
  const [animation] = useState(new Animated.ValueXY(0))

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animation.extractOffset()
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: animation.x,
        dy: animation.y
      }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, { vx, vy }) => {
      Animated.decay(animation, {
        velocity: { x: vx, y: vy },
        deceleration: 0.997,
        useNativeDriver: false
      }).start()
    }
  }), [])

  const animatedStyles = {
    transform: animation.getTranslateTransform()
  }

  return (
    <Animated.View
      style={[styles.box, animatedStyles]}
      {..._panResponder.panHandlers}
    />
  );

};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red'
  }
});

export default Decay;
