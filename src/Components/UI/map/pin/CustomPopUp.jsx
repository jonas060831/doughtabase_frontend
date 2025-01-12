import React from 'react'

const CustomPopUp = ({ bakery, navigate, handlePlotRoute }) => {

  if(!bakery) return null

  return (
    <div className='container'
     style={{
        marginTop: '0.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    }}>

        {
            bakery.photo_url ?
            (
                <img
                 src={bakery.photo_url}
                 alt={bakery.name}
                 style={{
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '100vw',
                    boxSizing: 'border-box',
                    objectFit: 'cover',
                    border: '2px solid #d2c2ae',
                    boxShadow: '1px 3px 5px black'
                 }}
                />
            ):(
                <img
                 src="./3dshop.gif"
                 alt={bakery.name}
                 style={{
                    boxSizing: 'border-box',
                    width: '50%'
                 }}
                />
            )
        }

        <h6>{bakery.name}</h6>


        <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn btn-primary position-relative" onClick={() => navigate(`/bakeries/${bakery.id}`)}>
                <i className="fa-solid fa-circle-info"></i>
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                </span>
            </button>

            <button type="button" className="btn btn-primary position-relative" onClick={() => handlePlotRoute()}>
                <i className="fa-solid fa-diamond-turn-right"></i>
            </button>
        </div>
    </div>
  )
}

export default CustomPopUp