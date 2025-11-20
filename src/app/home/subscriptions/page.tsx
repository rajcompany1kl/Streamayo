import SubscriptionsTemplate from '@/modules/home/template/SubscriptionsTemplate'
import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Reqsignin from '../Reqsignin';

const SubscriptionsPage = async() => {
      const { userId } = await auth();
       if (!userId) {
       return <Reqsignin />;
        }
  return (
    <SubscriptionsTemplate />
  )
}

export default SubscriptionsPage