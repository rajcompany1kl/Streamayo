'use client';
import useRequest from '@/shared/hooks/useRequest';
import { Video } from '@/shared/models/video';
import React, { use, useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const HomeTemplate = () => {
  const isFirstLoad = React.useRef(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [liveVideos, setLiveVideos] = useState<Video[]>([]);
  const PAGE_SIZE = 9;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const request = useRequest();
  const loader = React.useRef<HTMLDivElement>(null);


  const fetchLiveVideos = async () => {
    const lresponse = await request.home.getLiveVideos();
    if (lresponse?.liveRooms?.length) {
      setLiveVideos(lresponse.liveRooms);
    }
  };


   async function fetchLimitedVideos(skip: number, PAGE_SIZE: number) {
    const response = await request.home.getLimitedVideos(skip, PAGE_SIZE);
     if (response?.videos?.length) {
      const { videos } = response;
    
    
      const videosWithUserData = videos;
      
      setVideos(prev => {
  const merged = [...prev, ...videosWithUserData];
  const unique = Array.from(new Map(merged.map(v => [v._id, v])).values());
  return unique;
});


    }
    if (response.videos.length < PAGE_SIZE) {
      setHasMore(false);
    }
  } 

   useEffect(() => {
    console.log("Fetching batch", skip);
    fetchLimitedVideos(skip, PAGE_SIZE);
    fetchLiveVideos();
  }, [skip]);

 

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
         if (isFirstLoad.current) {
        // Skip the very first trigger
        isFirstLoad.current = false;
        return;
      }
        console.log('Loader is visible, fetching more videos...');
       setSkip(prev => prev + PAGE_SIZE);
      }
    }, 
      { threshold: 1, rootMargin: '200px' }
    ); 

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore]);


  return (
    <div>
    <div className="grid grid-cols-1 gap-y-4 items-stretch lg:grid-cols-3 lg:gap-x-3 lg:gap-y-6 mt-2 pr-3 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-4">
      {liveVideos.map(l => (
        <VideoCard key={l._id} video={l} isLive />
      ))}
      {videos
        .filter(v => v.thumbnailUrl)
        .map(v => (
          <VideoCard key={v._id} video={v} isLive={false} />
        ))}
       
    </div>
    <div>
      <div ref={loader} className="h-12 w-full ctext-black">LoadingIcon</div>
      
    </div>
    </div>
  );
};

export default HomeTemplate;