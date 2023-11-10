import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export function CustomProvider({ children }) {
 const [state, setState] = useState(() => {
  const savedState = sessionStorage.getItem('Session');
  return savedState ? JSON.parse(savedState) : null;
 });

 useEffect(() => {
  sessionStorage.setItem('Session', JSON.stringify(state));
  console.log('STATE CHANGED: ', state)
 }, [state]);
 return (
   <Context.Provider value={{ state, setState}}>
     {children}
   </Context.Provider>
 );
}