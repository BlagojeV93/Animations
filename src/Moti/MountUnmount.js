import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native'

import { MotiView, AnimatePresence } from 'moti'

const MountUnmount = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 3000)
  }, [])

  const Skeleton = () => (
    <MotiView
      style={styles.motiView2}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
    />
  )


  const WithAnimatedPresence = () => (
    <AnimatePresence exitBeforeEnter>
      {visible && <Skeleton key="skeleton" />}

      {!visible && (
        <MotiView
          style={styles.motiView}
          key="content"
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
        />
      )}
    </AnimatePresence>
  )

  return (
    <View>
      <WithAnimatedPresence />
      {/* <AnimatePresence>
      {visible && (
        <MotiView
          style={styles.motiView}
          from={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
        />
      )}
    </AnimatePresence> */}
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
  motiView: {
    height: 100,
    width: 100,
    backgroundColor: 'black'
  },
  motiView2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow'
  }
})

export default MountUnmount