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

        <img className="logo" src="/logo-3.png" alt="Logo"/>

      <header className="home-header text-center py-5">
        <h1 className="display-4 fw-bold">DoughtaBase</h1>
        <p className="subtitle">An address book for bakers and their baking neighbors.</p>
      </header>
        <button className="about-button" onClick={() => {
            navigate("/about")
        }}>About</button>
        <PhotoGallery/>        
    </div>


    
    </>    
  );
};

export default Home;