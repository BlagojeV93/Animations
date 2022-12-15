import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import ListItem from './common/ListItem'

const data = new Array(50).fill().map((_, index) => ({ id: index }))

const AnimatedFlatlist = () => {

  const viewableItems = useSharedValue([])

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%'
  },
  list: {
    paddingTop: 40
  }
})

export default AnimatedFlatlist