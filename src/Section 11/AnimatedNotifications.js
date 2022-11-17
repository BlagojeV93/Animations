import React, { useState, useRef, useEffect } from "react";
import { View, Animated, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

const animate = (animation, toValue) => Animated.timing(animation, {
  toValue,
  duration: 300,
  useNativeDriver: false
})

const AnimatedNotifications = () => {
  const [value, setValue] = useState('')
  const [notification, setNotification] = useState('')
  const [opacity] = useState(new Animated.Value(0))
  const [offset] = useState(new Animated.Value(0))

  const notificationRef = useRef()

  useEffect(() => {
    if (notification) {
      notificationRef.current.measure((x, y, width, height, pageX, pageY) => {
        const size = height * -1
        //const size = width * -1
        
        offset.setValue(size)
        
        Animated.sequence([
          Animated.parallel([
            animate(opacity, 1),
            animate(offset, 0)
          ]),
          Animated.delay(1500),
          Animated.parallel([
            animate(opacity, 0),
            animate(offset, size)
          ])
        ]).start()

        Animated.parallel([
          animate(opacity, 1),
          animate(offset, 0)
        ])
      })
    }
  }, [notification])

  const handlePress = () => {
    setNotification(value)
    setValue('')
  }

  const notificationStyle = {
    opacity,
    transform: [
      {
        translateY: offset
        // translateX: offset
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.notification, notificationStyle]}
        ref={notificationRef}
      >
        <Text style={styles.notificationText}>
          {notification}
        </Text>
      </Animated.View>
      <View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={value => setValue(value)}
        />
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Show Notification</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  notification: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "tomato",
  },
  notificationText: {
    color: "#FFF",
  }
})

export default AnimatedNotifications