import React, { useState } from "react";
import { Animated, StyleSheet, Text, View, ScrollView, Dimensions, PixelRatio } from "react-native";

import images from '../../assets/IntroScreenImages'

const { width, height } = Dimensions.get('window')

const getScreen1Styles = (animation) => {
  const image2XInterpolate = animation.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [150, 0, -150],
    extrapolate: 'clamp'
  })

  return {
    image1: {},
    image2: {
      transform: [
        { translateX: image2XInterpolate }
      ]
    },
    image3: {}
  }
}

const getScreen2Styles = (animation) => {
  const inputRange = [0, width, width * 2]

  const image2YInterpolate = animation.interpolate({
    inputRange,
    outputRange: [150, 0, - 150],
    extrapolate: 'clamp'
  })

  const image2OpacityInterpolate = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  })

  return {
    image1: {},
    image2: {
      opacity: image2OpacityInterpolate,
      transform: [
        { translateY: image2YInterpolate }
      ]
    },
    image3: {}
  }
}

const getScreen3Styles = (animation) => {
  const inputRange = [width, width * 2, width * 3]
  //const inputRange = [width, width * 2]

  const imageScaleInterpolate = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    //outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const image2RotateInterpolate = animation.interpolate({
    inputRange,
    outputRange: ['-180deg', '0deg', '180deg'],
    //outputRange: ['180deg', '0deg'],
    extrapolate: 'clamp'
  })

  return {
    image1: {
      transform: [
        { scale: imageScaleInterpolate }
      ]
    },
    image2: {
      transform: [
        { scale: imageScaleInterpolate },
        { rotate: image2RotateInterpolate }
      ]
    },
    image3: {}
  }
}

const ApplicationIntroScreen = () => {
  const [animation] = useState(new Animated.Value(0))

  const renderScreen = (screen, screenStyle) => (
    <View style={{ backgroundColor: '#F89E20', width, height }}>
      <View style={styles.screenHeader}>
        <Animated.Image
          source={images.Image1}
          style={[{
            width: PixelRatio.getPixelSizeForLayoutSize(75),
            height: PixelRatio.getPixelSizeForLayoutSize(63)
          },
          screenStyle.image1
          ]}
          resizeMode='contain'
        />
        <Animated.Image
          source={images.Image2}
          style={[{
            width: PixelRatio.getPixelSizeForLayoutSize(46),
            height: PixelRatio.getPixelSizeForLayoutSize(28),
            position: 'absolute',
            top: 175,
            left: 90
          },
          screenStyle?.image2
          ]}
          resizeMode='contain'
        />
        <Animated.Image
          source={images.Image3}
          style={[{
            width: PixelRatio.getPixelSizeForLayoutSize(23),
            height: PixelRatio.getPixelSizeForLayoutSize(17),
            position: 'absolute',
            top: 140,
            left: 85
          }]}
          resizeMode='contain'
        />
      </View>
      <View style={styles.screenText}>
        <Text>{screen}</Text>
      </View>
    </View>
  )

  const screen1Style = getScreen1Styles(animation)
  const screen2Style = getScreen2Styles(animation)
  const screen3Style = getScreen3Styles(animation)

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: animation
              }
            }
          }
        ], { useNativeDriver: false })}
      >
        {renderScreen('Screen 1', screen1Style)}
        {renderScreen('Screen 2', screen2Style)}
        {renderScreen('Screen 3', screen3Style)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  screenHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenText: {
    flex: 1
  }
})

export default ApplicationIntroScreen