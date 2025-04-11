import React from 'react'

const Table = ({handleOpen}) => {
  return (
    <div className='container mx-auto mt-30 flex justify-center'>
      <table className='text-xl' >
        <thead>
          <tr className=''>
            <th className='px-4 py-2 text-left'>Name</th>
            <th className='px-4 py-2 text-left'>Email</th>
            <th className='px-4 py-2 text-left'>Job</th>
            <th className='px-4 py-2 text-left'>Rate</th>
            <th className='px-4 py-2 text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row - replace with your data */}
          <tr className=''>
            <td className='px-4 py-2'>Joe</td>
            <td className='px-4 py-2'>joe@gmail.com</td>
            <td className='px-4 py-2'>Developer</td>
            <td className='px-4 py-2'>$50</td>
            <div className='flex gap-4 p-4'>
            <button className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-120 transition-all'>Active</button>
           <button className='px-4  py-2 rounded bg-slate-600  hover:bg-slate-800 hover:scale-120 transition-all' onClick={() => handleOpen('edit')}>Update</button>
            <button className='px-4 py-2 rounded bg-pink-400 hover:bg-pink-600 hover:scale-120 transition-all'>Delete</button>
           </div>
          </tr>
          <tr className=''>
            <td className='px-4 py-2'>Joe</td>
            <td className='px-4 py-2'>joe@gmail.com</td>
            <td className='px-4 py-2'>Developer</td>
            <td className='px-4 py-2'>$50</td>
            <div className='flex gap-4 p-4'>
            <button className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-120 transition-all'>Active</button>
           <button className='px-4  py-2 rounded bg-slate-600  hover:bg-slate-800 hover:scale-120 transition-all' onClick={() => handleOpen('edit')}>Update</button>
            <button className='px-4 py-2 rounded bg-pink-400  hover:bg-pink-600 hover:scale-120 transition-all'>Delete</button>
           </div>
          </tr>
          <tr className=' '>
            <td className='px-4 py-2'>Joe</td>
            <td className='px-4 py-2'>joe@gmail.com</td>
            <td className='px-4 py-2'>Developer</td>
            <td className='px-4 py-2'>$50</td>
           <div className='flex gap-4 p-4'>
            
           <button className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-120 transition-all'>Active</button>
           <button className='px-4  py-2 rounded bg-slate-600 hover:bg-slate-800 hover:scale-120 transition-all' onClick={() => handleOpen('edit')}>Update</button>
            <button className='px-4 py-2 rounded bg-pink-400 hover:bg-pink-600 hover:scale-120 transition-all'>Delete</button>
           </div>
            
          </tr>
          <tr className=''>
            <td className='px-4 py-2'>Joe</td>
            <td className='px-4 py-2'>joe@gmail.com</td>
            <td className='px-4 py-2'>Developer</td>
            <td className='px-4 py-2'>$50</td>
            <div className='flex gap-4 p-4'>
            <button className='px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-700 hover:scale-120 transition-all'>Active</button>
           <button className='px-4  py-2 rounded bg-slate-600 hover:scale-120 transition-all' onClick={() => handleOpen('edit')}>Update</button>
            <button className='px-4 py-2 rounded bg-pink-400  hover:bg-pink-600 hover:scale-120 transition-all'>Delete</button>
           </div>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

export default Table