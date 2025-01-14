import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Map from "./Components/Pages/Map";
import Home from "./Components/Pages/Home";
import Specialties from "./Components/Pages/Specialties";
import BakeryPage from "./Components/Pages/BakeryPage";
import NavBar from "./Components/UI/navbar/NavBar";
import About from "./Components/Pages/About";
import Footer from "./Components/UI/Footer/Footer"
import LoginPage from "./Components/Pages/LoginPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignUpPage from "./Components/Pages/SignUpPage.jsx";
import OpenBakeryButton from "./Components/UI/bakery/OpenBakeryButton.jsx";
import BakeryIndex from "./Components/Pages/BakeryIndex.jsx";

const  App = () => {
 
  return (
    <AuthProvider>
      <>
        <BrowserRouter>
      
        <NavBar />
        <Routes>
          {/* unprotected routes */}
          <Route path='/' element= {<Home />} />
          <Route path='/login' element= {<LoginPage />} />
          <Route path='/specialties' element= {<Specialties />} />
          <Route path='/bakeries' element= {<BakeryIndex />} />
          <Route path='/bakeries/:id' element= {<BakeryPage />} />
          <Route path='/map' element= {<Map />} />
          <Route path='/about' element= {<About />} />
          <Route path="/signup" element={<SignUpPage/> }/>

          {/* protected routes */}
        </Routes>
        <Footer/>
      </BrowserRouter>
      <OpenBakeryButton />
      
      </>
      </AuthProvider>
  );
}


export default App;
