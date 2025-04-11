import React, { useState } from 'react'
import Table from '../Components/Table'
import Navbar from '../Components/Navbar'
import Modal from '../Components/Modal'

const App = () => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState("add")

  const handleOpen = (mode) => {
    setMode(mode)
    setOpen(true)
    console.log(`modal ${mode}`)
  }

  return (
    <div className='text-2xl'>
      <Navbar onOpen={() => handleOpen('add')} />
      <Table handleOpen={handleOpen} />

      <Modal
  open={open}
  onClose={() => setOpen(false)}
  mode={mode}
  onSubmit={() => {
    console.log(mode === 'edit' ? 'Saving changes...' : 'Adding client...')
    setOpen(false)
  }}
/>

    </div>
  )
}

export default App
