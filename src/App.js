import { useState } from "react";
import "./App.css";
import { FaBackspace } from "react-icons/fa";

const App = () => {
  const [inputValue, setInputValue] = useState([]);
  const [error, setError] = useState(null);

  const handleInputValue = (e) => {
    const value = e.target.value;

    if (value === "=") {
      handleOperation(inputValue);
    } else {
      setError(null); 
      setInputValue([...inputValue, value]);
    }
  };

  const handleClear = () => {
    setInputValue([]); 
    setError(null); 
  };

  const handleBack = () => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1)); 
      setError(null); 
    }
  };

  const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operators = ["+", "-", "*", "/"];

  const handleOperation = (arr) => {
    try {
      // Check if the array ends with an operator
      if (operators.includes(arr[arr.length - 1])) {
        setError("Expression cannot end with an operator");
        return;
      }

      // Join the array into a string expression (e.g., "12+34-5")
      const expression = arr.join("");

      // Safely evaluate the expression using Function constructor
      const result = new Function("return " + expression)();

      setInputValue([result.toString()]);
    } catch (err) {
      setError("Invalid operation");
    }
  };

  return (
    <div className="main">
      <div className="calculator">
        <div className="display">
          {error ? <div className="error">{error}</div> : inputValue.join("") || "0"}
        </div>
        <div className="buttons">
          <div className="input">
            {input.map((value, i) => (
              <button
                value={value}
                onClick={(e) => handleInputValue(e)}
                key={i}
                className="btn"
              >
                {value}
              </button>
            ))}
          </div>
          <div className="operators">
            {operators.map((operator, i) => (
              <button
                value={operator}
                onClick={(e) => handleInputValue(e)}
                key={i}
                className="btn operator"
              >
                {operator}
              </button>
            ))}
            <button value="=" onClick={(e) => handleInputValue(e)} className="btn equal">
              =
            </button>
            <button onClick={handleBack} className="btn back">
            <FaBackspace />
            </button>
          </div>
        </div>
        <button onClick={handleClear} className="btn clear">
          Clear
        </button>
      </div>
    </div>
  );
};

export default App;

