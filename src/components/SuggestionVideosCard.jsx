import React, { useContext } from 'react'
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import VideoLength from '../shared/VideoLength';
import { Context } from '../context/contextApi';
export default function SuggestionVideosCard({video}) {

  const {lightMode}=useContext(Context)

  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex mb-3">
        <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
          <img className='h-full w-full object-cover subtitle-zoom' src={video?.thumbnails?.[0]?.url} alt="" />
          {/* Component to show length of video */}
          {
            video?.lengthSeconds && (
              <VideoLength time={video?.lengthSeconds} />
            )
          }
        </div>

           {/* Video title */}
           <div className="flex flex-col ml-3 overflow-hidden">
            <span className={`text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 ${lightMode ? 'text-black' : 'text-white'}`}>
              {video?.title}
            </span>

            {/* Channel name and verification mark */}
            <span className={`text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2
              
             ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'}
             flex items-center`}>
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" &&
                (
                  <BsFillCheckCircleFill className={`${lightMode ? 'text-black/[0.5]' : 'text-white/[0.5]'} text-[12px] lg:text-[10px] xl:text-[12px] ml-1`} />
                )}
            </span>

            {/* video uploading time */}
            <div className={`flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold
             ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'} 
             truncate overflow-hidden`}>
              <span>{`${abbreviateNumber(video?.stats?.views,2)} views`}</span>


{/* The dot between updation time and views stats */}
              <span className={`flex text-[24px] leading-none font-bold
               ${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'} 
               relative top-[-10px] mx-1`}>.</span>

{/* Video updation time */}
              <span className='truncate'>
                {video?.publishedTimeText}
              </span>

            </div>
          </div>
      </div>
    </Link>
  )
}
