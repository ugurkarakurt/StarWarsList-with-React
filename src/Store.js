import React, { useState } from "react";

export const currentWorldContext = React.createContext("");
export const charactersContext = React.createContext("");


export default function Store({ children }) {
    const [currentWorld,setCurrentWorld] = useState("")
    const [characters,setCharacters] = useState([])
  return (
    <currentWorldContext.Provider value={[currentWorld,setCurrentWorld]}>
      <charactersContext.Provider value={[characters,setCharacters]}>
        {children}
      </charactersContext.Provider>
    </currentWorldContext.Provider>
  );
}
