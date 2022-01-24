// Dependencies
import React, { useState } from 'react';

// Screens
import MainScreen from 'screens/Main';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');
  const [isSimplified, setIsSimplified] = useState(true);

  return (
    <MainScreen
      isSimplified={isSimplified}
      selectedProvince={selectedProvince}
      setIsSimplified={setIsSimplified}
      setSelectedProvince={setSelectedProvince}
    />
  );
};

export default Home;
