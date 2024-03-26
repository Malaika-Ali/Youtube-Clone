// import React from 'react'
// import moment from 'moment';

// function VideoLength({time}) {

//     // Video length over thumbnail in Hours, minutes and seconds
//     const videoLengthInSeconds=moment().startOf("day").seconds(time).format("H:mm:ss");

//   return (
//     <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md font-semibold'>
//       {videoLengthInSeconds}
//     </div>
//   )
// }

// export default VideoLength


import React from 'react';
import moment from 'moment';

function VideoLength({ time }) {
  // Video length over thumbnail in Hours, minutes and seconds
  const duration = moment.duration(time, 'seconds');
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:`;
  }

  formattedTime += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className='absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md font-semibold'>
      {formattedTime}
    </div>
  );
}

export default VideoLength;

