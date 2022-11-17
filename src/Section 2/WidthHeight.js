import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated, Text, View } from 'react-native';

const WidthHeight = () => {
  const [animation] = useState(new Animated.Value(150))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false
    }).start()
  }

  const animatedStyles = {
    width: animation,
    height: animation
    // can be only width or height
  }

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text>Animating width and height values will effect layout. These may not always be the most performant however sometimes they are necessary. These are commonly used when you have predefined sizing. They are also typically used for dynamic sizing. With React Native you are able to measure the size of elements asynchronously.</Text>
      </Animated.View>
      <View style={styles.box2} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    // width: 150,
    // height: 150,
    backgroundColor: 'yellow'
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  }
});

export default WidthHeight;
