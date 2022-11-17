import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Square from './common/Square'

const squares = new Array(12).fill(0)

const ClockLoader = () => {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, { duration: 8000, easing: Easing.linear }),
      -1)
  }, [])

  const renderSquares = () => squares.map((_, index) => {
    return (
      <Square
        key={index}
        index={index}
        progress={progress}
      />
    )
  })

  return (
    <View style={styles.mainContainer}>
      {renderSquares()}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: "#111",
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ClockLoader