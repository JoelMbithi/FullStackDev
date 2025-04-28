import React, { useEffect, useState } from 'react'
import { FiUsers, FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Admin = () => {
  const [user,setUser] = useState(null)
  const [count,setCount] = useState(0)
  const [apartments, setApartments] = useState(null)
  const [apartmentCount, setApartmentCount] = useState(0)

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/user/getUsers`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res.data.data)
      setUser(res.data.data)
      setCount(res.data.count)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchUser()
  },[])


  const fetchApartments = async () => {

    try {
      const res = await axios.get(`http://localhost:3000/api/apartment/get`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      })
      console.log(res.data.apartments)
     setApartments(res.data.apartments)
     setApartmentCount(res.data.apartments.length)
     
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApartments()
  }
  , [])

  return (
    <div className='flex h-screen bg-gray-100'>  
      {/* Left sidebar */}
      <div className='bg-blue-950 text-white h-200 w-80 flex flex-col'>
        <div className='flex flex-col items-center justify-center h-80 bg-slate-700'>
          <h1 className='text-4xl font-bold'>Build Estate</h1>
        </div>

        <div className='text-white text-xl p-8'>
          <Link to="/admin/dashboard" className='flex items-center p-3 rounded hover:bg-slate-700 transition-colors'>
            <FiHome className='mr-3' />
            Dashboard
          </Link>
          <Link to="/users" className='flex items-center p-3 rounded hover:bg-slate-700 transition-colors'>
            <FiUsers className='mr-3' />
            User Management
          </Link>
          <Link to="/properties" className='flex items-center p-3 rounded hover:bg-slate-700 transition-colors'>
            <FiHome className='mr-3' />
            Property Management
          </Link>
          <Link to="/admin/settings" className='flex items-center p-3 rounded hover:bg-slate-700 transition-colors'>
            <FiSettings className='mr-3' />
            Settings
          </Link>
        </div>

        <div className='p-4 border-t border-slate-700 mt-30'>
          <button 
            /* onClick={handleLogout} */
            className='flex items-center w-full p-3 rounded hover:bg-slate-700 transition-colors'
          >
            <FiLogOut className='mr-3 ' />
            Logout
          </button>
        </div>
      </div>

      {/* Right content area */}
      <div className='flex-1  mt-10 p-8 '>
        <div className='bg-white rounded-lg shadow  p-6'>
          <h1 className='text-4xl font-bold'>Admin Page</h1>

          {/* Single Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>

            {user && user.length > 0 && (
              <div className='flex flex-col p-4 rounded bg-slate-50'>
              <h1 className='text-blue-600 font-bold'>Total Users</h1>
              <p className='font-bold'>{count}</p>
            </div>
            )

            }

            <div className='flex flex-col p-4 rounded bg-slate-50'>
              <h1 className='text-purple-600 font-bold'>Pending Approvals</h1>
              <p>198</p>
            </div>
            <div className='flex flex-col p-4 rounded bg-slate-50'>
              <h1 className='text-purple-600 font-bold'>Completed Approvals</h1>
              <p>198</p>
            </div>

          </div>
      
        </div>
        {/* Graph section */}

        

      </div>
    </div>
  );
}

export default Admin;
