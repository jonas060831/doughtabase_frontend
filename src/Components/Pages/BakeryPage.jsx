import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBakery, getBakeryPhoto } from '../../services/bakeryServices'
import useTimeAgo from '../UI/utils/timeAgo'

import './BakeryPage.css'
import BakedGood from '../UI/modules/BakedGood'

const Bakery = () => {
  const { id } = useParams()
  const [bakery, setBakery] = useState(undefined)

  const navigate = useNavigate()
  
  useEffect(() => {
    fetchBakeryInformation()


  },[])

  const dummyData = {
    "id": 1,
    "name": "85°C Bakery Cafe",
    "street": "Serramonte Center",
    "city": "Daly City",
    "state": "CA",
    "longitude": -122.4705271,
    "latitude": 37.6699828,
    "registered_date": "2025-01-10T14:47:41.187246Z",
    "apt_or_unit": "#5-L",
    "photo_url": null,
    "menu": [
        {
            "id": 1,
            "image_url": "https://i.imgur.com/QJE9WhX.jpeg",
            "category": "breads",
            "name": "Holiday Rolls",
            "price": "10.50",
            "rating": 5,
            "registered_date": "2025-01-10T16:49:07.977394Z",
            "bakery": 1
        },
        {
          "id": 2,
          "image_url": "https://i.imgur.com/QJE9WhX.jpeg",
          "category": "breads",
          "name": "Dinner Rolls",
          "price": "5.50",
          "rating": 5,
          "registered_date": "2025-01-10T16:49:07.977394Z",
          "bakery": 1
      },
      {
        "id": 3,
        "image_url": "https://i.imgur.com/QJE9WhX.jpeg",
        "category": "cookies",
        "name": "M & M Cookie",
        "price": "15.50",
        "rating": 5,
        "registered_date": "2025-01-10T16:49:07.977394Z",
        "bakery": 1
      },
      {
        "id": 4,
        "image_url": "https://i.imgur.com/QJE9WhX.jpeg",
        "category": "cookies",
        "name": "Chocolate Chip Cookie",
        "price": "25.50",
        "rating": 5,
        "registered_date": "2025-01-10T16:49:07.977394Z",
        "bakery": 1
      },
      ,
      {
        "id": 5,
        "image_url": "https://i.imgur.com/QJE9WhX.jpeg",
        "category": "pastries",
        "name": "Key Lime curd",
        "price": "19.50",
        "rating": 5,
        "registered_date": "2025-01-10T16:49:07.977394Z",
        "bakery": 1
      }
    ]
}

// { breads : [{},{}], cookies: [{}, {}], pastries: [{}] }
 const categorizedMenu = dummyData.menu.reduce((accumulator, currentItem) => {
  //initialize the category
  const category = currentItem.category
  //we can populate each category
  if(accumulator[category]) accumulator[category].push(currentItem)
  
  //initialize the category with value
  if(!accumulator[category]) accumulator[category] = [currentItem]
  //return
  return accumulator

 }, {})


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

      {/* <header style={{paddingTop: '13rem'}}>

        { !bakery.photo_url ? <img src='../3dshop.gif' alt='./assets/3dshop.gif'style={{ width: '300px', height: 'auto', objectFit: 'cover' }} /> : <img src={bakery.photo_url} alt={bakery.photo_url} style={{ width: '300px', height: 'auto', objectFit: 'contain' }}/>}
        <h1>{bakery.name}</h1>
        <h3>{bakery.street} {bakery.apt_or_unit}</h3>
        <h5>{bakery.city}</h5>
        <h5>member since: {timeAgo || "N/A"}</h5>
      </header> */}

      {/* show menu */}
      

      <div className="bakery_info">

        <div className="bakery header">
          
          {
            dummyData.photo_url ? (
              <img src={dummyData.photo_url} alt="store front" style={{ width: '100px' }}/>
            ) : (
              <img src='/3dshop.gif' style={{ width: '100px' }}/>
            )
          }

          {dummyData.name}
        </div>

        <div className="content">

            <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className="col-2">
                <div id="list-example" className="list-group">

                  {
                    Object.keys(categorizedMenu).map((category, index) => (
                      <Link key={index} className="list-group-item list-group-item-action" href={`${category}`}>{category}</Link>
                    ))
                  }
                </div>
              </div>
              <div className="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                  
                  {
                    Object.keys(categorizedMenu).map( (category, index) => (
                      <div className='category_and_content' key={index}>
                          <h4 id={category} className='srtgertgret bg-danger text-white'>{category}</h4>

                          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                          {
                            categorizedMenu[category].map((item, index) => (
                              <BakedGood item={item} key={index}/>
                            ))
                          }
                          </div>

                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Bakery