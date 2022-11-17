import React from "react";
import { View, Animated, Dimensions, StyleSheet, Text } from "react-native";

const { width, height } = Dimensions.get('window')

const Moment = ({ image, title, translateX }) => {

  const animatedStyles = {
    transform: [
      { translateX }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={image}
        style={[styles.image, animatedStyles]}
      />
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <View style={styles.textWrap}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  center: {
    justifyContent: 'center'
  },
  textWrap: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  }
})

export default Moment