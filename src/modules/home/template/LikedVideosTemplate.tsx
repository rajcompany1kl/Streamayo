'use client'
import useRequest from '@/shared/hooks/useRequest'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import LikedVideoCard from '../components/LikedVideoCard'
import { Video } from '@/shared/models/video'
import { Heart } from 'lucide-react';

const LikedVideosTemplate = ({videos}: { videos: Video[]}) => {
  const request = useRequest()
  const { user } = useUser()
  const [loading, setLoading] = useState(true);
 

  
 

     if (videos.length === 0)
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400">
          <Heart className="w-10 h-10 text-gray-700 mb-3" />
          <p className="text-lg font-semibold">No Liked videos yet 💔</p>
          <p className="text-sm text-gray-500 mt-1">Start exploring and like the ones you love!</p>
        </div>
      );
  

  return (
    <main className="w-full min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 mt-2">
         
          <span className="text-sm text-gray-500">{videos.length} liked</span>
        </div>

        {/* List View */}
        <div className="flex flex-col divide-y divide-gray-300">
          {videos.map((video) => (
            <div key={video._id} className=" transition-colors rounded-xl">
              <LikedVideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default LikedVideosTemplate