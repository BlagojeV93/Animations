import React, { useState } from 'react';
import { StyleSheet, Animated, View, Button } from 'react-native';

const AnimatedButton = Animated.createAnimatedComponent(Button)

const CreateNativeProps = () => {
  const [animation] = useState(new Animated.Value(0))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
  }

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['blue', 'yellow']
  })

  return (
    <View style={styles.container}>
        <AnimatedButton title='PRESS ME' onPress={startAnimation} color={colorInterpolate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
});

export default CreateNativeProps;
