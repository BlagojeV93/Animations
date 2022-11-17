import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions } from "react-native";

const { height } = Dimensions.get('screen')

const Cliff = () => {
  const [animation] = useState(new Animated.ValueXY(0))

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => animation.extractOffset(),
    onPanResponderMove: Animated.event([
      null,
      {
        dx: animation.x,
        dy: animation.y
      }
    ], { useNativeDriver: false }),
  }), [])

  const inputRange = [
    0,
    (height / 2) - 50.01,
    (height / 2) - 50,
    height
  ]

  const backgroundInterpolate = animation.y.interpolate({
    inputRange,
    outputRange: ['blue', 'blue', 'red', 'red']
  })

  const flipInterpolate = animation.y.interpolate({
    inputRange,
    outputRange: [1, 1, -1, -1]
  })

  const animatedStyles = {
    backgroundColor: backgroundInterpolate,
    transform: [
      ...animation.getTranslateTransform(),
      {
        scale: flipInterpolate
      }
    ]
  }

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      <View style={styles.center}>
        <Text>GOOD</Text>
      </View>
      <View style={styles.center}>
        <Text>BAD</Text>
      </View>
      <Animated.View style={[styles.box, animatedStyles]} {..._panResponder.panHandlers}>
        <Text>BOX</Text>
      </Animated.View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  center: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1
  },
  box: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Cliff