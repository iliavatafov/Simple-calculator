import { useState } from "react";

import { InputProvider } from "./context/InputContext";
import { Calculator } from "./components/Calculator/Calculator";

import "./App.css";

function App() {
  const [showHistory, setShowHistory] = useState(false);

  const handleHistory = () => {
    setShowHistory((current) => !current);
  };

  const closeHistory = () => {
    setShowHistory(false);
  };

  return (
    <div onClick={showHistory ? closeHistory : null} className="App">
      <InputProvider>
        <Calculator
          showHistory={showHistory}
          handleHistory={handleHistory}
          closeHistory={closeHistory}
        />
      </InputProvider>
    </div>
  );
}

export default App;
