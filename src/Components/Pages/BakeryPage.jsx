import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBakery, getBakeryPhoto } from '../../services/bakeryServices'
import useTimeAgo from '../UI/utils/timeAgo'

const Bakery = () => {
  const { id } = useParams()
  const [bakery, setBakery] = useState(undefined)

  const navigate = useNavigate()
  
  useEffect(() => {
    fetchBakeryInformation()

  },[])


  const fetchBakeryInformation = async () => {
    try {
      const bakeryData = await getBakery(id)

      setBakery(bakeryData)

      const downloadedPhoto = await getBakeryPhoto(bakeryData)

      setBakery(prevValue => ({
        ...prevValue,
        photo_url: downloadedPhoto
      }));

    } catch (error) {

      alert('Sorry invalid input')
      
      navigate(`/`)
    }
  }

  // Always call the hook, even if bakery or registered_date is undefined
  const timeAgo = useTimeAgo(bakery?.registered_date);

  //while waiting for data
  if(!bakery) return <>Loading...</>
  //if there is no data found
  if(bakery.detail) return <>Sorry No data found..</>

  return (
    <div>

      <header style={{paddingTop: '13rem'}}>

        { !bakery.photo_url ? <img src='../3dshop.gif' alt='./assets/3dshop.gif'style={{ width: '300px', height: 'auto', objectFit: 'cover' }} /> : <img src={bakery.photo_url} alt={bakery.photo_url} style={{ width: '300px', height: 'auto', objectFit: 'contain' }}/>}
        <h1>{bakery.name}</h1>
        <h3>{bakery.street} {bakery.apt_or_unit}</h3>
        <h5>{bakery.city}</h5>
        <h5>member since: {timeAgo || "N/A"}</h5>
      </header>

      {/* show menu */}
      <div>

      </div>


    </div>
  )
}

export default Bakery