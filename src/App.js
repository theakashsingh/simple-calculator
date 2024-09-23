// import { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [inputValue, setInputValue] = useState([]);

//   const handleInputValue = e => {
//     const value = e.target.value;

//     if (value === "=") {
//       handleOperation(inputValue);
//     } else {
//       // console.log(value);
//       setInputValue([...inputValue, value]);
//     }
//   };

//   let input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   let operators = ["+", "-", "*", "/", "="];

//   const handleOperation = arr => {
    
//   };
//   return (
//     <div className="main">
//       <div className="value">{inputValue.map(value => value)}</div>
//       <div className="input_value">
//         <div className="input">
//           {input.map((value, i) => (
//             <button value={value} onClick={e => handleInputValue(e)} key={i}>
//               {value}
//             </button>
//           ))}
//         </div>
//         <div className="operators">
//           {operators.map((operator, i) => (
//             <button value={operator} onClick={e => handleInputValue(e)} key={i}>
//               {operator}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState } from "react";
import "./App.css";

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

      // Set the result as the new input value
      setInputValue([result.toString()]);
    } catch (err) {
      // Handle invalid operation or errors
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
