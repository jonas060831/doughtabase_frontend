import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBakeries, getBakeryPhoto, getBakery } from '../../services/bakeryServices';
import useTimeAgo from '../UI/utils/timeAgo';

import BakedGood from '../UI/modules/BakedGood';

const BakeryIndex = () => {
//   const { id } = useParams();
  const [shops, setShops] = useState([]);
//   const [menu, setMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBakeryInformation();
  }, []);

//   const formatMenu = (DBbakery) => {
//     const categorizedMenu = DBbakery.menu.reduce((accumulator, currentItem) => {
//       const category = currentItem.category;
//       if (!accumulator[category]) {
//         accumulator[category] = [];
//       }
//       accumulator[category].push(currentItem);
//       return accumulator;
//     }, {});

//     setMenu(categorizedMenu);
//   };

  const fetchBakeryInformation = async () => {
    try {
        console.log('Fetching bakery data...');
        const bakeryIndexData = await getBakeries();
        console.log('Fetched bakery data:', bakeryIndexData);
        // Check if bakeryIndexData is empty or undefined
        if (!bakeryIndexData || bakeryIndexData.length === 0) {
          throw new Error('No bakeries found');
        }
  
      setShops(bakeryIndexData);
  
    //   const downloadedPhoto = await getBakeryPhoto(bakeryIndexData);
    //   console.log('Downloaded photo:', downloadedPhoto);
  
    //   formatMenu(bakeryIndexData);
  
    //   setShops((prev) => ({
    //     ...prev,
    //     photo_url: downloadedPhoto,
    //   }));
    } catch (error) {
      console.error('Error fetching bakery information:', error);
      alert('Invalid input or error fetching bakery data.');
      navigate(`/`);
    }
  };
  
  const timeAgo = useTimeAgo(shops?.registered_date);

//   if (!shops && !menu) return <div>Loading...</div>;
  if (!shops.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="bakery_info">
        <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {shops.map((shop) => (
            <div key={shop.id} className="bakery-card" style={{ margin: '2rem', border: '1px solid #ddd', padding: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {shop.photo_url ? (
                  <img
                    src={shop.photo_url}
                    alt={shop.name}
                    style={{
                      width: '225px',
                      height: '225px',
                      objectFit: 'cover',
                      borderRadius: '100vw',
                      border: '2px solid #d2c2ae',
                    }}
                  />
                ) : (
                  <img src="/3dshop.gif" alt="Loading" style={{ width: '225px' }} />
                )}
                <h2>{shop.name}</h2>
                <p>{shop.street}, {shop.city}, {shop.state}</p>
                <p>{shop.phone_number}</p>
                {/* Display more details or link to individual bakery page */}
                <button onClick={() => navigate(`/bakeries/${shop.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BakeryIndex;
