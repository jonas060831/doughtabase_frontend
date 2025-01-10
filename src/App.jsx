import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./Components/Pages/Map";
import "./App.css";
import NavBar from "./Components/Pages/NavBar";
import Home from "./Components/Pages/Home";
import Specialties from "./Components/Pages/Specialties";
import BakeryPage from "./Components/Pages/BakeryPage";

function App() {
 

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/specialties' element= {<Specialties />} />
        <Route path='/bakeries/:id' element= {<BakeryPage />} />
        <Route path='/map' element= {<Map />} />
      </Routes>
      </Router>
    </>
  );
}


export default App;
