import React from 'react';
import { useRoomStore } from '../../store/useRoomStore';

interface RoomWallsProps {
  width?: number;
  height?: number;
  depth?: number;
  wallThickness?: number;
}

export const RoomWalls: React.FC<RoomWallsProps> = ({
  width = 8,
  height = 3,
  depth = 8,
  wallThickness = 0.2,
}) => {
  const theme = useRoomStore((state) => state.theme);
  const isDark = theme === 'dark';

  const halfW = width / 2;
  const halfD = depth / 2;
  const halfH = height / 2;

  // โทนสีห้องตามธีม
  const floorColor = isDark ? '#1e293b' : '#e2e8f0';
  const wallColor = isDark ? '#334155' : '#cbd5e1';
  const baseboardColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <group>
      {/* พื้นห้อง */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.7} />
      </mesh>

      {/* ผนังด้านหลัง */}
      <mesh position={[0, halfH, -halfD - wallThickness / 2]} receiveShadow castShadow>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* ผนังด้านซ้ายพร้อมช่องหน้าต่าง */}
      <group position={[-halfW - wallThickness / 2, halfH, 0]}>
        <mesh position={[0, 0, -depth / 4 - 0.5]}>
          <boxGeometry args={[wallThickness, height, depth / 2 - 1]} />
          <meshStandardMaterial color={wallColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, depth / 4 + 0.5]}>
          <boxGeometry args={[wallThickness, height, depth / 2 - 1]} />
          <meshStandardMaterial color={wallColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, height / 4 + 0.5, 0]}>
          <boxGeometry args={[wallThickness, height / 2 - 0.5, 2]} />
          <meshStandardMaterial color={wallColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, -height / 4 - 0.25, 0]}>
          <boxGeometry args={[wallThickness, height / 2 - 0.5, 2]} />
          <meshStandardMaterial color={wallColor} roughness={0.6} />
        </mesh>

        {/* กระจกหน้าต่าง */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.05, 1.2, 1.9]} />
          <meshPhysicalMaterial
            color={isDark ? '#38bdf8' : '#0284c7'}
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.8}
            thickness={0.1}
          />
        </mesh>
      </group>

      {/* บัวเชิงผนัง */}
      <mesh position={[0, 0.05, -halfD + 0.05]}>
        <boxGeometry args={[width, 0.1, 0.05]} />
        <meshStandardMaterial color={baseboardColor} />
      </mesh>
    </group>
  );
};