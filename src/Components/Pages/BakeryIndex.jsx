import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBakeries, getBakery, getBakeryPhoto } from '../../services/bakeryServices';
import useTimeAgo from '../UI/utils/timeAgo';

import BakedGood from '../UI/modules/BakedGood';

const BakeryIndex = () => {
  const { id } = useParams();
  const [shops, setShops] = useState(null);
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBakeryInformation();
  }, [id]);

  const formatMenu = (DBbakery) => {
    const categorizedMenu = DBbakery.menu.reduce((accumulator, currentItem) => {
      const category = currentItem.category;
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      accumulator[category].push(currentItem);
      return accumulator;
    }, {});

    setMenu(categorizedMenu);
  };

  const fetchBakeryInformation = async () => {
    try {
      console.log('Fetching bakery data...');
      const bakeryIndexData = await getBakeries();
      console.log('Fetched bakery data:', bakeryIndexData);
  
      setShops(bakeryIndexData);
  
      const downloadedPhoto = await getBakeryPhoto(bakeryIndexData);
      console.log('Downloaded photo:', downloadedPhoto);
  
      formatMenu(bakeryIndexData);
  
      setShops((prev) => ({
        ...prev,
        photo_url: downloadedPhoto,
      }));
    } catch (error) {
      console.error('Error fetching bakery information:', error);
      alert('Invalid input or error fetching bakery data.');
      navigate(`/`);
    }
  };
  
  const timeAgo = useTimeAgo(shops?.registered_date);

  if (!shops && !menu) return <div>Loading...</div>;
  if (shops?.detail) return <div>Sorry, no data found.</div>;

  return (
    <div>
      <div className="bakery_info">
        <div
          className="bakery header"
          style={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>
            {shops.photo_url ? (
              <img
                src={shops.photo_url}
                alt="Storefront"
                style={{
                  width: '225px',
                  height: '225px',
                  objectFit: 'cover',
                  borderRadius: '100vw',
                  border: '2px solid #d2c2ae',
                  boxShadow: '1px 3px 5px black',
                }}
              />
            ) : (
              <img src="/3dshop.gif" alt="Loading" style={{ width: '300px' }} />
            )}

            <h1>{shops.name}</h1>
          </div>
        </div>

        <div className="content" style={{ display : 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="row">
            <div className="col-3">
              <div id="list-example" className="list-group">
                {menu ? (
                  Object.keys(menu).map((category, index) => (
                    <a
                      key={index}
                      className="list-group-item list-group-item-action"
                      href={`#${category}`}
                    >
                      {category}
                      <span className="badge text-bg-danger" style={{ float: 'right' }}>
                        {menu[category].length}
                      </span>
                    </a>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
            <div className="col-8">
              <div
                data-bs-spy="scroll"
                data-bs-target="#list-example"
                data-bs-smooth-scroll="true"
                className="scrollspy-example"
                tabIndex="0"
              >
                {menu &&
                  Object.keys(menu).map((category, index) => (
                    <div className="category_and_content" key={index}>
                      <h4
                        id={category}
                        className="bg-danger text-white"
                        style={{
                          borderTopLeftRadius: '3px',
                          padding: '1rem',
                        }}
                      >
                        {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
                      </h4>

                      <div
                        style={{
                          display: 'flex',
                          gap: '3rem',
                          flexWrap: 'wrap',
                          marginLeft: '2rem',
                          padding: '2rem',
                        }}
                      >
                        {menu[category].map((item, index) => (
                          <BakedGood item={item} key={index} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryIndex;
