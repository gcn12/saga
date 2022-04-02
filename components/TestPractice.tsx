import { useState } from "react";

export default function TestPractice() {
  const [number, setNumber] = useState(0);
  const increment = () => {
    setNumber((prevValue: number) => prevValue + 1);
  };

  return (
    <div>
      <p>Current number: {number}</p>
      <button onClick={increment}>Click</button>
    </div>
  );
}
