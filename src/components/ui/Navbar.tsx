import React from 'react';
import { Box, Sun, Moon, Sparkles } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useRoomStore();
  const isDark = theme === 'dark';

  return (
    <header className={`h-14 px-4 border-b flex items-center justify-between transition-colors duration-200 z-20 ${
      isDark
        ? 'bg-slate-900/90 border-slate-800 text-slate-100'
        : 'bg-white/90 border-slate-200 text-slate-800 shadow-sm'
    } backdrop-blur-md select-none`}>
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <Box className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
            RoomCraft <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-semibold border border-indigo-500/20">3D</span>
          </h1>
        </div>
      </div>

      {/* Center Badge */}
      <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
        <span className={`px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
          isDark
            ? 'bg-slate-800/60 border-slate-700/60 text-slate-300'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Interactive Studio
        </span>
      </div>

      {/* Theme Switcher Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition-all flex items-center gap-2 text-xs font-medium ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:text-amber-300'
              : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200 hover:text-indigo-700'
          }`}
          title={isDark ? 'สลับเป็นโหมดสว่าง (Light Mode)' : 'สลับเป็นโหมดมืด (Dark Mode)'}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="hidden md:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="hidden md:inline">Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};