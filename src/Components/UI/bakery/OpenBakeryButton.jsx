import React, { useEffect } from 'react'
import './OpenBakeryButton.css'
import { useAuth } from '../../../context/AuthContext'


const OpenBakeryButton = () => {
  const {  user } = useAuth()

  useEffect(() => {
    console.log(typeof user)
  })

  const handleOpenBakery = () => {
    
    if(user) {
        alert('open modal')
    } else {
        alert('you must login to continue')
    }

  }
  return (
    <button
     onClick={handleOpenBakery}
     className='floating_button'
     style={{ display: user === 'null' ? 'block' : 'hidden' }}
    >
        <i className="fa-solid fa-plus"></i>
    </button>
  )
}

export default OpenBakeryButton