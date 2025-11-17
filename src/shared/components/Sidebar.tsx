'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { SidebarMenu } from '../constants/SidebarMenu'
import type { SidebarItem } from '../types'
import Link from "next/link";




const SidebarItem: React.FC<Partial<Omit<SidebarItem, 'type'>>> = ({ icon, label, route }) => {
  const pathname = usePathname()
  const router = useRouter()

  // function handleSidebarItemClick(e: any) {
  //   e.stopPropagation()

  //   if (route) router.push(route)
  // }
  const isActive = route === pathname
  
  return (
   <Link href={route ?? '#'} prefetch className="group w-full flex flex-col">
      {/* Top-level item */}
      <div
        className={` flex items-center space-x-3
      w-full h-11 px-4 py-2
      rounded-xl transition-all duration-200
      text-black
      hover:bg-gray-100
      cursor-pointer ${isActive ? ' bg-gray-200' : 'bg-white'}`}>
        {icon}
        <span className="whitespace-nowrap text-sm tracking-wide font-medium flex-1">
          {label}
        </span>

      </div>
    </Link>

  )
}

const Sidebar = () => {
  return (
    <aside className="w-full h-[calc(100vh-64px)] px-4 py-6 
                      bg-white
                     backdrop-blur-md  shadow-lg
                     flex flex-col justify-between ">
      <div className="flex flex-col space-y-2 w-full">
        {SidebarMenu.map((item) => (
          <SidebarItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            route={item.route}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar