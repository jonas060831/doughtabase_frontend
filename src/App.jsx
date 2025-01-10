import { useState } from "react";

import "./App.css";
import NavBar from "./Components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      <h1>DoughtaBase</h1>
     
      <div className="startButtons">
      <button type="button" className="btn btn-dark">
        Get Started!
      </button>
      <button type="button" className="btn btn-secondary">
        Learn More
      </button></div>
    </>
  );
}

export default App;
