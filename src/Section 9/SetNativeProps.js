import React, { useState, useRef } from 'react';
import { StyleSheet, Animated, ScrollView, View, Text } from 'react-native';

const SetNativeProps = () => {
  const [animation] = useState(new Animated.Value(0))
  const scrollRef = useRef()
  const enabled = useRef(true)

  const handleToggle = () => {
    enabled.current = !enabled.current
    let style = []
    if (enabled.current) {
      style.push(styles.show)
    } else {
      style.push(styles.hide)
    }

    scrollRef.current.setNativeProps({
      scrollEnabled: enabled.current,
      style
    })
  }

  const backgroundInterpolation = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ['orange', 'purple']
  })

  const animationStyle = {
    backgroundColor: backgroundInterpolation
  }

  return (
    <View style={styles.container}>
      <Text onPress={handleToggle} style={styles.toggle}>TOGGLE</Text>
      <ScrollView
        ref={scrollRef}
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
  toggle: {
    marginVertical: 20
  },
  content: {
    height: 3000
  },
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1
  }
});

export default SetNativeProps;
