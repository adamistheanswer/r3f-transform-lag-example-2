import { TransformControls } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

export function WrappedBlock({ orbit, blockGroup }) {
  const transform = useRef();

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (transform.current) {
      const { current: controls } = transform;
      const callback = (event) => {
        orbit.current.enabled = !event.value;
      };
      transform.current.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  }, [active, orbit]);

  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "white" }),
    []
  );
  const geom = useMemo(
    () =>
      new THREE.BoxBufferGeometry(
        blockGroup[0].width,
        blockGroup[0].height,
        blockGroup[0].depth
      ),
    [blockGroup]
  );

  const blockGroupMesh = blockGroup?.map((block, idx) => {
    return (
      <mesh
        key={block.x + block.y + block.z}
        geometry={geom}
        material={mat}
        position-z={idx * -block.depth}
        castShadow
        receiveShadow
      />
    );
  });

  return (
    <>
      <TransformControls
        position={[blockGroup[0].x, blockGroup[0].y, blockGroup[0].z]}
        showX={active ? true : false}
        showY={active ? true : false}
        showZ={false}
        ref={transform}
        mode="translate"
      >
        <group
          onClick={() => {
            setActive(!active);
          }}
        >
          {blockGroupMesh}
        </group>
      </TransformControls>

      {/* {active ? (
        <TransformControls
          ref={transform}
          position={[blockGroup[0].x, blockGroup[0].y, blockGroup[0].z]}
          showX={active ? true : false}
          showY={active ? true : false}
          showZ={false}
        >
          <group
            onClick={(e) => {
              setActive(!active);
            }}
          >
            {blockGroupMesh}
          </group>
        </TransformControls>
      ) : (
        <group
          position={[blockGroup[0].x, blockGroup[0].y, blockGroup[0].z]}
          onClick={() => {
            setActive(!active);
          }}
        >
          {blockGroupMesh}
        </group>
      )} */}
    </>
  );
}
