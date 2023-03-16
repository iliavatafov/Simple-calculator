import React, { useContext, useEffect, useState } from "react";

import { InputContext } from "../../context/InputContext";
import { calculate } from "../../utils/calculate";

import { Button } from "./Button";
import { MyButtons } from "./MyButtons";

import "./Buttons.css";

export const Buttons = ({ handleDisplayColor }) => {
  const [pressedKey, setPressedKey] = useState(null);
  const {
    input,
    handleInput,
    handlePreviousInput,
    result,
    hadnleResult,
    handleClick,
    handleClear,
  } = useContext(InputContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[-+*/\d]$/.test(event.key)) {
        handleClick(event.key);
        setPressedKey(event.key);
        handleDisplayColor(true);
      } else if (["=", "Enter"].includes(event.key)) {
        setPressedKey(event.key);
        handleDisplayColor(true);
        calculate(
          input,
          handleInput,
          result,
          hadnleResult,
          handlePreviousInput
        );
      } else if (event.key === "Backspace") {
        setPressedKey("C");
        handleClear();
        handleDisplayColor(true);
      }
    };

    const handleKeyUp = () => {
      handleDisplayColor(false);
      setPressedKey(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="buttons-container">
      {MyButtons.map((buttonData) => (
        <Button
          key={buttonData.title}
          buttonData={buttonData}
          handleDisplayColor={handleDisplayColor}
          pressedKey={pressedKey}
        />
      ))}
    </div>
  );
};

export default Button;
