/* eslint-disable react/prop-types */
import { ACTIONS } from "./App";

export default function Digit({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
