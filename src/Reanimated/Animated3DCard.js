import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import BackgroundGradient from './common/BackgroundGradient'

const HEIGHT = 256
const WIDTH = Dimensions.get('window').width * 0.9

const CARD_HEIGHT = HEIGHT - 5
const CARD_WIDTH = WIDTH - 5

const Animated3DCard = () => {
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const updateRotationValues = (y, x, timing) => {
    'worklet'
    const interpolateRotateX = interpolate(y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP)
    const interpolateRotateY = interpolate(x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP)
    rotateX.value = timing ? withTiming(interpolateRotateX) : interpolateRotateX
    rotateY.value = timing ? withTiming(interpolateRotateY) : interpolateRotateY
  }

  const gestureHandler = Gesture.Pan()
    .onBegin((event) => {
      updateRotationValues(event.y, event.x, true)
    })
    .onUpdate((event) => {
      updateRotationValues(event.y, event.x)
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0)
      rotateY.value = withTiming(0)
    })

  const rStyle = useAnimatedStyle(() => {
    const rotateXValue = `${rotateX.value}deg`
    const rotateYValue = `${rotateY.value}deg`
    // topLeft 10deg -10deg
    // topRight 10deg 10deg
    // bottomRight -10deg 10deg
    // bottomLeft -10deg -10deg
    return {
      transform: [
        { perspective: 300 },
        { rotateX: rotateXValue },
        { rotateY: rotateYValue }
      ]
    }
  })

  return (
    <View style={styles.mainContainer}>
      <BackgroundGradient
        width={WIDTH}
        height={HEIGHT}
      />
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[styles.creditCard, rStyle]}>
          <View style={styles.innerCard}>
            <View style={styles.circle} />
            <View style={styles.bottomContainer}>
              <View style={styles.other} />
              <View style={styles.other} />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  creditCard: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 20,
    zIndex: 300
  },
  innerCard: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    flexDirection: 'row'
  },
  circle: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#272F46'
  },
  other: {
    width: 90,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#272F46'
  },
  bottomContainer: {
    marginLeft: 10,
    justifyContent: 'space-around'
  }
})

export default () => {
  return (
    <GestureHandlerRootView>
      <Animated3DCard />
    </GestureHandlerRootView>
  )
}