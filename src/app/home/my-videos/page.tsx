import MyVideosTemplate from '@/modules/home/template/MyVideosTemplate'
import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Reqsignin from '../Reqsignin';

const MyVideosPage = async() => {
       const { userId } = await auth();
     if (!userId) {
     return <Reqsignin />;
      }
  return (
    <MyVideosTemplate />
  )
}

export default MyVideosPage