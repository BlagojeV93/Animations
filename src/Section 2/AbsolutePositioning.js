import React, { useRef } from 'react';
import { StyleSheet, Animated, View, TouchableWithoutFeedback } from 'react-native';

const AbsolutePositioning = () => {
  const animation = useRef(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation.current, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false
    }).start()
  }

  const animatedStyles = {
    top: animation.current,
    right: animation.current,
    left: animation.current
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}/>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    // width: 150,
    height: 150,
    backgroundColor: 'green'
  }
});

export default AbsolutePositioning;
