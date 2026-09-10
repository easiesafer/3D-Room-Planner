import React from 'react';
import { Sliders, Palette, Trash2, Copy, Move, RotateCw, MapPin } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore';

const colors = ['#1e293b', '#64748b', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#a855f7'];

export const SidebarProperties: React.FC = () => {
  const { items, selectedItemId, updateSelectedItem, updateItemPosition, removeItem, addItem, theme } = useRoomStore();
  const isDark = theme === 'dark';

  const selectedItem = items.find((item) => item.id === selectedItemId);

  if (!selectedItem) {
    return (
      <aside className={`w-80 border-l flex flex-col h-full z-10 backdrop-blur-sm select-none p-6 justify-center items-center text-center transition-colors duration-200 ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-500'
      }`}>
        <Sliders className={`w-10 h-10 mb-3 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
        <h3 className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>ยังไม่ได้เลือกวัตถุ</h3>
        <p className={`text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          คลิกเลือกวัตถุในระบบ 3D หรือลากลูกศรเพื่อปรับแต่งค่า
        </p>
      </aside>
    );
  }

  const handleDuplicate = () => {
    addItem({
      name: `${selectedItem.name} (Copy)`,
      color: selectedItem.color,
      size: selectedItem.size,
      modelUrl: selectedItem.modelUrl,
    });
  };

  const inputClass = `w-full rounded-lg p-2 text-xs font-mono focus:outline-none focus:border-indigo-500 ${
    isDark
      ? 'bg-slate-950/50 border border-slate-800 text-slate-200'
      : 'bg-slate-100 border border-slate-200 text-slate-800'
  }`;

  return (
    <aside className={`w-80 border-l flex flex-col h-full z-10 backdrop-blur-sm select-none transition-colors duration-200 ${
      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white/80 border-slate-200 text-slate-800'
    }`}>
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h2 className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            Properties
          </h2>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 font-mono">
          {selectedItem.name}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* Position (X, Y, Z) */}
        <div className="space-y-3">
          <span className={`text-[11px] font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <MapPin className="w-3.5 h-3.5" /> Position (X, Y, Z)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>X-Axis</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.position[0]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  updateItemPosition(selectedItem.id, [val, selectedItem.position[1], selectedItem.position[2]]);
                }}
                className={inputClass}
              />
            </div>
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Y-Height</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.position[1]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  updateItemPosition(selectedItem.id, [selectedItem.position[0], val, selectedItem.position[2]]);
                }}
                className={inputClass}
              />
            </div>
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Z-Axis</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.position[2]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  updateItemPosition(selectedItem.id, [selectedItem.position[0], selectedItem.position[1], val]);
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-3">
          <span className={`text-[11px] font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Move className="w-3.5 h-3.5" /> Size (Meters)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Width</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.size[0]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0.1;
                  updateSelectedItem({ size: [val, selectedItem.size[1], selectedItem.size[2]] });
                }}
                className={inputClass}
              />
            </div>
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Height</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.size[1]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0.1;
                  updateSelectedItem({ size: [selectedItem.size[0], val, selectedItem.size[2]] });
                }}
                className={inputClass}
              />
            </div>
            <div>
              <p className={`text-[9px] mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Depth</p>
              <input
                type="number"
                step="0.1"
                value={selectedItem.size[2]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0.1;
                  updateSelectedItem({ size: [selectedItem.size[0], selectedItem.size[1], val] });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Rotation */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <RotateCw className="w-3.5 h-3.5" /> Rotation
            </span>
            <span className="text-xs font-mono text-indigo-500">{selectedItem.rotation}°</span>
          </div>
          <div className={`border rounded-lg p-2.5 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedItem.rotation}
              onChange={(e) => updateSelectedItem({ rotation: parseInt(e.target.value) })}
              className={`w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg appearance-none ${
                isDark ? 'bg-slate-800' : 'bg-slate-300'
              }`}
            />
          </div>
        </div>

        {/* Color */}
        <div className="space-y-3">
          <span className={`text-[11px] font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Palette className="w-3.5 h-3.5" /> Material Color
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => updateSelectedItem({ color })}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  selectedItem.color === color
                    ? 'border-indigo-500 scale-110 shadow-md'
                    : isDark ? 'border-slate-800 hover:scale-105' : 'border-slate-300 hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className={`p-4 border-t space-y-2 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <button
          onClick={handleDuplicate}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate Object</span>
        </button>
        <button
          onClick={() => removeItem(selectedItem.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-lg text-xs font-medium transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove Object</span>
        </button>
      </div>
    </aside>
  );
};