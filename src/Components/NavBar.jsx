import { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Owners from "./Owners";
import GoogleMapAPI from "./Google_Map_API";

const NavBar = () => {
  const [navMenu, setNavMenu] = useState("");
  const handleClick = (navMenu) => {
    setNavMenu(navMenu);
  };
  const renderComponent = () => {
    if (navMenu === "Home") {
      return <Home />;
    }
    if (navMenu === "Owners") {
      return <Owners />;
    }
    if (navMenu === "GoogleMapAPI") {
      return <GoogleMapAPI />;
    }
    return null;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            <img
              src="src/assets/DALL·E 2025-01-10 10.47.27 - A creative and modern icon for a bakery DoughtaBase, combining a database stack symbol with bakery elements. The icon features a database cylinder wit.webp"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            DoughtaBase 2025
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => handleClick("Home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" 
                onClick={() => handleClick("Owners")}>
                  Owners
                </button>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Specialties
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bakeries
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Category
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Log in
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="renderComponent">{renderComponent()}</div>
    </>
  );
};
export default NavBar;
