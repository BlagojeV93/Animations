import React, { forwardRef } from "react";
import { StyleSheet, Text, Dimensions } from 'react-native'
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LIST_ITEM_HEIGHT = 70
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TRANSLATE_X_TRESHOLD = -SCREEN_WIDTH * 0.3

const TaskListItem = forwardRef((props, ref) => {
  const { task, onDissmis } = props
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
  const marginVertical = useSharedValue(10)
  const opacity = useSharedValue(1)

  const panGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX
    },
    onEnd: () => {
      if (translateX.value < TRANSLATE_X_TRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0, null, (finished) => {
          if (finished) {
            runOnJS(onDissmis)(task)
          }
        })
      } else {
        translateX.value = withSpring(0)
      }
    }
  })

  const taskStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }
      ]
    }
  })

  const iconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_TRESHOLD ? 1 : 0)
    return {
      opacity
    }
  })

  const mainStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value
    }
  })

  return (
    <Animated.View style={[styles.outterContainer, mainStyle]}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <Icon name='trash-can' size={LIST_ITEM_HEIGHT * 0.4} color='red' />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={ref}
        onGestureEvent={panGestureEvent}
      >
        <Animated.View style={[styles.container, taskStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  outterContainer: {
    width: '100%',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 6
  },
  taskTitle: {
    fontSize: 16
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TaskListItem