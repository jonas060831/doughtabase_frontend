import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";

const NavBar = () => {
  const [navMenu, setNavMenu] = useState("");
  const handleClick = (navMenu) => {
    setNavMenu(navMenu);
  };
  const renderComponent = () => {
    if (navMenu === "Home") {
      return <Home />;
    }
    if (navMenu === "Map") {
      return <Map />;
    }
    return null;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://files.oaiusercontent.com/file-VG1r6ykNyf4aBWvBb1QrLV?se=2025-01-09T22%3A54%3A09Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5683c123-2a4d-4f43-9fbc-14e0632a72ad.webp&sig=ZOEuIxLSm/jHaUYNCjD7MHcw2Qxne8C%2BLBdtbFcYCZM%3D"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Navbar
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
                <a className="nav-link" href="#">
                  Link
                </a>
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
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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
