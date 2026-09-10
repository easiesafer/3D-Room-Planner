import React from 'react';
import { Scene } from '../canvas/Scene';
import { useRoomStore } from '../../store/useRoomStore';
import { Undo2, Redo2, Box, Eye, RotateCcw, Maximize2 } from 'lucide-react';

export const ViewportCanvas: React.FC = () => {
  const { viewMode, setViewMode } = useRoomStore();

  return (
    <main className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* Floating Toolbar Top Left */}
      <div className="absolute top-4 left-4 flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg backdrop-blur-md shadow-xl z-10">
        <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-md transition-all" title="Undo">
          <Undo2 className="w-4 h-4" />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-md transition-all" title="Redo">
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-800 mx-1" />
        <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-md transition-all" title="Reset View">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating View Mode Switcher */}
      <div className="absolute bottom-6 flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-xl backdrop-blur-md shadow-2xl z-10">
        <button
          onClick={() => setViewMode('3D')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === '3D'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>3D Perspective</span>
        </button>
        <button
          onClick={() => setViewMode('2D')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewMode === '2D'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>2D Floorplan</span>
        </button>
      </div>

      {/* Fullscreen Button */}
      <div className="absolute top-4 right-4 z-10">
        <button className="p-2 bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg backdrop-blur-md transition-all shadow-xl">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
};