import React, { useState } from 'react';
import { StyleSheet, Animated, ScrollView, View } from 'react-native';

const Event = () => {
  const [animation] = useState(new Animated.Value(0))

  const backgroundInterpolation = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ['orange', 'purple']
  })

  const animationStyle = {
    backgroundColor: backgroundInterpolation
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: animation }
            }
          }
        ], { useNativeDriver: false })}
      >
        <Animated.View style={[styles.content, animationStyle]}>

        </Animated.View>
      </ScrollView>
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

export default Event;
