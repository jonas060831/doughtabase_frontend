import React, { useEffect, useState } from 'react'
import { loginStandardUser } from '../../services/authServices';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        const response = await loginStandardUser(formData)
        
        alert(response.message)

        login(response.token)
        navigate('/')

    } catch (error) {
        alert(error)
    }

  }
  return (
    <div>
        <h1>Login Page</h1>


        <form onSubmit={handleSubmit}>
            
            <label htmlFor="email"> Email: </label>
            <input 
             type="text"
             className="email"
             name="email"
             id="email"
             value={formData.email}
             onChange={handleChange}
            />

            <label htmlFor="password"> Password: </label>
            <input
             type="password"
             className="password"
             name="password"
             id="password"
             value={formData.password}
             onChange={handleChange}
            />

            <input type="submit" className="submit" />
        </form>


        <br /><br />
        <Link to="/signup" >Sign Up</Link>
        <br />
    </div>
  )
}

export default LoginPage