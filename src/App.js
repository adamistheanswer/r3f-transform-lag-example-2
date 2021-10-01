import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Scene } from './Setup/Scene'
import { generateBlocks, getRowPlacementArr } from './Setup/generateBlocks'
import data from './utils/data.json'
import { ROW_SPACING, ROW_WIDTH, ZOOM_LEVEL } from './utils/constants'

export default function App() {
  const orbit = useRef()

  const [centerY, setCenterY] = useState(0)
  const [centerX, setCenterX] = useState(0)

  useEffect(() => {
    const rowPlacementArr = getRowPlacementArr(data)
    setCenterY((rowPlacementArr[0].length / 2) * ROW_SPACING - ROW_SPACING / 2)
    setCenterX((rowPlacementArr.length - 1) * (ROW_WIDTH / 2))
  }, [])

  return (
    <Scene
      helper={true}
      orbit={orbit}
      cameraLookAt={new THREE.Vector3(centerX, centerY, 0)}
      cameraPosition={[centerX, centerY, ZOOM_LEVEL]}>
      {generateBlocks(data, orbit)}
    </Scene>
  )
}
