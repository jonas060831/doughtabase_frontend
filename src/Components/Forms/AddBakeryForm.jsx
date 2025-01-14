import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { createBakery } from '../../services/bakeryServices'
import { states } from "../../datas/us_cities";


const AddBakeryForm = ({  }) => {
    const { login, user } = useAuth()
    const [formData, setFormData] = useState({
      email : "",
      password : ""
    })
  
    const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      const creator = user.user_id
      const authData = [...formData, creator];
      setFormData(authData)      
      console.log(formData)
      try {
          const response = await createBakery(formData)
          
          // if(response.error) throw new Error(response.error);          
          console.log(response)      
  
      } catch (error) {
          alert(error.message)
      }
  
    }

  return (
    <div>
        <h1>Your Business is Our Priority</h1>

        <form onSubmit={handleSubmit}>
            
            <label htmlFor="name"> Bakery Name: </label>
            <input 
             type="text"
             className="name"
             name="name"
             id="name"
             value={formData.name}
             onChange={handleChange}
            />

            <label htmlFor="street"> Street Address: </label>
            <input
             type="text"
             className="street"
             name="street"
             id="street"
             value={formData.street}
             onChange={handleChange}
            />

            <label htmlFor="apt_or_unit"> Apartment Or Unit #: </label>
            <input
            type="text"
            className="apt_or_unit"
            name="apt_or_unit"
            id="apt_or_unit"
            value={formData.apt_or_unit}
            onChange={handleChange}
            />


            <label htmlFor="city"> City </label>
            <input
            type="text"
            className="city"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            />

            <label htmlFor="state"> State </label>
            <select
             className="state"
             name="state"
             id="state"
             value={formData.state}
             onChange={handleChange}
            >
                {
                    states.map( (state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))
                }
             </select>


            <input type="submit" className="submit" />
        </form>
    </div>
  )
}

export default AddBakeryForm