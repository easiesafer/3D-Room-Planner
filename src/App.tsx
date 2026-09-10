
import { Navbar } from './components/ui/Navbar';
import { SidebarCatalog } from './components/ui/SidebarCatalog';
import { ViewportCanvas } from './components/ui/ViewportCanvas';
import { SidebarProperties } from './components/ui/SidebarProperties';

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 font-sans overflow-hidden text-slate-100 antialiased">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <SidebarCatalog />
        <ViewportCanvas />
        <SidebarProperties />
      </div>
    </div>
  );
}