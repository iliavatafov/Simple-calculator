import { useState } from "react";

import { Buttons } from "../Buttons/Buttons";
import { Display } from "../Display/Display";

import "./Calculator.css";

export const Calculator = ({ showHistory, handleHistory }) => {
  const [changeDisplayColor, setChangeDisplayColor] = useState(null);

  const handleDisplayColor = (value) => {
    setChangeDisplayColor(value);
  };

  return (
    <div className="calculator-conrainer">
      <Display
        changeDisplayColor={changeDisplayColor}
        showHistory={showHistory}
        handleHistory={handleHistory}
      />
      <Buttons handleDisplayColor={handleDisplayColor} />
    </div>
  );
};
