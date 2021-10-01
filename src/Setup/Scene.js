import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'

export function Scene({ children, orbit, cameraFov = 30, cameraPosition, cameraLookAt = new THREE.Vector3(0, 0, 0), lights = true }) {
  return (
    <Canvas
      performance={{ min: 1 }}
      mode="concurrent"
      frameloop="demand"
      shadows
      camera={{ fov: cameraFov, position: cameraPosition }}
      dpr={window.devicePixelRatio}>
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      <OrbitControls
        regress
        maxAzimuthAngle={Math.PI / 2}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI / 2}
        minPolarAngle={0}
        target={cameraLookAt}
        ref={orbit}
        makeDefault
      />
      {children}
      {lights && (
        <>
          <hemisphereLight args={['#fff', '#fff', 0.22]} />
          <spotLight
            intensity={0.6}
            position={[1.1, 4, 2]}
            penumbra={0.7}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
        </>
      )}
      <Stats showPanel={0} />
    </Canvas>
  )
}
