import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

const ListItem = ({ item, viewableItems }) => {

  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value
      .filter(item => item.isViewable)
      .find(viewableItem => viewableItem.item.id === item.id)

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{
        scale: withTiming(isVisible ? 1 : 0.6)
      }]
    }
  }, [])

  return (
    <Animated.View style={[styles.listItem, rStyle]} />
  )
}

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    width: '90%',
    backgroundColor: '#78CAD2',
    marginTop: 20,
    borderRadius: 15,
    alignSelf: 'center'
  }
})

export default ListItem