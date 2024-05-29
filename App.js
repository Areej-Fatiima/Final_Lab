import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Navigation from './Navigation';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Assuming userData is an object containing user information

  useEffect(() => {
    // Simulate fetching user data from an API or authentication system
    setTimeout(() => {
      // Example user data
      const user = {
        userId: 'j19zehOPqBbCEKlx1DJLy0ymlho1',
        username: 'AREEJ',
        email: 'areej@gmail.com',
        // Other user properties...
      };
      setUserData(user);
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <Navigation userData={userData} />;
};

export default App;
