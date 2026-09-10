import React, { useState } from 'react';
import { Search, Bed, Sofa, Lamp, Layers, Plus, Box } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore';

const categories = [
  { id: 'all', label: 'ทั้งหมด', icon: Layers },
  { id: 'living', label: 'ห้องนั่งเล่น', icon: Sofa },
  { id: 'bedroom', label: 'ห้องนอน', icon: Bed },
  { id: 'lighting', label: 'โคมไฟ', icon: Lamp },
];

const mockItems = [
  {
    id: 1,
    name: 'Sofa Minimalist',
    category: 'living',
    dimensions: '2.0 x 0.8 x 0.8m',
    size: [2.0, 0.8, 0.8] as [number, number, number],
    defaultColor: '#4f46e5',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
  },
  {
    id: 2,
    name: 'King Bed Frame',
    category: 'bedroom',
    dimensions: '1.8 x 0.6 x 2.0m',
    size: [1.8, 0.6, 2.0] as [number, number, number],
    defaultColor: '#0284c7',
    modelUrl: '',
  },
  {
    id: 3,
    name: 'Nordic Lamp',
    category: 'lighting',
    dimensions: '0.4 x 1.6 x 0.4m',
    size: [0.4, 1.6, 0.4] as [number, number, number],
    defaultColor: '#f59e0b',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
  },
  {
    id: 4,
    name: 'Coffee Table',
    category: 'living',
    dimensions: '1.1 x 0.4 x 0.6m',
    size: [1.1, 0.4, 0.6] as [number, number, number],
    defaultColor: '#10b981',
    modelUrl: '',
  },
];

export const SidebarCatalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { addItem, theme } = useRoomStore();
  const isDark = theme === 'dark';

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (item: typeof mockItems[0]) => {
    addItem({
      name: item.name,
      color: item.defaultColor,
      size: item.size,
      modelUrl: item.modelUrl,
    });
  };

  return (
    <aside className={`w-80 border-r flex flex-col h-full z-10 backdrop-blur-sm select-none transition-colors duration-200 ${
      isDark
        ? 'bg-slate-900/80 border-slate-800 text-slate-200'
        : 'bg-white/80 border-slate-200 text-slate-800'
    }`}>
      <div className={`p-4 border-b space-y-3 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <h2 className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Furniture Catalog
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาเฟอร์นิเจอร์..."
            className={`w-full rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 transition-all ${
              isDark
                ? 'bg-slate-950/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500/80 focus:ring-indigo-500/50'
                : 'bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/30'
            }`}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-500 font-medium'
                    : isDark
                    ? 'bg-slate-800/40 border border-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 custom-scrollbar">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleAddItem(item)}
            className={`group relative border rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
              isDark
                ? 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800 hover:border-indigo-500/40'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-indigo-500/50 shadow-sm'
            }`}
          >
            <div className={`w-full h-24 rounded-lg mb-2 border flex items-center justify-center group-hover:scale-[1.02] transition-transform ${
              isDark ? 'bg-slate-900 border-slate-800/60' : 'bg-white border-slate-200'
            }`}>
              <Box className={`w-8 h-8 transition-colors ${
                isDark ? 'text-slate-600 group-hover:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-600'
              }`} />
            </div>
            <div>
              <p className={`text-xs font-medium truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.name}</p>
              <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.dimensions}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem(item);
              }}
              className={`absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-indigo-600 hover:text-white transition-all ${
                isDark ? 'bg-slate-800/80 text-slate-400' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};