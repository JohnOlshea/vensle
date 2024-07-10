import { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import TopMenu from "./TopMenu";
import ProductTypeMenu from "./ProductTypeMenu";
import Search from "./Search";
import logo from "assets/img/front/logo.PNG";



const Header = ({
    activePill,
    setActivePill
}) => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div>
      <TopMenu />

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


          </div>
        </div>
      </div>
      {showNavbar && <div className="bg-white top-0 fixed z-10 w-full border-b border-b-gray-200/50 border-b-4">
         <div className="flex mx-auto max-w-2xl py-4 pt-4 md:pt-2 md:pb-4 lg:pt-6 lg:pb-4 lg:max-w-7xl lg:px-8">
	    <Search />
	    <div className="flex ml-[4%] gap-8">
      	        <ProductTypeMenu activePill={activePill} setActivePill={setActivePill} />
	    </div>
         </div>
      </div>}

      <NavLinks />


    </div>
  );
};

export default Header;
