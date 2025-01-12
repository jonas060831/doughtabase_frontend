import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import NavBar from "./Components/UI/navbar/NavBar";
import './Home.css'
import PhotoGallery from "../UI/modules/PhotoGallery";

const Home = () => {
  

  const navigate = useNavigate()
    return (
    <>
    {/* <NavBar/> */}
    <div className="home-div">

      <header className="home-header text-center py-5">
        <h1 className="display-4 fw-bold">DoughtaBase</h1>
        <p >An address book for bakers and their baking neighbors.</p>
      </header>

        <PhotoGallery/>

        <button className="about-button" onClick={() => {
            navigate("/about")
        }}>About</button>
        
    </div>
    </>    
  );
};

export default Home;