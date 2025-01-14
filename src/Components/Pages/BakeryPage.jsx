import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBakery, getBakeryPhoto } from '../../services/bakeryServices'
import useTimeAgo from '../UI/utils/timeAgo'

import './BakeryPage.css'
import BakedGood from '../UI/modules/BakedGood'

const Bakery = () => {
  const { id } = useParams()
  const [bakery, setBakery] = useState(undefined)
  const [menu, setMenu] = useState(undefined)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchBakeryInformation()
    
  },[])


  const formatedMenu = (DBbakery) => {
// { breads : [{},{}], cookies: [{}, {}], pastries: [{}] }
      const categorizedMenu = DBbakery.menu.reduce((accumulator, currentItem) => {
        //initialize the category
        const category = currentItem.category
        //we can populate each category
        if(accumulator[category]) accumulator[category].push(currentItem)
        
        //initialize the category with value
        if(!accumulator[category]) accumulator[category] = [currentItem]
        //return
        return accumulator
      }, {})
  setMenu(categorizedMenu)
  }



  const fetchBakeryInformation = async () => {
    try {
      const bakeryData = await getBakery(id)

      setBakery(bakeryData)

      const downloadedPhoto = await getBakeryPhoto(bakeryData)
      await formatedMenu(bakeryData)
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
  if(!bakery && menu === undefined) return <>Loading...</>
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
            bakery.photo_url ? (
              <img src={bakery.photo_url} alt="store front" style={{ width: '100px' }}/>
            ) : (
              <img src='/3dshop.gif' style={{ width: '100px' }}/>
            )
          }

          {bakery.name}
        </div>

        <div className="content">

            <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className="col-2">
                <div id="list-example" className="list-group">

                  {menu !== undefined ? (                    
                    Object.keys(menu).map((category, index) => (
                      <Link key={index} className="list-group-item list-group-item-action" href={`${category}`}>{category}</Link>
                    ))) : (
                      <div>Loading~~*~*~*~**~*</div>
                  )}

                </div>
              </div>
              <div className="col-8">
                <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                  
                  {
                    menu !== undefined ? (
                      Object.keys(menu).map( (category, index) => (
                        <div className='category_and_content' key={index}>
                            <h4 id={category} className='srtgertgret bg-danger text-white'>{category}</h4>
  
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
  
                            {
                              menu[category].map((item, index) => (
                                <BakedGood item={item} key={index}/>
                              ))
                            }
                            </div>
  
                        </div>
                      ))
                    ) : (<div></div>)
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