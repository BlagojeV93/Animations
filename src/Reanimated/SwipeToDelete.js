import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import TaskListItem from "./common/TaskListItem";

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

const TASKS = TITLES.map((title, index) => ({ title, index }))

const BACKGROUND_COLOR = '#FAFBFF'

const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS)
  const scrollRef = useRef(null)

  const onDismiss = useCallback((task) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  }, [])

  const renderTasks = () => tasks.map((task) => {
    return (
      <TaskListItem
        ref={scrollRef}
        key={task.index}
        task={task}
        onDissmis={onDismiss}
      />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {renderTasks()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BACKGROUND_COLOR
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%'
  }
})

export default SwipeToDelete