import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'

const LIST_ITEM_COLOR = '#1798DE'

const initialItems = new Array(5).fill(0).map((_, index) => ({ id: index }))

const LayoutAnimation = () => {
  const [items, setItems] = useState(initialItems)
  const initialMode = useRef(true)

  useEffect(() => {
    initialMode.current = false
  }, [])

  const onAdd = useCallback(() => {
    setItems((current => {
      const nextItemId = (current[current.length - 1]?.id ?? 0) + 1
      console.log(nextItemId)
      return [...current, { id: nextItemId }]
    }))
  }, [])

  const onDelete = useCallback((itemId) => {
    setItems((current) => current.filter(({ id }) => id !== itemId))
  }, [])

  const renderItems = () => items.map((item, index) => {
    return (
      <Animated.View
        entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
        exiting={FadeOut}
        layout={Layout.delay(50)}
        key={item.id}
        style={styles.listItem}
        onTouchEnd={() => onDelete(item.id)}
      />
    )
  })

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onAdd} style={styles.floatingButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollStyle} contentContainerStyle={{ paddingVertical: 50 }}>
        {renderItems()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%'
  },
  scrollStyle: {
    flex: 1
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    position: 'absolute',
    zIndex: 10,
    bottom: 50,
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plus: {
    color: 'white',
    fontSize: 40
  }
})

export default LayoutAnimation