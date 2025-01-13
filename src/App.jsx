import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Map from "./Components/Pages/Map";
import Home from "./Components/Pages/Home";
import Specialties from "./Components/Pages/Specialties";
import BakeryPage from "./Components/Pages/BakeryPage";
import NavBar from "./Components/UI/navbar/NavBar";
import About from "./Components/Pages/About";
import Footer from "./Components/UI/Footer/Footer"

const  App = () => {
 

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/specialties' element= {<Specialties />} />
        <Route path='/bakeries/:id' element= {<BakeryPage />} />
        <Route path='/map' element= {<Map />} />
        <Route path='/about' element= {<About />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}


export default App;
