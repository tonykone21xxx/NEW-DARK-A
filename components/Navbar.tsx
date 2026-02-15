import React from 'react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div 
          className="text-2xl font-montserrat font-black tracking-tighter italic cursor-pointer relative group text-white"
          onClick={() => onNavigate('home')}
        >
          AUTO<span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300">PILOT</span> AI
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide uppercase text-gray-400">
          <a href={currentView === 'home' ? "#solutions" : "#"} onClick={() => currentView !== 'home' && onNavigate('home')} className="relative hover:text-white transition-colors group">Solutions<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></a>
          <a href={currentView === 'home' ? "#logiciels" : "#"} onClick={() => currentView !== 'home' && onNavigate('home')} className="relative hover:text-white transition-colors group">Logiciels<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></a>
          <a href={currentView === 'home' ? "#contact-section" : "#"} onClick={() => currentView !== 'home' && onNavigate('home')} className="relative hover:text-white transition-colors group">Contact<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('dropship')} className="hidden sm:block text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">Dropship Tool</button>
          <button className="hidden sm:block text-sm font-bold text-gray-400 hover:text-blue-400 transition-colors">Se connecter</button>
          <a 
            href="#contact-section"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
          >
            Demander une Démo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;