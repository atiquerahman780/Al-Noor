import React from "react";
import "./Incre-decrement.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

function Incredecrement({ id }) {
  const [count, setCount] = useLocalStorage("count" + id, 1);

  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        className="plus"
      >
        +
      </button>
      <span className="vl"></span>
      <span>{<>{count}</>}</span>
      <span className="vl"></span>
      <button
        onClick={() => {
          if (count > 1) {
            setCount(count - 1);
          }
        }}
        className="minus"
      >
        -
      </button>
    </>
  );
}
export default Incredecrement;
