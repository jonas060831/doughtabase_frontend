import React from 'react'

const BakedGood = ({ item }) => {
  return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={item.image_url} className="card-img-top" alt={item.image_url} style={{ width: '8rem' }}/>
            <div className="card-body">
                <h5
                  className="card-title . text-truncate"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="This top tooltip is themed via CSS variables."
                >
                    {item.name} $ {item.price}
                </h5>

                <a href="#" className="btn" style={{ backgroundColor: '#745537', color: 'white' }}>Add to Cart</a>
                
            </div>
        </div>
  )
}

export default BakedGood