import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { InputContext } from "../../context/InputContext";

import "./Display.css";

export const Display = ({ changeDisplayColor, showHistory, handleHistory }) => {
  const {
    input,
    previousInput,
    handleInput,
    result,
    handleResult,
    previousResults,
    handlePreviousInput,
  } = useContext(InputContext);

  const displyOldResultAsInput = (e) => {
    const inputText = e.target.parentNode.children[0].textContent;
    const resultText = e.target.parentNode.children[2].textContent;
    handleInput(inputText);
    handlePreviousInput(inputText);
    handleResult(resultText);
  };

  return (
    <div className="dislay-container">
      <FontAwesomeIcon
        onClick={handleHistory}
        className="clock"
        icon={faClock}
      />
      {showHistory && previousResults.length > 0 && (
        <div className="history">
          <div className="icon">
            <FontAwesomeIcon
              onClick={handleHistory}
              className="clock"
              icon={faClock}
            />
          </div>
          {previousResults.map((result, i) => (
            <p onClick={displyOldResultAsInput} className="results" key={i}>
              <span className="result-border">{result.split(" = ")[0]}</span>
              <span> = </span>
              <span className="result-border">{result.split(" = ")[1]}</span>
            </p>
          ))}
        </div>
      )}
      <input
        type="text"
        className={`calculator-input ${changeDisplayColor && "border-shadow"}`}
        value={""}
        onChange={(e) => handleInput(e.target.value)}
        readOnly
      />
      {previousInput && <div className="previous-input">{previousInput} =</div>}
      <div className="result">{result ? result : input}</div>
    </div>
  );
};
