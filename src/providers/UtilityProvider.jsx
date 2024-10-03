import React from 'react';
import { createContext } from 'react';

export const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {

  const utilityInfo = {}

  return (
    <UtilityContext.Provider value={utilityInfo}>
      {children}
    </UtilityContext.Provider>
  )
}

export default UtilityProvider