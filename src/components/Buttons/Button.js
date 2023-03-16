import React, { useContext, useState } from "react";

import { InputContext } from "../../context/InputContext";
import { calculate } from "../../utils/calculate";

import "./Button.css";

export const Button = ({ buttonData, handleDisplayColor, pressedKey }) => {
  const [isClicked, setIsClicked] = useState(false);

  const {
    input,
    handleInput,
    handleResult,
    handlePreviousInput,
    handleClick,
    handleClear,
  } = useContext(InputContext);

  const isEqualButton = buttonData.title === "=";
  const isClearButton = buttonData.title === "C";

  const handleOperationWithColorChange = (handlerName) => {
    setIsClicked(true);
    switch (handlerName) {
      case "handleClick":
      case "buttonPress":
        handleClick(buttonData.title);
        break;
      case "calculate":
        calculate(input, handleInput, handleResult, handlePreviousInput);
        break;
      case "clear":
        handleClear(true);
        break;
    }
    handleDisplayColor(true);
    setTimeout(() => {
      setIsClicked(false);
      handleDisplayColor(false);
    }, 100);
  };

  return (
    <button
      className={`button ${buttonData.gray && "dark-gray"} ${
        isClicked && "border-shadow"
      } ${pressedKey === buttonData.title && "border-shadow"} ${
        isEqualButton && "blue"
      }`}
      onClick={
        isClearButton
          ? () => handleOperationWithColorChange("clear")
          : isEqualButton
          ? () => handleOperationWithColorChange("calculate")
          : isClicked
          ? () => handleOperationWithColorChange("handleClick")
          : () => handleOperationWithColorChange("buttonPress")
      }
    >
      {buttonData.title}
    </button>
  );
};
