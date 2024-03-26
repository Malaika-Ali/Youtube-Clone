import React, { useRef, useEffect, useContext } from 'react';
import { GoMoon } from "react-icons/go";
import { Context } from '../context/contextApi';

import { IoSettingsOutline } from "react-icons/io5";

function ProfileModal({ dropDownRef, setProfileModal, profilePath }) {
  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
     setProfileModal(false)
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClickOutside]);

  const {lightMode, setLightMode}=useContext(Context)

  console.log("Profile Path:", profilePath);


  return (
    <div className={`${lightMode ? 'light-bg' : 'dark-modal-bg'} p-4 lg:w-80 shadow-lg z-50 absolute 
    right-24 top-6 rounded-xl`} ref={dropDownRef}>
      <ul>
        {/* <div className="p-2 text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-300">
          My Profile
        </div> */}
        <div className="flex justify-start items-center gap-6">
          <div className="flex justify-center items-center h-8 w-8 cursor-pointer overflow-hidden rounded-full">
            <img src={profilePath} className='w-full h-full object-cover'
              />
          </div>

          <div className={`flex flex-col justify-start ${lightMode ? 'text-black' : 'text-white'}  text-[16px]`}>
            <span>Malaika Baig</span>
            <span>@MalaikaBaig</span>
            <span className='cursor-pointer text-blue-500 mt-4 text-[14px]'>View Your Channel</span>
          </div>

        </div>

        <hr className='mt-4 mb-2' />

          <div className={`p-2 text-[16px]  cursor-pointer rounded flex flex-row gap-4 items-center 

    ${lightMode ? 'light-bg-hover text-black' : 'hover:bg-[#303030]/[0.9] text-white'}`}>
          <span><GoMoon /></span>
          <span onClick={()=>setLightMode((prev)=>!prev)}>{`Appearance: ${lightMode ? 'Light' : 'Dark'}`}</span>
        </div> 

        <hr className='my-2' />

<div className={`p-2 text-[16px] cursor-pointer rounded flex flex-row gap-4 items-center 
${lightMode ? 'light-bg-hover text-black' :
 'hover:bg-[#303030]/[0.9] text-white'}`}>
<span><IoSettingsOutline /></span>
<span >Settings</span>
</div> 

        
      </ul>
    </div>
  );
}

export default ProfileModal;
