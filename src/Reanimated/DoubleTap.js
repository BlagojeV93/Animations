import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native'
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

const { width: SIZE } = Dimensions.get('window')
const AnimatedImage = Animated.createAnimatedComponent(Image)

const DoubleTap = () => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)
  const doubleTapRef = useRef()

  const heartStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: Math.max(scale.value, 0) }
    ]
  }))

  const camelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, null, (isFinishded) => {
      if (isFinishded) {
        scale.value = withDelay(500, withSpring(0))
      }
    })
  }, [])

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, null, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1))
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={onSingleTap}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onActivated={onDoubleTap}
          numberOfTaps={2}
          maxDelayMs={250}
        >
          <Animated.View>
            <ImageBackground
              style={styles.imageStyle}
              source={require('../../assets/ReanimatedAssets/heartBackground.jpeg')}
            >
              <AnimatedImage
                source={require('../../assets/ReanimatedAssets/heart.png')}
                style={[styles.imageStyle, styles.heart, heartStyle]}
                resizeMode='center'
              />
            </ImageBackground>
            <Animated.Text style={[styles.camels, camelStyle]}>🐫🐫🐫🐫🐫🐫🐫</Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: SIZE,
    height: SIZE
  },
  heart: {
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 1,
    shadowRadius: 35,
    elevation: 6
  },
  camels: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 35
  }
})

export default DoubleTap