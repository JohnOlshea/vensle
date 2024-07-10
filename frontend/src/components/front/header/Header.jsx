import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {  logout } from "actions/auth";

import { SET_MESSAGE } from "actions/types";

import NavLinks from "./NavLinks";
import TopMenu from "./TopMenu";
import ProductTypeMenu from "./ProductTypeMenu";
import SignInRegisterLinks from "./SignInRegisterLinks";
import SignInRegisterModal from "./SignInRegisterModal";

import logo from "assets/img/front/logo.PNG";
import Search from "./Search";

const Header = ({
    activePill,
    setActivePill
}) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.user);
  const storedCountry = localStorage.getItem("userCountry") || "Unknown";
  const storedCountryFlag = localStorage.getItem("countryFlag") || "";

  const [loginOpen, setLoginOpen] = useState(false);
 
  const [activeTab, setActiveTab] = useState(1);
  const [showNavbar] = useState(false);
  
  const handleSignInClick = (e) => {
    setLoginOpen(true);
    setActiveTab(1);
  };

  const handleRegisterClick = (e) => {
    setLoginOpen(true);
    setActiveTab(2);
  };

  const handleTopNavClick = (e, name) => {
    if (name === "Logout") {
      e.preventDefault();
      dispatch(logout());
    }
  };

  const handleGetUserCountry = () => {
    if (storedCountry == "UK") return <>United Kingdom</>;
    else if (storedCountry == "US") return <>United States</>;
    else if (storedCountry == "NG") return <>Nigeria</>;
  };


  const handleUploadClick = (e) => {
    e.preventDefault();
    setRedirect("?redirect=modal");
    setActiveTab(1);
    setLoginOpen(true);

    dispatch({
      type: SET_MESSAGE,
      payload: {
        type: "success",
        message: "Please sign in to upload a product",
      },
    });
  };

  const handleRegisterDriverClick = (e) => {
    e.preventDefault();
    setDriverRegister(true);
    setActiveTab(2);
    setLoginOpen(true);
  };


  return (
    <div>
      <TopMenu
	  isAuthenticated = {isAuthenticated}
	  handleUploadClick = {handleUploadClick}
	  handleRegisterDriverClick = {handleRegisterDriverClick}
	  handleTopNavClick = {handleTopNavClick}
          storedCountryFlag={storedCountryFlag}
	  handleGetUserCountry={handleGetUserCountry}
      />

      <div>
         <div className="mx-auto max-w-2xl px-4 py-2 sm:px-1 lg:max-w-7xl lg:px-8">
      	    <ProductTypeMenu position={'relative'} activePill={activePill} setActivePill={setActivePill} />
	 </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
          <div
            className="flex flex-col gap-[1%] justify-between md:items-center lg:flex-row"
          >
            <Link className="relative px-6 md:z-10 md:px-0" to="/">
              <img className="w-40 md:w-auto" src={logo} alt="vensle" />
            </Link>
            <Search position={'relative'} />

	      <SignInRegisterLinks
		    user={user}
		    handleTopNavClick={handleTopNavClick}
		    isAuthenticated={isAuthenticated}
		    handleSignInClick={handleSignInClick}
	    	    handleRegisterClick={handleRegisterClick}
	      />
          </div>
        </div>
      </div>
      {showNavbar && <div className="bg-white top-0 fixed z-10 w-full border-b border-b-gray-200/50 border-b-4">
         <div className="flex mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
	    <Search />
	    <div className="flex ml-[4%] gap-8">
      	        <ProductTypeMenu activePill={activePill} setActivePill={setActivePill} />
	        <SignInRegisterLinks
		    user={user}
		    handleTopNavClick={handleTopNavClick}
		    isAuthenticated={isAuthenticated}
		    handleSignInClick={handleSignInClick}
	    	    handleRegisterClick={handleRegisterClick}
	        />
	    </div>
         </div>
      </div>}

      <NavLinks
        storedCountryFlag={storedCountryFlag}
        handleGetUserCountry={handleGetUserCountry}
      />

      <SignInRegisterModal
	  setLoginOpen={setLoginOpen}
	  loginOpen={loginOpen}
	  setActiveTab={setActiveTab}
	  activeTab={activeTab}
      />

    </div>
  );
};

export default Header;
