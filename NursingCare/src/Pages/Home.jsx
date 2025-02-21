import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Barnner from '../components/Barnner'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='text-black-500'>
      <Header/>
 
      <SpecialityMenu />
      <TopDoctors />
      <Barnner />

    </div>
  )
}

export default Home
