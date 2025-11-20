import VideoPlayerTemplate from '@/modules/home/template/VideoPlayerTemplate';
import { Video } from '@/shared/models/video';
import React from 'react';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const VideoPlayerPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;

  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/videos/${resolvedParams.slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    const data = await response.json();
    console.log("Fetched video data:", data);

    const video: Video = {
      ...(data._doc || data)
    };
    console.log("Video object to be passed to template:", video);
    return <VideoPlayerTemplate metadata={video} />;
  } catch (error) {
    console.error("Failed to fetch video:", error);
    return <div>An error occurred while loading the video.</div>;
  }
};

export default VideoPlayerPage;
