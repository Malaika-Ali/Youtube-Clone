import React,{useContext} from 'react'
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import VideoLength from '../shared/VideoLength';
import { Context } from '../context/contextApi';

export default function VideoCard({ video }) {

  const {lightMode}=useContext(Context);

  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img className='h-full w-full object-cover subtitle-zoom' src={video?.thumbnails?.[0]?.url} alt="" />
          {/* Component to show length of video */}
          {
            video?.lengthSeconds && (
              <VideoLength time={video?.lengthSeconds} />
            )
          }
        </div>

        {/* Channel's dispaly image */}
        <div className={`flex ${lightMode ? 'dark-text' : 'text-white'} mt-3`}>
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img src={video?.author.avatar[0]?.url} className='h-full w-full object-cover' />
            </div>
          </div>

          {/* Video title */}
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-md font-semibold line-clamp-2">
              {video?.title}
            </span>

            {/* Channel name and verification mark */}
            <span className={`text-[15px] font-semibold mt-2  flex items-center
            ${lightMode ? 'dark-text' : 'text-white/[0.7]'}`}>
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" &&
                (
                    <BsFillCheckCircleFill className={` 
                    ${lightMode ? 'dark-text' : 'text-white/[0.5]'}
                    text-[12px] ml-1`} />
                )}
            </span>

            {/* video uploading time */}
            <div className={`flex text-[13px] font-semibold truncate overflow-hidden
            ${lightMode ? 'dark-text' : 'text-white/[0.7]'}`}>
              <span>{`${abbreviateNumber(video?.stats?.views,2)} views`}</span>


{/* The dot between updation time and views stats */}
              <span className={`flex text-[24px] leading-none font-bold relative top-[-10px] mx-1
              ${lightMode ? 'dark-text' : 'text-white/[0.7]'}`}>.</span>

{/* Video updation time */}
              <span className='truncate'>
                {video?.publishedTimeText}
              </span>

            </div>
          </div>

        </div>

      </div>
    </Link>
  )
}
