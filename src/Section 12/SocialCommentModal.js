import React, { useState, useRef, useMemo } from "react";

import { Animated, View, StyleSheet, Text, TextInput, ScrollView, PanResponder } from "react-native";

const animate = (animation, toValue) => Animated.timing(animation, {
  toValue,
  duration: 150,
  useNativeDriver: false
})

const SocialCommentModal = () => {
  const [animated] = useState(new Animated.Value(0))
  const [animatedMargin] = useState(new Animated.Value(0))
  const scrollOfsset = useRef(0) // koliko je otisao u scrollu po y osi
  const contentHeight = useRef(0) // 1094
  const scrollViewHeight = useRef(0) // 555

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (e, { dx, dy }) => {
      const totalScrollHeight = scrollOfsset.current + scrollViewHeight.current

      const topCondition = scrollOfsset.current <= 0 && dy > 0 // kad dodje do vrha i bouncuje scrollView && scrolluje up
      const bottomCondition = (totalScrollHeight > contentHeight.current) && dy < 0 // bukvalno obrnuto od ovog gore

      if (topCondition || bottomCondition) {
        return true
      }
    },
    onPanResponderMove: (e, { dx, dy }) => {
      if (dy < 0) {
        animated.setValue(dy)
      } else if (dy > 0) {
        animatedMargin.setValue(dy)
      }
    },
    onPanResponderRelease: (e, { dx, dy }) => {
      if (dy < -150) {
        Animated.parallel([
          animate(animated, -400),
          animate(animatedMargin, 0)
        ]).start()
      } else if (dy > -150 && dy < 150) {
        Animated.parallel([
          animate(animated, 0),
          animate(animatedMargin, 0)
        ]).start()
      } else if (dy > 150) {
        Animated.timing(animated, {
          toValue: 400,
          duration: 300,
          useNativeDriver: true
        }).start();
      }
    }
  }), [])

  const spacerStyle = {
    marginTop: animatedMargin
  }

  const opacityInterpolate = animated.interpolate({
    inputRange: [-400, 0, 400],
    outputRange: [0, 1, 0]
  })

  const modalStyle = {
    transform: [
      { translateY: animated },
    ],
    opacity: opacityInterpolate
  }

  return (
    <View style={styles.container}>
      <Animated.View style={spacerStyle} />
      <Animated.View style={[styles.modal, modalStyle]} {..._panResponder.panHandlers}>
        <View style={styles.comments}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={event => {
              scrollOfsset.current = event.nativeEvent.contentOffset.y
              scrollViewHeight.current = event.nativeEvent.layoutMeasurement.height
            }}
            onContentSizeChange={(width, height) => {
              contentHeight.current = height
            }}
          >
            <Text style={styles.fakeText}>Top</Text>
            <View style={styles.fakeComments} />
            <Text style={styles.fakeText}>Bottom</Text>
          </ScrollView>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.textInput}
            placeholder='Comment'
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 30
  },
  modal: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333"
  },
  comments: {
    flex: 1
  },
  fakeText: {
    padding: 15,
    textAlign: "center"
  },
  fakeComments: {
    height: 1000,
    backgroundColor: "#f1f1f1"
  },
  inputWrap: {
    flexDirection: "row",
    paddingHorizontal: 15
  },
  textInput: {
    flex: 1,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#000"
  }
});

export default SocialCommentModal