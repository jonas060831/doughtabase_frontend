import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { deleteMenuItem } from '../../../services/menuItemServices'
import { addSpecialty, deleteSpecialty } from '../../../services/specialtyServices'

const BakedGood = ({ item, reFetch, bakery }) => {
 
  const user = useAuth()

  const handleDelete = async (event) => {
    event.preventDefault()

    const res = await deleteMenuItem(item.id)

    console.log(res)

    reFetch()
  }

  const handleAddToSpecialties = async () => {

    const res = await addSpecialty(item.id, bakery.id)
    reFetch()
    console.log(res)
  }

  const handleDeleteSpecialty  = async (itemId) => {
    

    const specialty= bakery.specialties.find((specialty) => specialty.item === itemId)

    console.log(specialty)

    const res = await deleteSpecialty(specialty.id)

    console.log(res)
    reFetch()
    console.log(res)
  }

  const exist = bakery.specialties.some(specialty => specialty.item === item.id)
  

  return (
        <div className="card" style={{ width: '20rem' }}>
            <img src={item.image_url} className="card-img-top" alt={item.image_url} style={{ width: '8rem' }}/>
            <div className="card-body">
                <h5
                  className="card-title . text-truncate"
                >
                    {item.name}
                </h5>

                

                {
                  user.user.user_id === bakery.creator ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        <button className='btn btn-danger' onClick={handleDelete} >Delete</button>

                        {/* find out if the current item is on the especialties menu */}
                        {
                          exist ? (
                            <i onClick={() => handleDeleteSpecialty(item.id)} className="fa-solid fa-star" style={{ fontSize: '2.3rem', color: '#ffd43b' }}></i>
                          ) : (
                            <>
                            <i onClick={handleAddToSpecialties} className="fa-regular fa-star" style={{ fontSize: '2.3rem', color: '#ffd43b' }}></i>
                            </>
                          )
                        }
                      </div>
                  ) : (
                      <a href="#" className="btn" style={{ backgroundColor: '#745537', color: 'white' }}>Add to Cart $ {item.price}</a>
                  )
                }

                
            <i className="star" />
            </div>
        </div>
  )
}

export default BakedGood