import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogo2 from "../images/yt-logo-2.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";


import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";
import ProfileModal from './ProfileModal';

export default function Header() {

  // Whatever we type in the search bar to search, it gets saved here
  const [searchQuery, setSearchQuery] = useState("")


  const { loading, mobileMenu, setmobileMenu, setShowSidebar, lightMode } = useContext(Context)

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if ((event?.key === 'Enter' || event === 'searchButton') && searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`);
    }
  }

  const mobileMenuToggle = () => {
    setmobileMenu(!mobileMenu);
    setShowSidebar((prev) => !prev)
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0]

  const [profileModal, setProfileModal] = useState(false)



  const divRef = useRef();
  const dropDownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target) && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setProfileModal(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [divRef, dropDownRef]);

  const profilePath="https://xsgames.co/randomusers/avatar.php?g=female";

  return (
    <div className={`sticky top-0 z-10 flex flex-row items-center justify-between h-16 px-4 md:px-5 ${lightMode ? 'light-bg' : 'dark-bg'}`}>
      {loading && <Loader />}
      <div className="flex h-5 items-center">
        {/* {pageName !== "video" && ( */}
        <div className={`flex md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full ${lightMode ? 'light-bg-hover' : 'hover:bg-[#303030]/[0.6]'}`} onClick={mobileMenuToggle}>
          {mobileMenu ? (<CgClose className={`${lightMode ? 'dark-text' : 'light-text'} text-xl`} />) : (<SlMenu className={`${lightMode ? 'dark-text' : 'light-text'} text-xl`} />)}
        </div>
        {/* )} */}

        <Link to='/' className='flex h-6 items-center'>
          <img className={`h-full hidden dark:md:block ${lightMode ? 'dark-text' : 'light-text'}`}
            src={lightMode ? ytLogo2 : ytLogo}
            alt='youtube-logo' />
          {/* <img className='h-full md:hidden' src={ytLogoMobile} alt='youtube-logo' /> */}
        </Link>


      </div>
      <div className="group flex items-center">
        <div className={`flex h-8 md:h-10 md:ml-10 md:pl-5 border   
        ${lightMode ? 'border-gray-400' : 'border-[#303030]'}
        rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0`}>
          <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
            <IoIosSearch className={`${lightMode ? 'dark-text' : 'light-text'} text-xl`} />
          </div>
          <input type="text"
            placeholder='Search'
            className={`bg-transparent outline-none ${lightMode ? 'dark-text placeholder:text-black/[0.7]' : 'light-text placeholder:text-white/[0.7]'} pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]  placeholder:text-md`}
            onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={searchQueryHandler} value={searchQuery} />
          {
            searchQuery.length > 0 && (

              <CgClose className={`${lightMode ? 'dark-text light-bg-hover' : 'light-text hover:bg-[#303030]/[0.6]'} flex md:mr-6 cursor-pointer items-center justify-center h-8 w-8 p-2 my-auto rounded-full `} onClick={() => { setSearchQuery('') }}
              />
            )
          }

        </div>
        <button className={`w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]
        ${lightMode ? 'light-div-bg border-gray-400' : 'border-[#303030] bg-white/[0.1] '}

        `}>
          <IoIosSearch className={`${lightMode ? 'dark-text' : 'light-text'} text-xl`} />
        </button>
      </div>

      {/* right div with icons */}
      <div className="flex items-center justify-center mr-8 ml-2">
        <div className='hidden md:flex'>
          <div className={`flex items-center justify-center h-12 w-12 rounded-full cursor-pointer
          ${lightMode ? 'light-bg-hover' : 'hover:bg-[#303030]/[0.6]'}
          `}>
            <RiVideoAddLine className={`${lightMode ? 'dark-text' : 'light-text'} text-2xl`} />
          </div>
          <div className={`flex items-center justify-center ml-2 h-12 w-12 rounded-full cursor-pointer ${lightMode ? 'light-bg-hover' : 'hover:bg-[#303030]/[0.6]'}`}>
            <FiBell className={`${lightMode ? 'dark-text' : 'light-text'} text-2xl`} />
          </div>
        </div>

        <div className={`flex items-center justify-center my-auto h-8 w-8 overflow-hidden rounded-full md:ml-4 cursor-pointer ${lightMode ? 'light-bg-hover' : 'hover:bg-[#303030]/[0.6]'}`}
          onClick={() => setProfileModal(true)}
        // onClick={()=>setLightMode((prev)=>!prev)}
        >
          <img
          //  src="https://xsgames.co/randomusers/avatar.php?g=female"
          src={profilePath}
           
           alt="profile-img" className="h-full w-full object-cover rounded-full" />

          {
            profileModal &&
            <ProfileModal dropDownRef={dropDownRef} setProfileModal={setProfileModal}  profilePath={profilePath}/>
          }
        </div>

      </div>
    </div>
  )
}
