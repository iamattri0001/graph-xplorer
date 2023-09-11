import React from 'react'
import Home from './Components/Home'
import toast, { Toaster } from 'react-hot-toast';
import toastSettings from './utils/toastSettings';
import MobilePrompt from './Components/UI/MobilePrompt';
import { useMediaQuery } from 'react-responsive';
import { GraphProvider } from './contexts/GraphProvider';

const App = () => {
  const showMessage = (message, type, duration = 3000) => {
    if (type === 'info') {
      toast(message, toastSettings);
    } else if (type === 'error') {
      toast.error(message, toastSettings);
    } else if (type === 'success') {
      toast.success(message, toastSettings);
    } else if (type === 'loading') {
      const toastId = toast.loading(message, { ...toastSettings, duration });
      return toastId;
    } else {
      toast(message, toastSettings);
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 620px)' });

  return (
    <>
      {isMobile ? <MobilePrompt /> : <>
        <GraphProvider>
          <Home showMessage={showMessage} />
        </GraphProvider>
        <Toaster />
      </>}
    </>
  )
}

export default App