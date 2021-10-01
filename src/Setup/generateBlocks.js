import { cmToSi, ROW_DEPTH, ROW_HEIGHT, ROW_WIDTH, ROW_SPACING } from '../utils/constants'
import React from 'react'
import { WrappedBlock } from '../Blocks/TransformBlock'

export const getRowPlacementArr = (data) => {
  return data?.bays.map((bay, idx) => {
    return [...Array(bay?.levels.length)].map((_, i) => {
      return {
        x: idx * ROW_WIDTH,
        y: i * ROW_SPACING,
        z: 0,
        ROW_HEIGHT,
        ROW_WIDTH,
        ROW_DEPTH
      }
    })
  })
}

export const generateBlocks = (data, orbit) => {
  const rowPlacementArr = getRowPlacementArr(data)
  const items3dArr = data.bays
    .map((bay) => bay.levels.map((element) => element))
    .map((bay, i) =>
      bay.map((level, idx) => {
        return generateBlocksFromData(
          level,
          rowPlacementArr[i][rowPlacementArr[i]?.length - 1 - idx]?.y,
          ROW_WIDTH / 2 + -ROW_WIDTH * i,
          ROW_DEPTH,
          orbit
        )
      })
    )
  return items3dArr
}

const buildBlockReadings = (item) => {
  const matrix = new Array(item.horizontal).fill().map(() => new Array(item.vertical).fill(0))
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      const depthArr = [...Array(item.count)].map((_, idx) => {
        return { ...item, y: item.y + item.height * j, x: item.x + item.width * i, z: item.z + item.depth * idx }
      })
      matrix[i][j] = depthArr
    }
  }
  return matrix.flat(2)
}

export const generateBlocksFromData = (row, YAdd, XSub, depth, orbit) => {
  const rowItems = row?.readings.map((item) => {
    return {
      ...item,
      height: cmToSi(item.height),
      width: cmToSi(item.width),
      depth: cmToSi(item.depth),
      x: cmToSi(item.x) + cmToSi(item.width) / 2 - XSub,
      y: YAdd + cmToSi(item.height) / 2 + ROW_HEIGHT / 2,
      z: 0 - cmToSi(item.depth) / 2 + depth / 2
    }
  })

  const allReadings = []

  rowItems.forEach((item) => {
    allReadings.push(buildBlockReadings(item))
  })

  return allReadings?.map((blockGroup) => <WrappedBlock blockGroup={blockGroup} orbit={orbit} />)
}
