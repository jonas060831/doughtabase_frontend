import React, { useEffect, useState } from 'react'
import './OpenBakeryButton.css'
import { useAuth } from '../../../context/AuthContext'
import BasicModal from '../modals/BasicModal'
import AddBakeryForm from '../../Forms/AddBakeryForm'


const OpenBakeryButton = () => {
  const {  user } = useAuth()
  

  useEffect(() => {
    console.log(user)
  }, [])

  if(!user) return (
    <>
    
    <button
    className='floating_button'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={() => alert('You must login to create a bakery')}
    >
        <i className="fa-solid fa-plus"></i>
    </button>
    </>
  )


  return (
    <>
    <button
    className='floating_button'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    >
        <i className="fa-solid fa-plus"></i>
    </button>


    <BasicModal
     title="Add Bakery"
     body={<AddBakeryForm/>}
     user={user}
    />
    </>
  )
}

export default OpenBakeryButton