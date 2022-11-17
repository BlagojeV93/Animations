import React, { useEffect, useRef, useState } from "react";
import { Animated, View, TouchableOpacity, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableNativeFe, TouchableOpacityedback } from "react-native";
import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const AnimatedColorPicker = () => {
  const [animation] = useState(new Animated.Value(0))
  const [buttonAnimation] = useState(new Animated.Value(0))
  const [color, setColor] = useState('#000')
  const [inputOpen, setInputOpen] = useState(false)
  const isOpen = useRef(false)
  const isInputOpen = useRef(false)
  const inputRef = useRef()

  useEffect(() => {
      inputOpen ? inputRef.current.focus() : inputRef.current.blur()
  }, [inputOpen])

  const handleToggle = () => {
    const toValue = isOpen.current ? 0 : 1
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false
    }).start()

    isOpen.current = !isOpen.current
  }

  const toggleInput = () => {
    const toValue = isInputOpen.current ? 0 : 1
    Animated.timing(buttonAnimation, {
      toValue,
      duration: 350,
      useNativeDriver: false
    }).start()

    isInputOpen.current = !isInputOpen.current
    setInputOpen(isInputOpen.current)
  }

  const colorStyle = {
    backgroundColor: color
  }

  const scaleXInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  })

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0]
  })

  const rowStyle = {
    opacity: animation,
    transform: [
      { translateY: translateYInterpolate },
      { scaleX: scaleXInterpolate },
      { scaleY: animation }
    ]
  }

  const moveInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0]
  })

  const buttonStyle = {
    transform: [
      { translateX: moveInterpolate },
      { scale: buttonAnimation }
    ]
  }

  const inputOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1]
  })

  const inputStyle = {
    opacity: inputOpacityInterpolate
  }

  const iconTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20]
  })

  const iconOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const iconStyle = {
    opacity: iconOpacityInterpolate,
    transform: [
      { translateX: iconTranslate }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rowWrap, rowStyle]}>

        <TouchableWithoutFeedback onPress={toggleInput}>
          <Animated.View style={[styles.colorBall, colorStyle]}>

          </Animated.View>
        </TouchableWithoutFeedback>

        <View style={styles.row}>
          <TouchableOpacity>
            <AnimatedIcon name='bold' size={30} style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name='italic' size={30} style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name='align-center' size={30} style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon name='link' size={30} style={iconStyle} />
          </TouchableOpacity>

          <Animated.View
            style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
            pointerEvents={inputOpen ? 'auto' : 'none'}
          >
            <AnimatedTextInput
              style={[styles.input, inputStyle]}
              value={color}
              onChangeText={(color) => setColor(color)}
              ref={inputRef}
            />
            <TouchableWithoutFeedback onPress={toggleInput}>
              <Animated.View style={[styles.okayButton, buttonStyle]}>
                <Text style={styles.okayText}>OK</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>

      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text>Toggle Open/Closed</Text>
      </TouchableOpacity>

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
  button: {
    marginTop: 50
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  colorRowWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5
  },
  input: {
    flex: 1
  },
  okayButton: {
    borderRadius: 20,
    width: 40,
    height: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  okayText: {
    color: 'white'
  }
})

export default AnimatedColorPicker