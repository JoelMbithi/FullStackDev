import React, { useRef, useEffect, useState } from 'react'

const Modal = ({ open, onClose, mode = "add", onSubmit }) => {
  const modalRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rate, setRate] = useState('')
  const [job,setJob] = useState('')
  const [status, setStatus] = useState('Inactive') 

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }
  useEffect(() => {
    if (open) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [open])

  return (
    <dialog ref={modalRef} className="modal">
  <div className="modal-box relative">
    <form method="dialog" className="absolute right-2 top-2">
      <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
        ✕
      </button>
    </form>
    
    <h3 className="font-bold text-lg mb-4">
      {mode === 'edit' ? 'Edit Client' : 'Client Details'}
    </h3>

    {/* 🚀 Add your input fields here */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 mb-4">
      <input
      value={name}
      onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter client name"
        className="p-2 border border-slate-700 rounded w-full"
      />
      <input
       value={email}
       onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter email"
        className="p-2 border border-slate-700  rounded w-full"
      />
      <input
       value={job}
       onChange={(e) => setJob(e.target.value)}
        type="text"
        placeholder="Enter job title"
        className="p-2 border border-slate-700 rounded w-full"
      />
      <div className='flex flex-row justify-between'>
      <input
       value={rate}
       onChange={(e) => setRate(e.target.value)}
        type="number"
        placeholder="Rate"
        className="p-2 border border-slate-700 rounded w-30"
      />
      <select onChange={handleStatusChange} value={status } className="p-2 border border-slate-700 rounded w-50">
            <option className='bg-slate-500 text-black' value="">Inactive</option>
            <option className='bg-slate-400 rounded text-black' value="active">Active</option>
          </select>
      </div>
       
    </form>

    <div className="flex justify-end">
      <button className="btn btn-success" onClick={onSubmit}>
        {mode === 'edit' ? 'Save Changes' : 'Add Client'}
      </button>
    </div>
  </div>

  <form method="dialog" className="modal-backdrop">
    <button onClick={onClose}>Close</button>
  </form>
</dialog>

  )
}

export default Modal
