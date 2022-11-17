import React, { useState } from "react";
import { Dimensions, StyleSheet, Switch, Text } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const SIZE = Dimensions.get('window').width * 0.7

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8'
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E'
  }
}

const SwithColors = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)'
}

const InterpolateColors = () => {
  const [theme, setTheme] = useState('light')
  //const progress = useSharedValue(0)

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0)
  }, [theme])

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      Colors.light.background,
      Colors.dark.background
    ])

    return {
      backgroundColor
    }
  }, [])

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      Colors.light.circle,
      Colors.dark.circle
    ])

    return {
      backgroundColor
    }
  }, [])

  const rTextSyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [
      Colors.light.text,
      Colors.dark.text
    ])

    return {
      color
    }
  }, [])

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextSyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => setTheme(toggled ? 'dark' : 'light')}
          trackColor={SwithColors}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    shadowOffset:{
      width: 0,
      height: 20
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: 'white',
    elevation: 6
  },
  text: {
    fontSize: 60,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 35
  }
})

export default InterpolateColors