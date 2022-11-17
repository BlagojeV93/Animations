import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";

const MixingExtrapolates = () => {
  const [animation] = useState(new Animated.ValueXY(0))
  const [value, setValue] = useState(0)

  useEffect(() => {
    animation.y.addListener(({ value }) => {
      setValue(value)
    });
  }, [])


  const _panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      animation.extractOffset();
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: animation.x, dy: animation.y },
    ], { useNativeDriver: false }),
  }), [])

  const { height } = Dimensions.get("window");
  const scaleAndFlipOnReverse = animation.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [0.1, 1],
    extrapolateRight: "clamp",
  });

  const animatedStyle = {
    transform: [
      { scale: scaleAndFlipOnReverse }
    ]
  };

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      <Animated.View
        style={[styles.box, animatedStyle]}
      >
        <Text>{Math.round(value)}/{Math.round(height / 3)}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 75,
    height: 75,
    backgroundColor: "tomato",
  },
});

export default MixingExtrapolates