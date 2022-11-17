import React, { useCallback, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetComponent from './common/BottomSheetComponent'

const BottomSheet = () => {
  const ref = useRef()

  const onPress = useCallback(() => {
    const isActive = ref.current.isActiveHandler()
    if (isActive) {
      ref.current.scrollTo(0)
    } else {
      ref.current.scrollTo(-200)
    }
  }, [])

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button} />
      <BottomSheetComponent ref={ref}>
        <View style={styles.sheetView} />
      </BottomSheetComponent>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    opacity: 0.6
  },
  sheetView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange'
  }
})

export default BottomSheet