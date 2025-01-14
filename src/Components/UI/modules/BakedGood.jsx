import React from 'react'

const BakedGood = ({ item }) => {
  return (
        <div className="card" style={{ width: '20rem' }}>
            <img src={item.image_url} className="card-img-top" alt={item.image_url} style={{ width: '8rem' }}/>
            <div className="card-body">
                <h5
                  className="card-title . text-truncate"
                >
                    {item.name}
                </h5>

                <a href="#" className="btn" style={{ backgroundColor: '#745537', color: 'white' }}>Add to Cart $ {item.price}</a>
                
            <i className="star" />
            </div>
        </div>
  )
}

export default BakedGood