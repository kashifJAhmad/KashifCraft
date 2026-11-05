import React, { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { BUILD_AREA } from '../../data/blockTypes'
import { getTexture } from '../../utils/textures'

export default function Terrain() {
  const normalMeshRef = useRef()
  const buildMeshRef = useRef()
  const pathMeshRef = useRef()
  const mountainMeshRef = useRef()

  // Generate terrain layout
  const { normalBlocks, buildBlocks, pathBlocks, mountainBlocks } = useMemo(() => {
    const normal = []
    const build = []
    const paths = []
    const mountains = []

    const isPath = (x, z) => {
      // Cross paths connecting center (0,0) to buildings:
      // To Library (0, 0, -16): path along x=0, z between -16 and 0
      if (Math.abs(x) <= 1 && z >= -16 && z <= 0) return true
      // To Village (0, 0, 18): path along x=0, z between 0 and 18
      if (Math.abs(x) <= 1 && z >= 0 && z <= 18) return true
      // To Wooden House (-14, 0, -8) & Projects (-14, 0, 10)
      if (Math.abs(z) <= 1 && x >= -14 && x <= 0) return true
      if (Math.abs(x - (-14)) <= 1 && z >= -8 && z <= 10) return true
      // To Mining (14, 0, -8) & Achievements (14, 0, 10)
      if (Math.abs(z) <= 1 && x >= 0 && x <= 14) return true
      if (Math.abs(x - 14) <= 1 && z >= -8 && z <= 10) return true
      return false
    }

    const isWater = (x, z) => {
      // Water pond in corner
      return x >= 15 && x <= 23 && z >= 15 && z <= 23
    }

    const isBuildArea = (x, z) => {
      return x >= BUILD_AREA.minX && x <= BUILD_AREA.maxX && z >= BUILD_AREA.minZ && z <= BUILD_AREA.maxZ
    }

    // Mountains on outer edges (e.g. North and West boundaries)
    const getMountainHeight = (x, z) => {
      if (x <= -19 && z <= -12) return 3 + Math.floor(Math.sin(x * 0.5) * 2 + Math.cos(z * 0.5) * 2)
      if (x <= -20) return 2 + Math.floor(Math.abs(x + 20) * 0.5)
      if (z <= -20) return 2 + Math.floor(Math.abs(z + 20) * 0.5)
      return 0
    }

    for (let x = -24; x <= 24; x++) {
      for (let z = -24; z <= 24; z++) {
        if (isWater(x, z)) continue

        if (isBuildArea(x, z)) {
          build.push([x, 0, z])
          continue
        }

        const mHeight = getMountainHeight(x, z)
        if (mHeight > 0) {
          for (let y = 0; y <= mHeight; y++) {
            mountains.push([x, y, z, y === mHeight])
          }
          continue
        }

        if (isPath(x, z)) {
          paths.push([x, 0, z])
        } else {
          normal.push([x, 0, z])
        }
      }
    }

    return { normalBlocks: normal, buildBlocks: build, pathBlocks: paths, mountainBlocks: mountains }
  }, [])

  // Setup instanced matrices
  const tempObject = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    if (normalMeshRef.current) {
      normalBlocks.forEach((pos, i) => {
        tempObject.position.set(pos[0], pos[1], pos[2])
        tempObject.updateMatrix()
        normalMeshRef.current.setMatrixAt(i, tempObject.matrix)
      })
      normalMeshRef.current.instanceMatrix.needsUpdate = true
    }

    if (buildMeshRef.current) {
      buildBlocks.forEach((pos, i) => {
        tempObject.position.set(pos[0], pos[1], pos[2])
        tempObject.updateMatrix()
        buildMeshRef.current.setMatrixAt(i, tempObject.matrix)
      })
      buildMeshRef.current.instanceMatrix.needsUpdate = true
    }

    if (pathMeshRef.current) {
      pathBlocks.forEach((pos, i) => {
        tempObject.position.set(pos[0], pos[1], pos[2])
        tempObject.updateMatrix()
        pathMeshRef.current.setMatrixAt(i, tempObject.matrix)
      })
      pathMeshRef.current.instanceMatrix.needsUpdate = true
    }

    if (mountainMeshRef.current) {
      mountainBlocks.forEach((pos, i) => {
        tempObject.position.set(pos[0], pos[1], pos[2])
        tempObject.updateMatrix()
        mountainMeshRef.current.setMatrixAt(i, tempObject.matrix)
      })
      mountainMeshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [normalBlocks, buildBlocks, pathBlocks, mountainBlocks, tempObject])

  return (
    <group>
      {/* Normal Grass Terrain */}
      <instancedMesh
        ref={normalMeshRef}
        args={[null, null, normalBlocks.length]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={getTexture('#5ca832', 0.2)} color="white" />
      </instancedMesh>

      {/* Build Area Foundation (Smooth polished sandstone shade) */}
      <instancedMesh
        ref={buildMeshRef}
        args={[null, null, buildBlocks.length]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={getTexture('#3f7a22', 0.12)} color="white" />
      </instancedMesh>

      {/* Build Area Golden Border */}
      <lineSegments position={[-0.5, 0.52, -0.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(8.1, 0.1, 8.1)]} />
        <lineBasicMaterial color="#FFD700" linewidth={2} />
      </lineSegments>

      {/* Cobblestone / Dirt Paths */}
      <instancedMesh
        ref={pathMeshRef}
        args={[null, null, pathBlocks.length]}
        receiveShadow
      >
        <boxGeometry args={[1, 0.96, 1]} />
        <meshLambertMaterial map={getTexture('#948065', 0.24)} color="white" />
      </instancedMesh>

      {/* Mountain & Hill Blocks */}
      <instancedMesh
        ref={mountainMeshRef}
        args={[null, null, mountainBlocks.length]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={getTexture('#7f8c8d', 0.2)} color="white" />
      </instancedMesh>
    </group>
  )
}
