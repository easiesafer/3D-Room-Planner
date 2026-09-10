import { create } from 'zustand';

export interface FurnitureItem {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: number; // มุมหมุนองศา (0-360)
  color: string;
  size: [number, number, number]; // กว้าง, สูง, ลึก (เมตร)
  modelUrl?: string; // URL ของไฟล์ .glb / .gltf
}

interface RoomStore {
  items: FurnitureItem[];
  selectedItemId: string | null;
  viewMode: '3D' | '2D';
  theme: 'dark' | 'light';
  roomDimensions: { width: number; height: number; depth: number };
  addItem: (item: { name: string; color: string; size: [number, number, number]; modelUrl?: string }) => void;
  selectItem: (id: string | null) => void;
  updateSelectedItem: (changes: Partial<FurnitureItem>) => void;
  updateItemPosition: (id: string, position: [number, number, number]) => void;
  removeItem: (id: string) => void;
  setViewMode: (mode: '3D' | '2D') => void;
  toggleTheme: () => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  items: [],
  selectedItemId: null,
  viewMode: '3D',
  theme: 'dark', // เริ่มต้นด้วย Dark Mode
  roomDimensions: { width: 8, height: 3, depth: 8 },

  addItem: (item) =>
    set((state) => {
      const id = `item-${Date.now()}`;
      const newItem: FurnitureItem = {
        id,
        name: item.name,
        color: item.color,
        size: item.size,
        modelUrl: item.modelUrl,
        position: [0, item.size[1] / 2, 0],
        rotation: 0,
      };
      return {
        items: [...state.items, newItem],
        selectedItemId: id,
      };
    }),

  selectItem: (id) => set({ selectedItemId: id }),

  updateSelectedItem: (changes) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === state.selectedItemId ? { ...item, ...changes } : item
      ),
    })),

  updateItemPosition: (id, position) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, position } : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    })),

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { theme: nextTheme };
    }),
}));