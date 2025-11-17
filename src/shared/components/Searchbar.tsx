'use client'
import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation';
const Searchbar = () => {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [focused, setFocused] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [probables, setProbables] = React.useState<any[]>([]);
    const router = useRouter();
    const searchRef = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        console.log("Search Term:", searchTerm);
       const delay = setTimeout(
        () => {
            if (searchTerm.length > 2) {
                fetch(`${NEXT_PUBLIC_BACKEND_URL}/videos/search/${searchTerm}`)
                .then(res => res.json())
                .then(data => setProbables(data))
            } else {
                setProbables([]);
            }
        }, 500
       );
         return () => clearTimeout(delay);

    }, [searchTerm]);
  useEffect(() => {
    console.log("Probable Results:", probables);
  }, [probables]);

     useEffect(() => { 
        document.addEventListener('mousedown', (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setFocused(false);
            }
        });
        return () => document.removeEventListener('mousedown', (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setFocused(false);
            }
        });
    }, []);

  return (
    <div className='flex flex-col relative' ref={searchRef}>
     <div className='flex h-8 border rounded-md border-gray-400'>
    <input placeholder='Search' className='px-2 text-gray-600 placeholder-gray-400 ' type="search" onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm} name="searchVideos" id="searchVideos" 
    onFocus={()=> setFocused(true)}/>
     <span className='border-l rounded-r-md border-gray-400 bg-gray-100 flex '>
         <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6 text-gray-600 my-auto p-0.5"
    onFocus={() => setFocused(true)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
    />
  </svg>
     </span>
      </div>
      <div className='flex flex-col rounded-md shadow-gray-600 shadow-sm bg-white mt-1 max-h-60 overflow-y-auto absolute left-0 right-0 z-50 mt-1 top-full'>
        { (focused && probables.length> 0 && searchTerm.length>2) && probables.map((item) => (
            <div key={item._id} className='flex text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-md'>
             <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5  my-auto p-0.5"
  > <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35m1.1-5.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
    />
  </svg>
            <span  onClick={() => {router.push(`/video/${item._id}`), setSearchTerm('')}}  className='px-2 py-1'>{item.title}</span>
            </div>
        ))}
      </div>
      </div>
  )
}

export default Searchbar