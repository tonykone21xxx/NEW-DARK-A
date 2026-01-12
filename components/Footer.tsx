import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-16 px-6 border-t border-gray-800 mt-20 animate-section-fade-in bg-gray-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div 
            className="text-2xl font-montserrat font-black tracking-tighter italic mb-6 cursor-pointer relative group text-white"
            onClick={() => onNavigate('home')}
          >
            AUTO<span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300">PILOT</span> AI
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </div>
          <p className="text-gray-500 max-w-sm mb-8">
            L'IA qui conduit la croissance de votre auto-école. Des solutions intelligentes conçues pour les professionnels du permis de conduire.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors hover:scale-110 shadow-md hover:shadow-lg"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors hover:scale-110 shadow-md hover:shadow-lg"><i className="fab fa-twitter"></i></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors hover:scale-110 shadow-md hover:shadow-lg"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Produit</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors relative group">Agents Virtuels<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors relative group">Gestion Planning<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors relative group">Accompagnement CPF<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Société</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors relative group">À propos<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></button></li>
            <li><button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors relative group">Contact<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span></button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
        <p>© 2024 AutoPilot AI. Tous droits réservés.</p>
        <div className="flex gap-8">
          <button onClick={() => onNavigate('mentions')} className="hover:text-gray-400 transition-colors relative group">Mentions Légales<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300"></span></button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-gray-400 transition-colors relative group">RGPD<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300"></span></button>
          <button onClick={() => onNavigate('terms')} className="hover:text-gray-400 transition-colors relative group">CGV<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300"></span></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;