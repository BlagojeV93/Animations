import React from 'react';
import { StyleSheet, View } from 'react-native';

// SECTION 2: Animating Properties

import Opacity from './src/Section 2/Opacity'
import TranslatePostion from './src/Section 2/TranslatePosition';
import Scale from './src/Section 2/Scale';
import WidthHeight from './src/Section 2/WidthHeight';
import TranslateScaleWidthHeightCombination from './src/Section 2/TranslateScaleWidthHeightCombination';
import AbsolutePositioning from './src/Section 2/AbsolutePositioning';
import ColorBackgroundColor from './src/Section 2/ColorBackgroundColor';
import Rotation from './src/Section 2/Rotation';
import WidthHeightPercentage from './src/Section 2/WidthHeightPercentage';

// Section 3 - Animated.Value Functions

import Easing from './src/Section 3/Easing';

// Section 4 - Animated Functions

import Spring from './src/Section 4/Spring';
import Loop from './src/Section 4/Loop';
import Event from './src/Section 4/Event';
import Decay from './src/Section 4/Decay';
import Add from './src/Section 4/Add';
import Divide from './src/Section 4/Divide';
import Multiply from './src/Section 4/Multuply';
import Modulo from './src/Section 4/Modulo';
import ReanimatedMath from './src/Section 4/ReanimatedMath';

// Section 5 - Combining Animations

import Parallel from './src/Section 5/Parallel';
import Sequence from './src/Section 5/Sequence';
import Stagger from './src/Section 5/Stagger';
import Delay from './src/Section 5/Delay';

// Section 6 - Interpolation

import NumbersAndInterpolates from './src/Section 6/NumbersAndInterpolates';
import ColorBackgroundColor2 from './src/Section 6/ColorBackgroundColor';
import Rotation2 from './src/Section 6/Rotation';
import Extrapolate from './src/Section 6/Extrapolate';
import MixingExtrapolates from './src/Section 6/MixingExtrapolates';

// Section 7 - Native Animations

import NativeAnimations from './src/Section 7/NativeAnimations';

// Section 8 - Gestures and Animations

import GesturesAndAnimations from './src/Section 8/GesturesAndAnimations'

// Section 9 - Undersanding how Animated works

import CreateNativeProps from './src/Section 9/CreateNativeProps';
import SetNativeProps from './src/Section 9/SetNativeProps';
import D3Interpolate from './src/Section 9/D3-Interpolate';
import D3InterpolatePath from './src/Section 9/D3-InterpolatePath';
import ComplexSvgPaths from './src/Section 9/ComplexSvgPaths';
import Flubber from './src/Section 9/Flubber';

// Section 10 - Animation Techniques

import Cliff from './src/Section 10/Cliff';
import AnimateHidden from './src/Section 10/AnimateHidden';
import InterruptedAnimation from './src/Section 10/InterruptedAnimation';
import PointerEvents from './src/Section 10/PointerEvents';

// Secton 11 - Basic Real World

import Corners from './src/Section 11/Corners';
import StaggeredHeads from './src/Section 11/StaggeredHeads';
import KittenCards from './src/Section 11/KittenCards';
import FormItemsVisbility from './src/Section 11/FormItemsVisbility';
import AnimatedProgressBar from './src/Section 11/AnimatedProgressBar';
import AnimatedNotifications from './src/Section 11/AnimatedNotifications';
import AnimatedQuestionnaire from './src/Section 11/AnimatedQuestionnaire';

// Section 12 - Advanced Real World

import PhotoGridSharedElement from './src/Section 12/PhotoGridSharedElement'; 
import AnimatedColorPicker from './src/Section 12/AnimatedColorPricker';
import FloatingActionButton from './src/Section 12/FloatingActionButton';
import ApplicationIntroScreen from './src/Section 12/ApplicationIntroScreen';
import EvolvingWriteButton from './src/Section 12/EvolvingWriteButton'; 
import SocialCommentModal from './src/Section 12/SocialCommentModal';
import HorizontalParallaxScrollView from './src/Section 12/HorizontalParallaxScrollView';
import LoveFloatingHearts from './src/Section 12/LoveFloationHearts';
import BouncingHeartShapedLike from './src/Section 12/BouncingHeartShapedLike';
import NotifySuccessInput from './src/Section 12/NotifySuccessInput';

// Moti

import Moti from './src/Moti/Moti';

// Reanimated

import Intro from './src/Reanimated/Intro';
import PanGestureHandler from './src/Reanimated/PanGestureHandler';
import ScrollViewInterpolate from './src/Reanimated/ScrollViewInterpolate';
import InterpolateColors from './src/Reanimated/InterpolateColors';
import PinchGestureHandler from './src/Reanimated/PinchGestureHandler';
import DoubleTap from './src/Reanimated/DoubleTap';
import PanGestureHandlerScrollView from './src/Reanimated/PanGestureHandlerScrollView';
import ColorPicker from './src/Reanimated/ColorPicker';
import CircularProgressBar from './src/Reanimated/CircularProgressBar';
import SwipeToDelete from './src/Reanimated/SwipeToDelete';
import RippleEffect from './src/Reanimated/RippleEffect';
import PerspectiveMenu from './src/Reanimated/PerspectiveMenu';
import SlidingCounter from './src/Reanimated/SlidingCounter';
import ClockLoader from './src/Reanimated/ClockLoader';
import LayoutAnimation from './src/Reanimated/LayoutAnimation';
import GestureHandler from './src/Reanimated/GestureHandler';
import BottomSheet from './src/Reanimated/BottomSheet';
import Animated3DCard from './src/Reanimated/Animated3DCard';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <Animated3DCard />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;