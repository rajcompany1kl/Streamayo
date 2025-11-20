import MyListTemplate from '@/modules/home/template/MyListTemplate'
import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Reqsignin from '../Reqsignin';

const MyListPage = async () => {
     const { userId } = await auth();
   if (!userId) {
   return <Reqsignin />;
    }
  return (
    <MyListTemplate />
  )
}

export default MyListPage