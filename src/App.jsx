import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
import MobilePrompt from "./Components/UI/MobilePrompt";
import { useMediaQuery } from "react-responsive";
import { GraphProvider } from "./contexts/GraphProvider";
import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";

const App = () => {
  return (
    <div className="canvas min-h-screen">
      <GraphProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Home />} />
        </Routes>
      </GraphProvider>
      <Toaster />
    </div>
  );
};

export default App;
