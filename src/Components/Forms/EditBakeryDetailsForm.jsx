import React, { useEffect, useState } from 'react'
import { states } from "../../datas/us_cities";

import './AddBakeryForm.css'
import { updateBakery } from '../../services/bakeryServices';

const EditBakeryDetails = ({ bakery, reFetch }) => {
  
  const [formData, setFormData] = useState(bakery)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const result = await updateBakery(formData, bakery.id)

      reFetch()
    } catch (error) {
      alert(error)
    } 

  }

//bakery name, street, apt_or_unit, city state
  return (
    <div className='add-bakery-div'>
        
        <form className='add-bakery-form' onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name:</label>
            <input
            type="text"
            className="name"
            name="name"
            id="name"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
            />

            <label htmlFor="street">Street:</label>
            <input
            type="text"
            className="street"
            name="street"
            id="street"
            autoComplete="off"
            value={formData.street}
            onChange={handleChange}
            />

            <label htmlFor="apt_or_unit">Apt/Unit #:</label>
            <input
            type="text"
            className="apt_or_unit"
            name="apt_or_unit"
            id="apt_or_unit"
            autoComplete="off"
            value={formData.apt_or_unit}
            onChange={handleChange}
            placeholder='Building # Apt. #'
            />

            <label htmlFor="city"> City:</label>
            <input
            type="text"
            className="city"
            name="city"
            id="city"
            autoComplete="off"
            value={formData.city}
            onChange={handleChange}
            placeholder='Building # Apt. #'
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


            <input type="submit" className="submit" value="Save" data-bs-dismiss="modal" />
        </form>

    </div>
  )
}

export default EditBakeryDetails