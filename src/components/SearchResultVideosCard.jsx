import React, { useContext } from 'react'
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import VideoLength from '../shared/VideoLength';
import { Context } from '../context/contextApi';

export default function SearchResultVideosCard({ video }) {

  const { lightMode } = useContext(Context)

  return (
    <Link to={`/video/${video.videoId}`}>
      <div className={`flex flex-col md:flex-row mb-8 md:mb-3 
      ${lightMode ? 'light-bg-hover' : 'lg:hover:bg-white/[0.1]'}
      rounded-xl md:p-4`}>
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img className='h-full w-full object-cover subtitle-zoom' src={video?.thumbnails?.[0]?.url} alt="" />
          {/* Component to show length of video */}
          {
            video?.lengthSeconds && (
              <VideoLength time={video?.lengthSeconds} />
            )
          }
        </div>

        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className={`text-lg md:text-xl font-semibold line-clamp-2 ${lightMode ? 'text-black' : 'text-white'}`}>
            {video?.title}
          </span>



          


            <div className={`flex flex-row text-sm font-semibold 
               ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'}
               truncate overflow-hidden`}>
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>


              {/* The dot between updation time and views stats */}
              <span className={`flex text-[24px] leading-none font-bold
               ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'}
               relative top-[-10px] mx-1`}>.</span>

              {/* Video updation time */}
              <span className='truncate'>
                {video?.publishedTimeText}
              </span>
            </div>






            <div className="flex flex-col">

            <div className="hidden md:flex items-center">
              <div className="flex items-start mr-3 mt-4">
                <div className='flex items-center h-7 w-7 rounded-full overflow-hidden'>
                  <img className='h-full w-full object-cover' src={video?.author?.avatar[0]?.url} alt="Channel's DP" />
                </div>
              </div>


              <span className={`text-sm font-semibold mt-2 
              ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'} flex items-center`}>
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" &&
                  (
                    <BsFillCheckCircleFill className={`${lightMode ? 'text-black/[0.5]' : 'text-white/[0.5]'} text-[12px] ml-1`} />
                  )}
              </span>



             

            </div>

 {/* Video Description */}
 <span className={`empty:hidden text-sm line-clamp-1 md:line-clamp-2
           ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'}
           md:pr-24 md:my-4`}>
                {video?.descriptionSnippet}
              </span>


          </div>
        </div>
      </div>

    </Link>
  )
}
