import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'

const Home = () => {
  return (
    <div className='flex justify-between gap-3 '>
      <LeftSideBar />
      <div  className='hidden lg:block h-screen w-0.5 bg-gray-200' ></div>
      <RightSideBar/>
    </div>
  )
}

export default Home
