import React from 'react';

interface WelcomeScreenProps {
  onEnter: (asGuest?: boolean) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, onLoginClick, onSignupClick }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
      {/* Animated Multi-color Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-700 to-teal-600 animate-gradient-x"></div>

      {/* Floating "Pieces" / Shapes for the requested effect */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Diagonal "Cut" Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40 pointer-events-none"></div>

      {/* Content Card with Glassmorphism */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-2xl w-[90%] transform transition-all duration-700 hover:scale-105">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
          TTC Bicumbi
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8 font-light">
          Empowering Futures through Quality Education & Community.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={onLoginClick}
            className="px-8 py-3 bg-highlight text-primary font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition-colors transform hover:-translate-y-1"
          >
            Login
          </button>
          <button 
            onClick={onSignupClick}
            className="px-8 py-3 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors transform hover:-translate-y-1"
          >
            Sign Up
          </button>
          <button 
            onClick={() => onEnter(true)}
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;