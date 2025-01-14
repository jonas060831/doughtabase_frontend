import { useState } from "react";
import './Navbar.css' 
import { NavLink, useNavigate } from "react-router-dom";
import { queryBakeries } from "../../../services/bakeryServices";
import AuthButton from "../auth-button/AuthButton";

const NavBar = () => {
  //state of input and we also need to debound the search as soon as possible
  const [query, setQuery] = useState('')
  const navigate = useNavigate();


  const handleQuery = async (event) => {

    //prevent reload of screen
    event.preventDefault()

    try {
      //1. we did do a server request
      const match = await queryBakeries(query)

      //3. now we are entertaining the forks
      if(!query.trim()) { //query is empty
        alert('please search using name or city')
        setQuery('')
      } else if (match.length === 0) {
        alert('sorry no result found from our database')
        setQuery('')
      } else {
        //we dont want to navigate when query is empty
        navigate(`/map?query=${query}`)
      }

    } catch (error) {
     console.log(error) 
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top z-1" style={{backgroundColor: '#745537', color: 'white'}}>
        <div className="container-fluid">
          
          <NavLink className="homeLink" to='/'>
            <img
              src="src/assets/DALL·E 2025-01-10 10.47.27 - A creative and modern icon for a bakery DoughtaBase, combining a database stack symbol with bakery elements. The icon features a database cylinder wit.webp"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
              // style={{color: 'white'}}
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


            {/* search box */}
            <form className="d-flex" role="search" onSubmit={handleQuery}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="try bakery or city"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            <AuthButton />
          </div>
        </div>
      </nav>
      {/* <div className="renderComponent">{renderComponent()}</div> */}
    </>
  );
};
export default NavBar;
