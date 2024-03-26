import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import SidebarMenuItem from './SidebarMenuItem'
import { categories } from '../utils/constants'
import { Context } from '../context/contextApi'

function Sidebar() {

  // using context for certain context states
  const { selectCategories, setselectCategories, mobileMenu, lightMode, showSidebar } = useContext(Context);

  const navigate=useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setselectCategories(name)
      case "home":
        return setselectCategories(name)
      case "menu":
        return false
      default:
        break;
    }
  }

  

  return (
    <div 
    className={` bg-opacity-30 bg-gray-800 w-[240px] overflow-y-auto h-full py-4 ${
      lightMode ? 'light-bg' : 'dark-bg'
    } fixed left-0 z-50 transition-all  ${
      showSidebar ? 'translate-x-0' : 'translate-x-[-240px]'
    } ease-in-out duration-300 scroll-smooth
    }`}

  //   className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
  //     showSidebar ? "translate-x-0" : ""
  // }`}

    // className={`bg-opacity-30 bg-gray-800 w-[240px] overflow-y-auto h-full py-4 ${
    //   lightMode ? 'light-bg' : 'dark-bg'
    // } fixed left-0 z-50  sidebar ${showSidebar ? 'show' : ''}
    //   `}
    
     >
      <div className="flex px-5 flex-col">
        {
          categories.map((category) => {
            return (
              <>
                <SidebarMenuItem
                  text={category.type === 'home' ? 'Home' : category.name}
                  icon={category.icon}
                  action={() => {
                    clickHandler(category.name, category.type)
                    navigate("/")
                    
                  }}
                  className={`${selectCategories === category.name ? (lightMode ? 'light-div-bg' : 'bg-white/[0.15]') : ''}`}
                />
                {
                  category.divider && (
                    <hr className={`my-5 ${lightMode ? 'border-black/[0.2]' : 'border-white/[0.2]'} `} />
                  )
                }
              </>
            )
          })
        }
        <hr className={`my-5 border-white/[0.2]
        ${lightMode ? 'border-black/[0.2]' : 'border-white/[0.2]'}`}/>
        <div className={`${lightMode ? 'dark-text' : 'text-white'} text-[12px]`}>
          Clone By: Malaika Ali
        </div>
      </div>

    </div>
  )
}

export default Sidebar










