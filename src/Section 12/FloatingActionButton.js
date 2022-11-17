import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const FloatingActionButton = () => {
  const [animation] = useState(new Animated.Value(0))
  const isOpen = useRef(false)

  const toggleOpen = () => {
    const toValue = isOpen.current ? 0 : 1
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false
    }).start()

    isOpen.current = !isOpen.current
  }

  const reloadStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70]
        })
      }
    ]
  }

  const orderStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }
    ]
  }

  const labelMoveInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90]
  })

  const labelOpacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1]
  })

  const labelStyle = {
    opacity: labelOpacityInterpolate,
    transform: [
      { translateX: labelMoveInterpolate }
    ]
  }

  const bgStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30]
        })
      }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, bgStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, orderStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Order
          </Animated.Text>
          <Icon name='food-fork-drink' size={20} color='#555' />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, reloadStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Reload
          </Animated.Text>
          <Icon name='reload' size={20} color='#555' />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Pay
          </Animated.Text>
          <Text style={styles.payText}>5.00$</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  pay: {
    backgroundColor: '#00B15E'
  },
  payText: {
    color: 'white'
  },
  other: {
    backgroundColor: 'white'
  },
  label: {
    color: 'white',
    position: 'absolute',
    fontSize: 18
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30
  }
})

export default FloatingActionButton