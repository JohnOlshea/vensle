import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HeartIcon,
} from '@heroicons/react/24/outline'

import NavCategories from "./NavCategories";

const NavLinks = ({ storedCountryFlag, handleGetUserCountry }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  return (
    <div
      className="relative bg-white pb-4 border-b border-b-gray-200/50 border-b-4"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul
          style={{ gap: "1%" }}
          className="flex items-center justify-between lg:justify-start min-h-[40px]"
        >
          <li className="mr-6">
            <NavCategories />
          </li>

          <li className="flex items-center text-xs lg:hidden">
            {storedCountryFlag && (
              <img
                className="mr-2 h-4 w-4 rounded-full"
                src={storedCountryFlag}
                alt="country flg"
              />
            )}
            {handleGetUserCountry()}
          </li>
              <li className="hidden hover:underline font-medium px-4 lg:flex border-r cursor-pointer border-r-black border-l border-l-black items-center">
		    <HeartIcon className="h-5 w-5 mr-1" />
	  	    <p>Saved</p>
              </li>

          <li
	    	className="hidden font-medium hover:underline rounded-sm lg:block "
	      >
                <Link className="px-2" to="">
                  Category
                </Link>
              </li>
            <li className="hidden lg:block">Loading . . .</li>
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
