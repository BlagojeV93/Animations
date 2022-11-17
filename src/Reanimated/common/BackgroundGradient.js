import React, { useEffect } from 'react'
import { BlurMask, Canvas, RoundedRect, SweepGradient, useSharedValueEffect, useValue, vec } from '@shopify/react-native-skia'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

const BackgroundGradient = ({ width, height }) => {
  const rValue = useSharedValue(0)
  const sKvalue = useValue(0)

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, { duration: 1000 }), -1, true)
  }, [])

  useSharedValueEffect(() => {
    sKvalue.current = rValue.value
  }, rValue)

  const canvasPadding = 40

  return (
    <Canvas
      style={{
        height: height + canvasPadding,
        width: width + canvasPadding
      }}
    >
      <RoundedRect
        x={canvasPadding / 2}
        y={canvasPadding / 2}
        width={width}
        height={height}
        color='white'
        r={20}
      >
        <SweepGradient
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask
          blur={sKvalue}
          style={'solid'}
        />
      </RoundedRect>
    </Canvas>
  )
}

export default BackgroundGradient