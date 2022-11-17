import React, { useEffect, useState } from "react";
import { Animated, View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native";

const NotifySuccessInput = () => {
  const [animation] = useState(new Animated.Value(0))
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }),
        Animated.delay(1500)
      ]).start(() => setSuccess(false))
    }
  }, [success])

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const widthInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [150, 150, 300],
    extrapolate: 'clamp'
  })

  const inputScaleInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 0.6],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  const sendButtonScaleInterpolate = animation.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1]
  })

  const notifyTextInterpolate = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const thankYouScaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  })

  const buttonWrapStyle = {
    width: widthInterpolate
  }

  const inputScaleStyle = {
    transform: [
      { scale: inputScaleInterpolate }
    ]
  }

  const sendButonStyle = {
    transform: [
      { scale: sendButtonScaleInterpolate }
    ]
  }

  const notifyTextStyles = {
    transform: [
      { scale: notifyTextInterpolate }
    ]
  }

  const thankYouTextStyle = {
    transform: [
      { scale: thankYouScaleInterpolate }
    ]
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>
          {!success && (
            <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap, inputScaleStyle]}>
              <TextInput
                autoFocus
                keyboardType='email-address'
                placeholder="Email"
                placeholderTextColor='rgba(255,123,115,0.8)'
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => setSuccess(true)}>
                <Animated.View style={[styles.sendButton, sendButonStyle]} >
                  <Text style={styles.sendText}>Send</Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          )}
          {success ? (
            <Animated.View style={thankYouTextStyle}>
              <Text style={styles.notifyText}>Thank You</Text>
            </Animated.View>
          ) : (
            <Animated.View style={notifyTextStyles}>
              <Text style={styles.notifyText}>Notify Me</Text>
            </Animated.View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7B73"
  },
  buttonWrap: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyText: {
    color: "#FF7B73",
    fontWeight: "bold"
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4
  },
  sendButton: {
    backgroundColor: "#FF7B73",
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  sendText: {
    color: "#FFF"
  }
});


export default NotifySuccessInput