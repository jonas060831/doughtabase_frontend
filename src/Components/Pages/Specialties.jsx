import React, { useEffect, useState } from 'react'
import { getSpecialties } from '../../services/specialtyServices'
import { getBakeries } from '../../services/bakeryServices'

const Specialties = () => {
  
  const [specialties, setSpecialties] = useState()
  const [bakeries, setBakeries] = useState([])
  useEffect(() => {
    fetchSpecialties()
    fetchBakeries()
  }, [])
  const fetchBakeries = async () => {
    const res = await getBakeries()
    setBakeries(res)
  }

  const fetchSpecialties  = async() => {

    const res = await getSpecialties()

    console.log(res)

    //group it by bakeryId
    const groupByBakeryId = Object.groupBy(res, (bakery) => bakery.bakery)
    
    setSpecialties(groupByBakeryId)
  }

  const renderBakery = (bakeryId) => {

    //get bakery from the fetch bakeries
    // console.log(typeof bakeryId)
    const filteredBakeries = bakeries.filter(bakery => bakery.id === parseInt(bakeryId))
   
    const objectBakery = filteredBakeries[0]
    console.log(objectBakery)
    if(!objectBakery) return null

    return (
      <div>
        { objectBakery.name }

        {objectBakery.menu.map(menu => (
          <div>{menu.name}</div>
        ))}
      </div>
    )

  }

  if(!specialties) return <h1>No Specialties Yet</h1>

  return (
    <div>
      <h1>Specialties</h1>

      {
        Object.keys(specialties).map(bakeryWithSpecialtyId => (
          <div>{renderBakery(bakeryWithSpecialtyId)}</div>
        ))
      }

    </div>
  )
}

export default Specialties