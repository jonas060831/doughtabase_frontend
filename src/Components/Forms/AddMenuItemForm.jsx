import React, { useEffect, useState } from 'react';
import './AddBakeryForm.css';
import { addNewItem } from '../../services/menuItemServices';

const AddMenuItemForm = ({ bakery_id, reFetch, category }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });

  const categories = [
    'breads', 'pastries', 'cakes', 'cookies', 'muffins', 
    'scones', 'pies', 'rolls', 'doughs', 'snacks', 
    'gluten-free', 'vegans',
  ];

  useEffect(() => {
    console.log(category)
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFormData = {
      ...formData,
      rating: 5.0,
      bakery_id: bakery_id,
    };
    setFormData({
        name: '',
        price: '',
        category: '',
      })
    await addNewItem(updatedFormData);
    reFetch()
  };

  return (
    <div className='add-bakery-div'>
      <form className='add-bakery-form' onSubmit={handleSubmit}>
        {/* Category Input */}
        <label htmlFor="category">Choose a category:</label>
        <input
          list="categories"
          id="category"
          name="category"
          placeholder="Start typing..."
          value={formData.category}
          onChange={handleChange}
        />
        <datalist id="categories">
          {categories.map((category, index) => (
            <option key={index} value={category} />
          ))}
        </datalist>

        {/* Name Input */}
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          className="name"
          name="name"
          id="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Price Input */}
        <label htmlFor="price">Item Price:</label>
        <input
          type="text"
          className="price"
          name="price"
          id="price"
          autoComplete="off"
          value={formData.price}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <input type="submit" className="submit" data-bs-dismiss="modal" />
      </form>
    </div>
  );
};

export default AddMenuItemForm;
