import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid } from '@react-three/drei';
import { useRoomStore, type FurnitureItem } from '../../store/useRoomStore';
import { RoomWalls } from './RoomWalls';
import { FurnitureModel } from './FurnitureModel';

const CameraController: React.FC = () => {
  const { viewMode } = useRoomStore();
  const { camera } = useThree();

  useEffect(() => {
    if (viewMode === '2D') {
      camera.position.set(0, 12, 0.001);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(6, 6, 6);
      camera.lookAt(0, 0, 0);
    }
  }, [viewMode, camera]);

  return null;
};

const InteractiveObject: React.FC<{ item: FurnitureItem }> = ({ item }) => {
  const { selectedItemId, selectItem, updateItemPosition } = useRoomStore();
  const isSelected = selectedItemId === item.id;
  const transformRef = useRef<any>(null);

  return (
    <group>
      {isSelected ? (
        <TransformControls
          ref={transformRef}
          mode="translate"
          translationSnap={0.25}
          position={item.position}
          rotation={[0, (item.rotation * Math.PI) / 180, 0]}
          onObjectChange={() => {
            if (transformRef.current?.object) {
              const pos = transformRef.current.object.position;
              const minY = item.size[1] / 2;
              const newY = Math.max(minY, pos.y);
              updateItemPosition(item.id, [
                Number(pos.x.toFixed(2)),
                Number(newY.toFixed(2)),
                Number(pos.z.toFixed(2)),
              ]);
            }
          }}
        >
          <group onClick={(e) => { e.stopPropagation(); selectItem(item.id); }}>
            <FurnitureModel item={item} isSelected={isSelected} />
          </group>
        </TransformControls>
      ) : (
        <group
          position={item.position}
          rotation={[0, (item.rotation * Math.PI) / 180, 0]}
          onClick={(e) => { e.stopPropagation(); selectItem(item.id); }}
        >
          <FurnitureModel item={item} isSelected={isSelected} />
        </group>
      )}
    </group>
  );
};

export const Scene: React.FC = () => {
  const { items, selectItem, viewMode, roomDimensions, theme } = useRoomStore();
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const gridCellColor = isDark ? '#334155' : '#cbd5e1';
  const gridSectionColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <Canvas
      camera={{ position: [6, 6, 6], fov: 45 }}
      shadows
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          selectItem(null);
        }
      }}
      className="w-full h-full"
    >
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={isDark ? 0.8 : 1.1} />
      <directionalLight position={[8, 12, 8]} intensity={isDark ? 1.2 : 1.5} castShadow />
      <pointLight position={[-4, 3, -4]} intensity={0.5} />

      <CameraController />

      {/* Grid Floor */}
      <Grid
        infiniteGrid
        fadeDistance={25}
        fadeStrength={1.5}
        cellSize={0.25}
        sectionSize={1}
        cellColor={gridCellColor}
        sectionColor={gridSectionColor}
      />

      {/* Room Walls & Floor */}
      <RoomWalls
        width={roomDimensions.width}
        height={roomDimensions.height}
        depth={roomDimensions.depth}
      />

      {/* Objects */}
      {items.map((item) => (
        <InteractiveObject key={item.id} item={item} />
      ))}

      <OrbitControls
        makeDefault
        enableRotate={viewMode === '3D'}
        maxPolarAngle={viewMode === '2D' ? 0.001 : Math.PI / 2 - 0.05}
        minPolarAngle={viewMode === '2D' ? 0 : 0}
      />
    </Canvas>
  );
};