import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'

import Background from '../../assets/background.jpeg'

const AnimatedInput = Animated.createAnimatedComponent(TextInput)

const animate = (animation, toValue) => Animated.timing(animation, {
  toValue,
  duration: 200,
  useNativeDriver: false
})

const createAnimatedStyles = (animation) => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0]
  })
  return {
    opacity: animation,
    transform: [{
      translateY
    }]
  }
}

const FormItemsVisbility = () => {
  const [email] = useState(new Animated.Value(0))
  const [password] = useState(new Animated.Value(0))
  const [button] = useState(new Animated.Value(0))
  const emailRef = useRef()

  useEffect(() => {
    Animated.stagger(100, [
      animate(email, 1),
      animate(password, 1),
      animate(button, 1)
    ]).start(() => {
      emailRef.current.focus()
    })
  }, [])

  return (
    <View style={StyleSheet.absoluteFill}>
      <ImageBackground
        source={Background}
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
      >
        <View style={styles.container} />
        <KeyboardAvoidingView style={styles.form} behavior='padding'>
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <AnimatedInput
              ref={emailRef}
              style={[styles.input, createAnimatedStyles(email)]}
              placeholder='Email'
              keyboardType='email-address'
            />
            <AnimatedInput
              style={[styles.input, createAnimatedStyles(password)]}
              placeholder='Password'
              secureTextEntry
            />
            <TouchableOpacity>
              <Animated.View style={[styles.button, createAnimatedStyles(button)]}>
                <Text style={styles.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.container} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 10
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    color: '#333',
    backgroundColor: 'white'
  },
  button: {
    marginTop: 10,
    width: 100,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  }
})

export default FormItemsVisbility