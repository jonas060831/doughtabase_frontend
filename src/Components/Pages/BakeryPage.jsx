import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBakery, getBakeryPhoto } from '../../services/bakeryServices';
import useTimeAgo from '../UI/utils/timeAgo';
import AddYourFirstMenuButton from '../UI/bakery/AddYourFirstMenuButton';

import './BakeryPage.css';
import BakedGood from '../UI/modules/BakedGood';
import { useAuth } from '../../context/AuthContext';
import BasicModal from '../UI/modals/BasicModal';
import AddMenuItemForm from '../Forms/AddMenuItemForm';
import EditBakeryDetails from '../Forms/EditBakeryDetailsForm';

const Bakery = () => {

  const user = useAuth()
  const { id } = useParams();
  const [bakery, setBakery] = useState(null);
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBakeryInformation();

  }, [id, user]);

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
      const bakeryData = await getBakery(id);

      setBakery(bakeryData);

      const downloadedPhoto = await getBakeryPhoto(bakeryData);
      formatMenu(bakeryData);

      setBakery((prev) => ({
        ...prev,
        photo_url: downloadedPhoto,
      }));
    } catch (error) {
      alert('Invalid input or error fetching bakery data.');
      navigate(`/`);
    }
  };

  const timeAgo = useTimeAgo(bakery?.registered_date);

  if (!bakery && !menu) return <div>Loading...</div>;
  if (bakery?.detail) return <div>Sorry, no data found.</div>;

  const renderBakeryOwnerShip = () => {

    //if there is a user and that user owns the bakery show the begin adding items
    if(user?.user?.user_id === bakery.creator) {
      return (
        <div>

              <div className="item_container">
                
                <button type="button" className="btn btn-outline-danger" > 🥐 Breads</button>
                <button type="button" className="btn btn-outline-danger" > 🍪 Cookies</button>
                <button type="button" className="btn btn-outline-danger" > 🍰 Pastries</button>
                <button type="button" className="btn btn-outline-danger" > 🧁 Custom</button>

              </div>


              <div className="item_container">

                    <AddYourFirstMenuButton
                     title="Add Your first Dough"
                     className='floating_button'
                     data_bs_toggle="modal"
                     data_bs_target="#list_menu_item"
                    />

                    <BasicModal
                     title="Add a Menu Item"
                     body={<AddMenuItemForm bakery_id={bakery.id} reFetch={() => fetchBakeryInformation()}/>}
                     modalId="list_menu_item"
                    />
              </div>
          </div>
      )

    }else { //else show me the menu is coming
      return (
        <div className="item_container" style={{ height: '20vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
              <span style={{ fontSize: '4rem' }}>🥐</span>
              <span style={{ fontSize: '4rem' }}>🍪</span>
              <span style={{ fontSize: '4rem' }}>🧁</span>
              <span style={{ fontSize: '4rem' }}>🍰</span>
          </div>

          <strong>Brace yourself—an incredible menu is on the way!</strong>
          </div>
        </div>
      )

    }
    

  }

  return (
    <div className='ui_container'>
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
            {bakery.photo_url ? (
              <img
                src={bakery.photo_url}
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

            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              

              {/* no logged in user */}
              {
                user.user === null ? (
                  <>
                    
                  </>
                ) : (
                  // find out if the current logged in user has the same id with creator_id 
                  //there is a logged in user here
                  bakery.creator === user.user.user_id ? (
                    <>

                    <h1>{bakery.name}</h1>
                    <h3>{bakery.street}, {bakery.city}</h3>

                    <button
                     className="owner_edit_trigger"
                     data_bs_toggle="modal"
                     data-bs-toggle="modal"
                     data-bs-target="#edit_bakery_details"
                    >
                      <i class="fa-solid fa-pen"></i>
                      &nbsp;&nbsp;&nbsp;
                      Edit Bakery Information
                    </button>

                    <BasicModal
                      title={`Edit Details`}
                      body={<EditBakeryDetails bakery={bakery} reFetch={() => fetchBakeryInformation()}/>}
                      modalId="edit_bakery_details"
                    />
                    </>
                  ) : (
                    <>
                      <h1>{bakery.name}</h1>
                      <h3>{bakery.street}, {bakery.city}</h3>
                    </>
                  )
                )
              }
            </div>
          </div>
        </div>       
        {
          bakery.menu.length === 0 ? (
            //if i own the bakery i want to show begin adding item 

            renderBakeryOwnerShip()
            
          ): (

            //so if there is a user and 
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
                            minWidth: '844'
                          }}
                        >
                          {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}

                          {
                            bakery.creator === user.user.user_id  ? (
                              <>
                              
                              <span
                                className='add_span'
                                data-bs-toggle="modal"
                                data-bs-target="#list_menu_item"
                              >
                                  <i class="fa-solid fa-plus"></i>
                              </span>
                              </>
                            ) : (
                              null
                            )
                          }
                        </h4>
                        
                        <BasicModal
                                title="Add a Menu Item"
                                body={<AddMenuItemForm bakery_id={bakery.id} reFetch={() => fetchBakeryInformation()} />}
                                modalId="list_menu_item"
                              />
                          

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
                            <BakedGood item={item} key={index} bakery={bakery} reFetch={() => fetchBakeryInformation()} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default Bakery;