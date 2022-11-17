import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Animated, PanResponder, Text, TouchableOpacity } from 'react-native'

import MercifylFate from '../../assets/Cards/mercifulfate.jpeg'
import AliceCooper from '../../assets/Cards/alicecooper.jpeg'
import JudasPriest from '../../assets/Cards/judaspriiest.jpeg'
import Doro from '../../assets/Cards/doro.jpeg'

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

const SWIPE_THRESHOLD = 120

const KittenCards = () => {
  const [data, setData] = useState([
    { image: AliceCooper, id: 1, text: 'Surprising' },
    { image: Doro, id: 2, text: 'Most emotional' },
    { image: JudasPriest, id: 3, text: 'Most banging' },
    { image: MercifylFate, id: 4, text: 'ALL COMBINED TOGETHER' }
  ])
  const [animation] = useState(new Animated.ValueXY())
  const [opacity] = useState(new Animated.Value(1))
  const [scaleNext] = useState(new Animated.Value(0.9))

  useEffect(() => {
    if (data.length < 4) {
      animation.setValue({ x: 0, y: 0 })
      opacity.setValue(1)
      scaleNext.setValue(0.9)
    }
  }, [data])

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: animation.x,
        dy: animation.y
      }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, { dx, vx, vy }) => {
      let velocity;
      if (vx > 0) {
        velocity = clamp(vx, 3, 5)
      } else if (vx < 0) {
        velocity = clamp(Math.abs(vx), 3, 5) * -1
      }

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        Animated.decay(animation, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.99,
          useNativeDriver: false
        }).start(transitionNext)
      } else {
        Animated.spring(animation, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false
        }).start()
      }
    }
  }), [])

  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.spring(scaleNext, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false
      })
    ]).start(() => {
      setData(prevData => prevData.slice(1))
    })
  }

  const handleButtonPress = (toValue) => {
    Animated.timing(animation.x, {
      toValue,
      useNativeDriver: false
    }).start(transitionNext)
  }

  const renderCards = () => {
    const rotateInterpolate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp'
    })

    const opacityInterpolate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp'
    })

    const animatedCardStyles = {
      opacity,
      transform: [
        ...animation.getTranslateTransform(),
        {
          rotate: rotateInterpolate
        }
      ]
    }

    const animatedImageStyles = {
      opacity: opacityInterpolate
    }

    const arrayOfCards = data.slice(0, 2).reverse()
    return arrayOfCards.map((item, i, items) => {
      const { image, text, id } = item

      const lastItem = items.length - 1 === i
      const secondToLast = items.length - 2 === i

      const panHandlers = lastItem ? _panResponder.panHandlers : {}
      const cardStyles = lastItem ? animatedCardStyles : undefined
      const imageStyles = lastItem ? animatedImageStyles : undefined
      const nextCardStyle = secondToLast ? {
        transform: [{ scale: scaleNext }]
      } : undefined

      return (
        <Animated.View {...panHandlers} key={id} style={[styles.card, cardStyles, nextCardStyle]}>
          <Animated.Image
            style={[styles.imageStyle, imageStyles]}
            resizeMode='cover'
            source={image}
          />
          <View style={styles.textContainer}>
            <Text>{text}</Text>
          </View>
          {renderNoYesBoxes(lastItem)}
        </Animated.View>
      )
    })
  }

  const renderNoYesBoxes = (lastItem) => {
    const yesOpacity = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1]
    })
    const yesScale = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0.5, 1],
      extrapolate: 'clamp'
    })
    const animatedYesStyles = {
      transform: [
        { scale: yesScale },
        { rotate: '-30deg' }
      ],
      opacity: yesOpacity
    }

    const noOpacity = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0]
    })
    const noScale = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp'
    })
    const animatedNopeStyles = {
      transform: [
        { scale: noScale },
        { rotate: '30deg' }
      ],
      opacity: noOpacity
    }
    return (
      <>
        {lastItem && (
          <Animated.View style={[styles.nopeBox, animatedNopeStyles]}>
            <Text style={styles.nopeText}>Nope!</Text>
          </Animated.View>
        )}
        {lastItem && (
          <Animated.View style={[styles.yesBox, animatedYesStyles]}>
            <Text style={styles.yupText}>Yup!</Text>
          </Animated.View>
        )}
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {renderCards()}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => handleButtonPress(-SWIPE_THRESHOLD)}
          style={[styles.button, styles.noButton]}
        >
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress(SWIPE_THRESHOLD)}
          style={[styles.button, styles.yesButton]}
        >
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  imageStyle: {
    width: null,
    height: null,
    flex: 3,
    borderRadius: 3
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5
  },
  button: {
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: 'white'
  },
  yesButton: {
    shadowColor: 'green'
  },
  noButton: {
    shadowColor: 'red'
  },
  nopeBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    padding: 20,
    borderRadius: 5,
    top: 20,
    right: 20,
    backgroundColor: 'white'
  },
  yesBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'green',
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: 'white'
  },
  yupText: {
    fontSize: 16,
    color: 'green'
  },
  nopeText: {
    fontSize: 16,
    color: 'red'
  }
})

export default KittenCards