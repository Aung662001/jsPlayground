import { useReducer } from "react";
import "./App.css";
import Digit from "./Digit";
import OperationDigit from "./OperationDigit";
export const ACTIONS = {
  ADD_DIGITS: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear-all",
  DELETE: "delete-digit ",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.overwrite)
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      if (payload.digit == "0" && state.currentOperand == "0") return state;
      if (
        payload.digit == "." && state.currentOperand
          ? state.currentOperand.includes(".")
          : ""
      )
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      console.log(state);
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.previousOperand == null && state.currentOperand == null)
        return state;
      if (state.previousOperand == null)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      if (state.currentOperand == null)
        return {
          ...state,
          operation: payload.operation,
        };
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        overwrite: true,
      };
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) return {};
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}
const INT_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
const formatter = (value) => {
  if (value == null) return;
  const [integer, decimal] = value.split(".");
  if (decimal == null) return INT_FORMATTER.format(integer);
  return `${INT_FORMATTER.format(integer)}.${decimal}`;
};
function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "÷":
      result = prev / current;
      break;
    case "*":
      result = prev * current;
      break;
  }
  return String(result);
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="caculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatter(previousOperand)}
          {operation}
        </div>
        <div className="current-operand">{formatter(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR, payload: {} })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>Delete</button>
      <OperationDigit dispatch={dispatch} operation={"÷"} />

      <Digit dispatch={dispatch} digit="1" />
      <Digit dispatch={dispatch} digit="2" />
      <Digit dispatch={dispatch} digit="3" />
      <OperationDigit dispatch={dispatch} operation={"*"} />
      <Digit dispatch={dispatch} digit="4" />
      <Digit dispatch={dispatch} digit="5" />
      <Digit dispatch={dispatch} digit="6" />
      <OperationDigit dispatch={dispatch} operation={"+"} />
      <Digit dispatch={dispatch} digit="7" />
      <Digit dispatch={dispatch} digit="8" />
      <Digit dispatch={dispatch} digit="9" />
      <OperationDigit dispatch={dispatch} operation={"-"} />
      <Digit dispatch={dispatch} digit="." />
      <Digit dispatch={dispatch} digit="0" />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
