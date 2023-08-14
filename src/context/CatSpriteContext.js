import React, { createContext, useContext, useState } from "react";

// Create the context
const CatSpriteContext = createContext();

// Create a provider component
export function CatSpriteContextProvider({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [operations, setOperations] = useState({});

  return (
    <CatSpriteContext.Provider
      value={{
        position,
        setPosition,
        rotation,
        setRotation,
        operations,
        setOperations,
      }}
    >
      {children}
    </CatSpriteContext.Provider>
  );
}

// Create a custom hook for using the context
export function useCatSpriteContext() {
  return useContext(CatSpriteContext);
}
