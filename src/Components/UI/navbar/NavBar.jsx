import { useState } from "react";

import Home from "../../Pages/Home";
import Owners from "../../Owners";
import Map from "../../Pages/Map";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  //state of input and we also need to debound the search as soon as possible
  const [query, setQuery] = useState('')

  // const [navMenu, setNavMenu] = useState("");
  // const handleClick = (navMenu) => {
  //   setNavMenu(navMenu);
  // };
  // const renderComponent = () => {
  //   if (navMenu === "Home") {
  //     return <Home />;
  //   }
  //   if (navMenu === "Owners") {
  //     return <Owners />;
  //   }
  //   if (navMenu === "Map") {
  //     return <Map />;
  //   }
  //   return null;
  // };
  const navigate = useNavigate();


  const handleQuery = (event) => {

    //prevent reload of screen
    event.preventDefault()

    


    navigate(`/map?query=${query}`)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <NavLink to='/'>
            <img
              src="src/assets/DALL·E 2025-01-10 10.47.27 - A creative and modern icon for a bakery DoughtaBase, combining a database stack symbol with bakery elements. The icon features a database cylinder wit.webp"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            DoughtaBase 2025
          </NavLink>

          {/* toggle button */}
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
                    <NavLink to="specialties" >Specialties</NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Log in
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleQuery}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/* <div className="renderComponent">{renderComponent()}</div> */}
    </>
  );
};
export default NavBar;
