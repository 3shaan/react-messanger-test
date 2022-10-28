import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../FireBase/FireBase.config';
export const authContext = createContext();


const Context = ({children}) => {
   
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
        setLoading(false);
        }
    })
    
    return () => unsubscribe();
    },[])
    

    const contextInfo = { user, isLoading, setLoading };
    return (
      <authContext.Provider value={contextInfo}>
        {children}
      </authContext.Provider>
    );
};

export default Context;