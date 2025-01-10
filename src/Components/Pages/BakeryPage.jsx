import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBakery } from '../../services/bakeryServices'

const Bakery = () => {
  const { id } = useParams()
  const [bakery, setBakery] = useState()

  useEffect(() => {
    fetchBakeryInformation()
  },[])

  const fetchBakeryInformation = async () => {

    const bakeryData = await getBakery(id)

    console.log(bakeryData)
    setBakery(bakeryData)

  } 

  if(bakery === undefined) return <>Loading...</>

  return (
    <div>
      <h1>{bakery.name}</h1>
      <h3>{bakery.street}</h3>
    </div>
  )
}

export default Bakery