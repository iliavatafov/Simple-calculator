import { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [input, setInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");

  const [result, setResult] = useState("");
  const [previousResults, setPreviousResult] = useState([]);

  const [isOperationWithZero, setIsOperationWithZero] = useState(false);

  const handleInput = (value) => {
    setInput(value);
  };

  const handlePreviousInput = (value) => {
    setPreviousInput(value);
  };

  const handleResult = (value) => {
    setResult(value);
  };

  const handlePreviousResult = (value) => {
    setPreviousResult(value);
  };

  const handleClick = (value) => {
    const lastChar = input.charAt(input.length - 2).trim();
    const isLastCharOperator = /^[-+*/]$/.test(lastChar);

    if (previousInput !== "" && result !== "") {
      handleInput(result);
      handlePreviousResult((current) => [
        `${previousInput} = ${result}`,
        ...current,
      ]);
      handleResult("");
      handlePreviousInput("");
    }

    const isOperator = (v) => {
      return /^[-+*/]$/.test(v);
    };

    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (input.length === 2 && input[0] === "-") {
        handleInput((current) => current + " " + value + " ");
      }
      if (isOperationWithZero) {
        handleInput((current) => current + " " + value + " ");
        setIsOperationWithZero(false);
      } else if (input === "0" && value === "-") {
        handleInput(value);
      } else if (isOperator(input[0] && input.length === 1)) {
        return;
      } else if (!isLastCharOperator) {
        handleInput((current) => current + " " + value + " ");
      } else if (isLastCharOperator && isOperator(value)) {
        handleInput(
          (current) => current.slice(0, -2).trim() + " " + value + " "
        );
      }
    } else if (input === "0" && value === "0") {
      handleInput("0");
      setIsOperationWithZero(true);
    } else if (input === "0" && !isNaN(Number(value))) {
      handleInput(value);
    } else if (result === input) {
      handleInput(value);
    } else {
      handleInput(input + value);
    }
  };

  const handleClear = () => {
    if (result !== "") {
      handlePreviousResult((current) => [
        `${previousInput} = ${result}`,
        ...current,
      ]);
    }
    handleResult("");
    handleInput("0");
    handlePreviousInput("");
  };

  return (
    <InputContext.Provider
      value={{
        input,
        previousInput,
        result,
        previousResults,
        handleInput,
        handlePreviousInput,
        handleResult,
        handlePreviousResult,
        handleClick,
        handleClear,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
