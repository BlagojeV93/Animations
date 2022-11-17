import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image)
const imageUrl = 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
const { width, height } = Dimensions.get('window')

const PinchGestureHandlerExample = () => {
  const scale = useSharedValue(1)
  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale
      focalX.value = event.focalX
      focalY.value = event.focalY
    },
    onEnd: () => {
      scale.value = withTiming(1)
    }
  }, [])

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ]
    }
  }, [])

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value }
      ]
    }
  }, [])

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.container}>
          <AnimatedImage
            style={[styles.container, rStyle]}
            source={{ uri: imageUrl }}
          />
          <Animated.View style={[styles.focalPoint, focalPointStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  imageStyle: {
    flex: 1
  },
  focalPoint: {
    ...StyleSheet.absoluteFill,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10
  }
})

export default PinchGestureHandlerExample