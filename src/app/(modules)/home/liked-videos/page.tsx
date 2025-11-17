import LikedVideosTemplate from '@/modules/home/template/LikedVideosTemplate'
import {getLikedVideosServer} from '@/app/server/home'
import { auth } from "@clerk/nextjs/server";

const LikedVideosPage = async () => {
  
   const { userId } = await auth();

if(!userId) { return <LikedVideosTemplate videos={[]} />}

  const videos = await getLikedVideosServer();
 console.log("liked videos from server c",videos);


  return (
    <LikedVideosTemplate videos={videos} />
  )
}

export default LikedVideosPage