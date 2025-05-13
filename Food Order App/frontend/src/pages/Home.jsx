import React from 'react'
import Display1 from '../components/home/Display1.jsx'
import TopDishes from '../components/home/TopDishes.jsx'
import Categories from '../components/home/Categories.jsx'


const Home = () => {
  return (
    <div className='mt-17 h-grow bg-slate-50'>
       <Display1/>
      <Categories />
    
     <TopDishes />
    </div>
  )
}

export default Home
