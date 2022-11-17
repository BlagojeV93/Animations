import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native'

import { MotiView } from 'moti'

const FadeIn = () => {
  const [isLoading, setLoading] = useState(true)
  const [height, setHeight] = useState(100)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setHeight(500)
    }, 3000)
  }, [])

  const renderSimple = () => (
    <MotiView
      style={styles.motiView}
      // from={{ opacity: 0 }}
      // animate={{ opacity: isLoading ? 1 : 0 }}
      animate={{ height }}
      transition={{ type: 'timing' }}
    />
  )

  const renderMultiple = () => (
    <MotiView
      style={styles.motiView}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        duration: 350,

        // scale: {
        //   type: 'spring',
        //   delay: 100,
        // }
      }}
    />
  )

  return (
    <View>
      {/* {renderSimple()} */}
      {renderMultiple()}
    </View>
  )
}

const styles = StyleSheet.create({
  motiView: {
    height: 100,
    width: 100,
    backgroundColor: 'black'
  }
})

export default FadeIn