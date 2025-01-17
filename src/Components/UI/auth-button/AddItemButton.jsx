import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'

const AddItemButton = ({ bakeryOwner }) => {

  const { user, loading } = useAuth()


  if(loading) return <>loading...</>
  return (
    <span
    className='add_span'
    data-bs-toggle="modal"
    data-bs-target="#list_menu_item"
    style={{ display: bakeryOwner === user?.user_id  ? 'block' : 'none' }}
    >
        <i class="fa-solid fa-plus"></i>
    </span>
  )
}

export default AddItemButton