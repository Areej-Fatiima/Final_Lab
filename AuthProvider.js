// // AuthProvider.js
// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from './config'; // Ensure correct path to your Firebase config
// import { onAuthStateChanged } from 'firebase/auth';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     try {
//       await auth.signOut();
//       setUser(null);
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// AuthProvider.js
// AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from './config'; // Ensure correct path to your Firebase config
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state to the authenticated user or null
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
