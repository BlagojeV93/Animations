import React, { useState, useMemo } from 'react';
import { StyleSheet, Animated, PanResponder, View } from 'react-native';

import Pic from '../../assets/Elin_Larsson_(Blues_Pills).jpeg'

const StaggeredHeads = () => {
  const [headsArray] = useState([
    { text: 'Drag me!', image: Pic, animation: new Animated.ValueXY() },
    { image: Pic, animation: new Animated.ValueXY() },
    { image: Pic, animation: new Animated.ValueXY() },
    { image: Pic, animation: new Animated.ValueXY() },
  ])

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      headsArray.map(({ animation }) => {
        animation.extractOffset()
        animation.setValue({ x: 0, y: 0 })
      })
    },
    onPanResponderMove: (e, { dx, dy }) => {
      headsArray[0].animation.setValue({
        x: dx, y: dy
      })
      headsArray.slice(1).map((item, i) => {
        return Animated.sequence([
          Animated.delay(i * 10),
          Animated.spring(item.animation, {
            toValue: { x: dx, y: dy },
            useNativeDriver: false
          })
        ]).start()
      })
    }
  }), [])


  const renderHeads = () => headsArray.slice().reverse().map((item, i, items) => {
    const lastItem = i === items.length - 1
    const pan = lastItem ? _panResponder.panHandlers : {}
    return (
      <Animated.Image
        {...pan}
        key={i}
        source={item.image}
        style={[styles.head, {
          transform: item.animation.getTranslateTransform()
        }]}
      />
    )
  })

  return (
    <View style={styles.container}>
      {renderHeads()}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StaggeredHeads;
