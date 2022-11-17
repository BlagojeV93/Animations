import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Image, FlatList, Animated, Text } from 'react-native'

import images from '../../assets/PhotoGridImages'

const animate = (animation, toValue) => Animated.spring(animation, {
  toValue,
  useNativeDriver: false
})

const animateTiming = (animation, toValue) => Animated.timing(animation, {
  toValue,
  duration: 250,
  useNativeDriver: false
})

const PhotoGridSharedElement = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [size] = useState(new Animated.ValueXY())
  const [position] = useState(new Animated.ValueXY())
  const [animation] = useState(new Animated.Value(0))
  const gridImages = useRef({})
  const measureData = useRef({})
  const viewImage = useRef()

  useEffect(() => {
    if (selectedImage) {
      viewImage.current.measure((x, y, width, height, pageX, pageY) => {
        Animated.parallel([
          animate(position.x, pageX),
          animate(position.y, pageY),
          animate(size.x, width),
          animate(size.y, height),
          animate(animation, 1)
        ]).start()
      })
    }
  }, [selectedImage])

  const handleOnPress = (index) => {
    gridImages[index].measure((x, y, width, height, pageX, pageY) => {
      measureData.current = { width, height, pageX, pageY }
      position.setValue({ x: pageX, y: pageY })
      size.setValue({ x: width, y: height })

      setActiveIndex(index)
      setSelectedImage(images[index])
    })
  }

  const handleClose = () => {
    Animated.parallel([
      animateTiming(size.x, measureData.current.width),
      animateTiming(size.y, measureData.current.height),
      animateTiming(position.x, measureData.current.pageX),
      animateTiming(position.y, measureData.current.pageY),
      animateTiming(animation, 0)
    ]).start(() => setSelectedImage(null))
  }

  const renderSelectedImage = () => {

    const animatedContentInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0]
    })

    const animatedContentStyles = {
      opacity: animation,
      transform: [
        { translateY: animatedContentInterpolate }
      ]
    }

    const activeImageStyle = {
      width: size.x,
      height: size.y,
      left: position.x,
      top: position.y
    }

    const animatedCloseStyles = {
      opacity: animation
    }

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={selectedImage ? 'auto' : 'none'}
      >
        <View
          style={styles.topContent}
          ref={viewImage}
          onLayout={() => {}}
        >
          <Animated.Image
            key={selectedImage}
            source={selectedImage}
            resizeMode='cover'
            style={[styles.viewImage, activeImageStyle]}
          />
        </View>
        <Animated.View style={[styles.content, animatedContentStyles]}>
          <Text style={styles.title}>
            Pretty Image from Goyebla
          </Text>
          <Text>
            "Prihodi od proizvodnje dijamanata idu u korist ruskoj državi, koja vodi unapred smišljen, ničim izazvan i neopravdan rat“, navodi se u pismu koje je Džordž Čajati , zvaničnik američkog Stejt departmenta, u maju poslao predsednicima Kimberlijevog procesa. Reč je o međunarodnoj organizaciji stvorenoj rezolucijom Ujedinjenih nacija, koju čine predstavnici država, industrije i civilnog društva, čiji je zadatak da spreči protok "krvavih dijamanata”.
          </Text>
        </Animated.View>
        <Pressable onPress={handleClose} style={styles.close}>
          <Animated.View style={[styles.close, animatedCloseStyles]}>
            <Text style={styles.closeText}>X</Text>
          </Animated.View>
        </Pressable>
      </View>
    )
  }

  const renderImage = (src, index) => {
    const activeIndexStyle = {
      opacity: selectedImage ? 0 : 1
    }

    const style = index === activeIndex ? activeIndexStyle : undefined
    return (
      <Pressable style={styles.gridImage} onPress={() => handleOnPress(index)}>
        <Image
          source={src}
          resizeMode='cover'
          style={[styles.imageStyle, style]}
          ref={image => gridImages[index] = image}
        />
      </Pressable>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={images}
        renderItem={({ item, index }) => renderImage(item, index)}
        numColumns={3}
        bounces={false}
      />
      {renderSelectedImage()}
    </View>
  )

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridImage: {
    width: '33%',
    height: 150
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  topContent: {
    flex: 1
  },
  content: {
    flex: 2,
    backgroundColor: 'white'
  },
  viewImage: {
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    left: 0
  },
  title: {
    fontSize: 28,
    marginVertical: 10
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  closeText: {
    fontSize: 28,
    color: 'white'
  }
})

export default PhotoGridSharedElement