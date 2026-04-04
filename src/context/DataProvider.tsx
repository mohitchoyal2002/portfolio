import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/profile`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error("Failed to fetch dynamic profile data", err));
  }, []);

  // Skeleton loader while fetching
  if (!data) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-sky-50 to-indigo-100 font-nunito z-50">
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full shadow-lg shadow-sky-500/50 flex items-center justify-center">
            <span className="text-white font-extrabold text-2xl tracking-tighter">MC</span>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 mb-3 animate-fade-in text-center px-4 leading-tight">
          Welcome to my Workspace
        </h2>
        <p className="text-sky-700/70 font-bold animate-pulse text-base sm:text-lg tracking-widest uppercase text-center px-4">
          Crafting the digital experience...
        </p>
      </div>
    );
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export const useProfile = () => useContext(DataContext);
