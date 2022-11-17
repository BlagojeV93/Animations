import React, { useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

const NativeAnimations = () => {
  const [animation] = useState(new Animated.Value(0))

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: [1, 0]
  })

  const animationStyle = {
    backgroundColor: 'blue',
    opacity: opacityInterpolate
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: animation }
            }
          }
        ], { useNativeDriver: true })}
      >
        <Animated.View style={[styles.content, animationStyle]}>

        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  content: {
    height: 3000
  }
});

export default NativeAnimations;
