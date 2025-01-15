import React from 'react'
import './AddYourFirstMenuButton.css'

const AddYourFirstMenuButton = ({ title, data_bs_toggle, data_bs_target}) => {

    return (
    <button
     className='giant_doughtabase_button'
     data-bs-toggle={data_bs_toggle}
     data-bs-target={data_bs_target}
    >
       <i class="fa-solid fa-mug-hot"></i> {title}
    </button>
  )
}

export default AddYourFirstMenuButton