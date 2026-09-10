import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { type FurnitureItem } from '../../store/useRoomStore';

// คอมโพเนนต์โหลดไฟล์ GLTF
const GLTFModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  
  // Clone scene เพื่อให้วัตถุแต่ละชิ้นไม่แชร์ State กัน
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} castShadow receiveShadow />;
};

// กล่อง Primitive สำรอง (กรณีไม่มี URL หรือกำลังโหลด)
const PrimitiveBox: React.FC<{ size: [number, number, number]; color: string; isSelected: boolean }> = ({
  size,
  color,
  isSelected,
}) => (
  <mesh castShadow receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
    {isSelected && (
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="#6366f1" linewidth={2} />
      </lineSegments>
    )}
  </mesh>
);

export const FurnitureModel: React.FC<{ item: FurnitureItem; isSelected: boolean }> = ({ item, isSelected }) => {
  return (
    <group>
      {item.modelUrl ? (
        <Suspense fallback={<PrimitiveBox size={item.size} color={item.color} isSelected={isSelected} />}>
          <GLTFModel url={item.modelUrl} />
        </Suspense>
      ) : (
        <PrimitiveBox size={item.size} color={item.color} isSelected={isSelected} />
      )}
    </group>
  );
};