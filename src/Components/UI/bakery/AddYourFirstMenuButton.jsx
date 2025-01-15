import React from 'react'
import './AddYourFirstMenuButton.css'

const AddYourFirstMenuButton = ({ title }) => {
    
    //i need to know if there is log in user

    //if the login user have the same id as the creator of the bakery then show the
    //the add your first dough button
  
    return (
    <button className='giant_doughtabase_button'>
       <i class="fa-solid fa-mug-hot"></i> {title}
    </button>
  )
}

export default AddYourFirstMenuButton