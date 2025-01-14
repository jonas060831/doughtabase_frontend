import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { registerStandardUser } from '../../services/authServices'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
      email : "",
      password : "",
      repeat_password: "",
      first_name: "",
      last_name: ""
  })
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await registerStandardUser(formData)
    
    console.log(response)

    alert(response.message)

    login(response.token)
    navigate('/')

  }

  return (
    <div>
        <h1>SignUpPage</h1>

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

        
            <label htmlFor="repeat_password"> Repeat Password: </label>
            <input 
                type="password"
                className="repeat_password"
                name="repeat_password"
                id="repeat_password"
                value={formData.repeat_password}
                onChange={handleChange}
            />
            <label htmlFor="first_name"> First Name: </label>
            <input 
                type="text"
                className="first_name"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
            />
            <label htmlFor="last_name"> Last Name: </label>
            <input 
                type="text"
                className="last_name"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
            />

            <input
              type="submit"

            />
        </form>
    </div>
  )
}

export default SignUpPage