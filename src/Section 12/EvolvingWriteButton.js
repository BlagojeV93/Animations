import React, { useState, useRef } from "react";
import { Animated, View, StyleSheet, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions, TextInput } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const icons = ['format-bold', 'format-italic', 'format-underline', 'format-list-bulleted', 'format-list-numbered']
const rightIcons = ['link', 'image', 'arrow-down-bold-box']

const { width } = Dimensions.get('window')

const EvolvingWriteButton = () => {
  const [animation] = useState(new Animated.Value(0))
  const [open, setOpen] = useState(false)
  const input = useRef()
  const isOpen = useRef(false)

  const handleOnPress = () => {
    const toValue = isOpen.current ? 0 : 1
    Animated.timing(animation, {
      toValue,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      isOpen.current = !isOpen.current
      setOpen(isOpen.current)
      
      isOpen.current ? input.current.focus() : input.current.blur()
    })
  }

  const renderIcons = (arrayOfIcons) => arrayOfIcons.map((icon, i) => (
    <Icon key={i} name={icon} size={20} color='white' style={{ marginHorizontal: 2.5 }} />
  ))

  const widthInterpolate = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [100, width - 40],
    extrapolate: 'clamp'
  })

  const toolbarOpacityInterplate = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const toolbarStyles = {
    opacity: toolbarOpacityInterplate
  }

  const editorHeightInterpolate = animation.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 150],
    extrapolate: 'clamp'
  })

  const editorStyles = {
    opacity: animation,
    height: editorHeightInterpolate
  }

  const buttonOpacityInterpolate = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const writeButtonStyle = {
    opacity: buttonOpacityInterpolate
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.center} behavior="padding">
        <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
          <View style={styles.bar}>
            <Animated.View style={[styles.toolbar, toolbarStyles]}>
              {renderIcons(icons)}
              <View style={styles.rightInnerBar}>
                {renderIcons(rightIcons)}
              </View>
            </Animated.View>

            <Animated.View
              style={[StyleSheet.absoluteFill, styles.center, writeButtonStyle]}
              pointerEvents={open ? 'none' : 'auto'}
            >
              <TouchableWithoutFeedback onPress={handleOnPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Write</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>

          <Animated.View style={[styles.lowerView, editorStyles]}>
            <TextInput
              placeholder="Start writing..."
              multiline
              ref={input}
              style={[StyleSheet.absoluteFill, styles.input]}
            />
          </Animated.View>
        </Animated.View>

        {open &&
          <Animated.View style={toolbarStyles}>
            <TouchableWithoutFeedback onPress={handleOnPress}>
              <Text style={styles.close}>Close</Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        }
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  editor: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  bar: {
    height: 50,
    backgroundColor: '#2979FF',
    justifyContent: 'center'
  },
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightInnerBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  lowerView: {
    height: 150
  },
  input: {
    padding: 10,
    fontSize: 20
  },
  buttonText: {
    color: 'white'
  },
  close: {
    color: '#2979FF',
    marginTop: 10,
    marginBottom: 20
  }
})

export default EvolvingWriteButton