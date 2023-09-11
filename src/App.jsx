import React from 'react'
import Home from './Components/Home'
import { Toaster } from 'react-hot-toast';
import MobilePrompt from './Components/UI/MobilePrompt';
import { useMediaQuery } from 'react-responsive';
import { GraphProvider } from './contexts/GraphProvider';

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' });

  return (
    <>
      {isMobile ? <MobilePrompt /> : <>
        <GraphProvider>
          <Home />
        </GraphProvider>
        <Toaster />
      </>}
    </>
  )
}

export default App