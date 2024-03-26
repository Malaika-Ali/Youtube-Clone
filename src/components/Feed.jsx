import React,{useContext, useEffect} from 'react'
import { Context } from '../context/contextApi'
import  Sidebar  from './Sidebar'
import  VideoCard  from './VideoCard'
import FixedSidebar from './FixedSidebar'



export default function Feed() {

  const{loading,searchResults, showSidebar, lightMode}=useContext(Context)

  useEffect(()=>{
    document.getElementById("root").classList.remove('custom-h');
  },[])

  // Custom scrollbar styling for lightMode
  const scrollbarStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: lightMode ? '#dddddd #ffffff' : '#888 #0F0F0F',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: lightMode ? '#ffffff' : '#0F0F0F',
    },
    '&::-webkit-scrollbar-thumb': {
      background: lightMode ? '#dddddd' : '#888',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: lightMode ? '#bbbbbb' : '#555',
    },
  };

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <FixedSidebar/>

      {/* conditionally rendering sidebar */}
      {
        showSidebar &&
<Sidebar/>
      }
      
      <div className={`grow w-[calc(100%-240px)] h-full overflow-y-auto ${lightMode ? 'light-bg' : 'dark-bg'}`}
      style={scrollbarStyles}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {
            !loading && searchResults &&
            searchResults?.map((item)=>{
              if (item?.type !=="video") return false
              return(
                <VideoCard key={item?.video?.videoId}
                video={item?.video}
                />
              )
            })
          }
        </div>

      </div>
      
    </div>
  )
}
