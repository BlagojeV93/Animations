

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';
import { interpolatePath } from 'd3-interpolate-path'
import Svg, { Path } from 'react-native-svg'

const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`

const D3InterpolatePath = () => {
  const [animation] = useState(new Animated.Value(0))
  const svgRef = useRef()

  useEffect(() => {
    const pathInterpolate = interpolatePath(startPath, endPath)
    animation.addListener(({ value }) => {
      const path = pathInterpolate(value)
      svgRef.current.setNativeProps({ d: path })
    })
  }, [])

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.delay(1500),
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start()
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={startAnimation}>
        <Svg width={150} height={150} fill='black'>
          <Path d={startPath} ref={svgRef} />
        </Svg>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default D3InterpolatePath;
