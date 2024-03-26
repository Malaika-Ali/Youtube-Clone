import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideosCard from "./SuggestionVideosCard";
import Sidebar from './Sidebar'



function VideoDetails() {

    const [video, setVideo] = useState()
    const [relatedVideos, setRelatedVideos] = useState()
    const { id } = useParams();
    const { setloading, showSidebar, lightMode } = useContext(Context)

    useEffect(() => {
        // add custom-h class to this page whenever loaded
        document.getElementById('root').classList.add('custom-h')
        fetchVideoDetails()
        fetchSuggestedVideos()
        // whenever the id changes in the URL
    }, [id])

    // const fetchVideoDetails=()=>{
    //     setloading(true);
    //     fetchDataFromApi(`video/details/?id=${id}`).then((resp)=>{
    //         console.log(resp)
    //         setVideo(resp)
    //         setloading(false)
    //     })
    //     .catch((error) => {
    //         if (error.response && error.response.status === 429) {
    //             // If rate limited, retry after 5 seconds
    //             setTimeout(fetchVideoDetails, 5000);
    //         } else {
    //             // Handle other errors
    //             console.error('Error fetching video details:', error);
    //             setloading(false);
    //         }
    //     });
    // }

    const fetchVideoDetails = async () => {
        setloading(true);
        try {
            const resp = await fetchDataFromApi(`video/details/?id=${id}`);
            console.log(resp);
            setVideo(resp);
            setloading(false);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Retry after a delay, using exponential backoff
                const delay = Math.pow(2, error.response.headers["retry-after"]);
                await new Promise((resolve) => setTimeout(resolve, delay * 1000));
                fetchVideoDetails(); // Retry the request
            } else {
                console.error('Error fetching video details:', error);
                setloading(false);
            }
        }
    };


    const fetchSuggestedVideos = () => {
        setloading(true);
        fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
            console.log(res);
            setRelatedVideos(res);
            setloading(false);
        })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    // If rate limited, retry after 5 seconds
                    setTimeout(fetchVideoDetails, 5000);
                } else {
                    // Handle other errors
                    console.error('Error fetching video details:', error);
                    setloading(false);
                }
            });
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
        <div className={`flex justify-center flex-row h-[calc(100%-56px)] ${lightMode ? 'light-bg' : 'dark-bg'}`}>
           
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
            {
                showSidebar && <Sidebar /> 
            }
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https:www.youtube.com/watch?v=${id}`}
                            controls
                            width='100%'
                            height='100%'
                            style={{ backgroundColor: '#000000' }}
                            playing={true}
                        />
                    </div>

                    {/* Video's title */}
                    <div className={`${lightMode ? 'text-black' : 'text-white'} flex justify-start items-center font-bold text-sm md:text-xl mt-4`}
                    >
                        {video?.title}
                    </div>

                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">

                                {/* Channel's DP */}
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img className="h-full w-full object-cover" src={video?.author?.avatar[0]?.url} alt="Profile" />
                                </div>
                            </div>

                            {/* Channel's name */}
                            <div className="flex flex-col ml-3">
                                <div className={`${lightMode ? 'text-black' : 'text-white'} text-md font-semibold flex items-center`}>
                                    {video?.author?.title}

                                    {/* Channel's verification badge if any */}
                                    {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" &&
                                        (
                                            <BsFillCheckCircleFill className={` 
                                            ${lightMode ? 'text-black/[0.5]' : 'text-white/[0.5]'}
                                            text-[12px] ml-1`} />
                                        )}
                                </div>

                                {/* Channel's subscribers numbers */}
                                <div className={`${lightMode ? 'text-black/[0.7]' : 'text-white/[0.7]'} text-sm`}>
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>

                        </div>

                        {/* Video's Likes Numbers */}
                        <div className={`flex ${lightMode ? 'text-black' : 'text-white'} mt-4 md:mt-0`}>
                            <div className={`flex items-center justify-center h-11 px-4 rounded-3xl ${lightMode ? 'light-div-bg' : 'bg-white/[0.15]'}`}>
                                <AiOutlineLike className={`text-xl ${lightMode ? 'text-black' : 'text-white'} mr-2`} />
                                <span>{`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}</span>
                            </div>

                            {/* Video's views numbers */}
                            <div className={`flex items-center justify-center h-11 px-4 rounded-3xl  
                            ${lightMode ? 'light-div-bg' : 'bg-white/[0.15]'}
                            ml-4`}>
                                <FiEye className={`text-xl ${lightMode ? 'text-black' : 'text-white'} mr-2`}/>
                                <span>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Rendering suggested video's section here */}
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]"
                style={scrollbarStyles}>
                    {
                        relatedVideos?.contents?.map((item, index) => {
                            if (item.type !== "video") return false
                            return (
                                <SuggestionVideosCard key={index} video={item?.video} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default VideoDetails



