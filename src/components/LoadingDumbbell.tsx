import React from 'react';

const LoadingDumbbell: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full p-6">
      <div className="flex items-center justify-center animate-spin">
        {/* Mancuerna */}
        <div className="flex items-center space scale-75">
          {/* Disco izquierdo */}
          <div className="w-2 h-10 border-2 border-violet-1 rounded-lg shadow-lg bg-transparent"></div>
          <div className="w-6 h-14 border-2 border-violet-1 rounded-lg shadow-lg bg-transparent"></div>
          {/* Barra */}
          <div className="w-7 h-4 border-2 border-violet-2 rounded shadow-md bg-transparent"></div>
          {/* Disco derecho */}
          <div className="w-6 h-14 border-2 border-violet-1 rounded-lg shadow-lg bg-transparent"></div>
          <div className="w-2 h-10 border-2 border-violet-1 rounded-lg shadow-lg bg-transparent"></div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex items-center justify-center">
        {/* Mancuerna */}
        <div className="flex items-center space-x-0.5">
          {/* Disco izquierdo */}
          <div className="w-2 h-10 bg-violet-1 rounded-lg shadow-lg"></div>
          <div className="w-2 h-14 bg-violet-1 rounded-lg shadow-lg"></div>
          {/* Barra */}
          <div className="w-14 h-3 bg-violet-2 rounded shadow-md"></div>
          {/* Disco derecho */}
          <div className="w-2 h-14 bg-violet-1 rounded-lg shadow-lg"></div>
          <div className="w-2 h-10 bg-violet-1 rounded-lg shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDumbbell;
