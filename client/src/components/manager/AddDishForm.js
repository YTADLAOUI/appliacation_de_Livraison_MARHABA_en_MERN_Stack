import React, { useState } from 'react';
import axios from 'axios';

const AddDishForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const base64 = await convertToBase64(file);

        let formData = {
          name: name,
          description: description,
          price: price,
          restaurantId: restaurantId,
          photo: base64,
        };

        const response = await axios.post('http://localhost:1111/api/restaut/dishes', formData);

        console.log('Dish added:', response.data);

        // Reset form fields after successful submission
        setName('');
        setDescription('');
        setPrice('');
        setRestaurantId('');
        setFile(null);
      }
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="restaurantId" className="form-label">
                Restaurant ID:
              </label>
              <input type="text" className="form-control" id="restaurantId" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo:
              </label>
              <input type="file" className="form-control" id="photo" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Dish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDishForm
