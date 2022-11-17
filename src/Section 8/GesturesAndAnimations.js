import React, { useMemo, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {

  // dx, dy - always start from 0 and add direction, moveX and moveY - coordinates on the screen where touched/dragged

  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 50 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

const GesturesAndAnimations = () => {

  const [zone, setZone] = useState("Still Touchable")

  const _panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
    onPanResponderMove: (evt, gestureState) => {
      const drag = getDirectionAndColor(gestureState);
      setZone(drag)
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
  }), [])

  const onPress = () => {
    setZone("I got touched with a parent pan responder")
  };

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      <StatusBar hidden />
      <View style={styles.zone1} />
      <View style={styles.center}>
        <TouchableOpacity onPress={onPress}>
          <Text>{zone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.zone2} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zone1: {
    left: 0,
    right: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red",
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
});

export default GesturesAndAnimations