import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByVal } from "./counterSlice";
const Counter = () => {
  const count = useSelector((state) => state.shusanket.count);
  const dispatch = useDispatch();
  const [val, setVal] = React.useState("");
  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button
        onClick={() => {
          setVal("");
          dispatch(reset());
        }}
      >
        RESET
      </button>
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      ></input>
      <button onClick={() => dispatch(incrementByVal(Number(val)))}>
        INCREMENT BY YOUR AMOUNT
      </button>
    </>
  );
};

export default Counter;
