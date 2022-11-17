import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, View } from 'react-native';

const animate = (animation, toValue) => Animated.spring(animation, {
  toValue,
  useNativeDriver: true
})

const { width, height } = Dimensions.get('screen')

const Corners = () => {
  const [animation] = useState(new Animated.ValueXY())

  const boxHeight = useRef()
  const boxWidth = useRef()

  const startAnimation = () => {
    Animated.sequence([
      animate(animation.y, height - boxHeight.current),
      animate(animation.x, width - boxWidth.current),
      animate(animation.y, 0),
      animate(animation.x, 0)
    ]).start()
  }

  const setMeasurements = (e) => {
    boxHeight.current = e.nativeEvent.layout.height
    boxWidth.current = e.nativeEvent.layout.width
    console.log(boxHeight.current, boxWidth.current)
  }

  const animatedStyles = {
    transform: animation.getTranslateTransform()
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onLayout={setMeasurements} onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'purple',
    top: 0,
    left: 0
  }
});

export default Corners;
