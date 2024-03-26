import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { fetchDataFromApi } from '../utils/api'
import { Context } from '../context/contextApi'
import FixedSidebar from './FixedSidebar'
import SearchResultVideosCard from './SearchResultVideosCard'
import Sidebar from './Sidebar'

export default function SearchResult() {

  const [result, setResult] = useState()
  const { searchQuery } = useParams()
  const { setloading, lightMode, showSidebar } = useContext(Context)

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h")
    fetchSearchResults()
  }, [searchQuery])

  const fetchSearchResults = () => {
    setloading(true)
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res)
      setResult(res?.contents)
      setloading(false)
    })
  }

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
      <FixedSidebar />
      {
        showSidebar &&
        <Sidebar />
      }
      <div className={`grow w-[calc(100%-240px)] h-full overflow-y-auto ${lightMode ? 'light-bg' : 'dark-bg'}`}
        style={scrollbarStyles}>
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item.type !== "video") return false
            let video = item?.video;
            return (
              <SearchResultVideosCard key={video?.videoId} video={video} />
            )

          })}
        </div>
      </div>
    </div>
  )
}
