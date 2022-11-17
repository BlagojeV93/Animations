import React, { useCallback } from "react";
import { View, StyleSheet, Text } from 'react-native'
import Ripple from "./common/Ripple";

const RippleEffect = () => {

  const onTapHandler = useCallback(() => {
    console.log('Tap')
  }, [])

  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={onTapHandler}>
        <Text style={styles.tapText}>Tap</Text>
      </Ripple>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  tapText: {
    fontSize: 25
  }
})

export default RippleEffect