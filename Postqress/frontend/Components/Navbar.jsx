import React from 'react'

const Navbar = ({onOpen}) => {
  return (
    <nav className='flex items-center justify-between h-16 px-6'>
      <h1 className='text-lg font-medium'>Clients</h1>
      <div className='flex items-center gap-4'>
        <input 
          type="text" 
          placeholder='Search...'
          className='px-4 py-1 border rounded'
        />
        <button onClick={onOpen} className='px-3 py-1 bg-blue-500 text-white rounded'>
          Add Client
        </button>
      </div>
    </nav>
  )
}

export default Navbar 