import React, { createContext } from 'react'

export const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {

  const utilityInfo = {
    test: "utility",
    
  }

  return (
    <UtilityContext.Provider value={utilityInfo}>
      {children}
    </UtilityContext.Provider>
  )
}

export default UtilityProvider