import React from "react";
import { Link } from "react-router-dom";
// import NavBar from "./Components/UI/navbar/NavBar";

const Home = () => {
  return (
    <>
    {/* <NavBar/> */}
    <div className="home-div">

      <header className="home-header">
        <h1>DoughtaBase</h1>
        <p>An address book for bakers and their baking neighbors.</p>
      </header>

        {/* <div className="navbar">
          <Link to="/specialties" className="nav-link">Specialties</Link>
          <Link to="/map" className="nav-link">Bakeries Near You</Link>
        </div> */}

      <div className="home-about">
        <h2>About DoughtaBase</h2>
        <p>
        Customize your bakery's info.
        Find info about your neighboring bakeries.
        Update your bakery's specialty.
        </p>
      </div>

    </div>
    </>    
  );
};

export default Home;
