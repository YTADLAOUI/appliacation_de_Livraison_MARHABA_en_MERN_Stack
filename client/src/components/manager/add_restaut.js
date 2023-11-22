import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('lat', lat)
      formData.append('long', long)
      formData.append('categoryId', categoryId);
      formData.append('photo', file);

      const response = await axios.post('http://localhost:1111/api/restaut/restaurants', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Restaurant added:', response.data);

      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setLat('');
      setLong('');
      setCategoryId('');
      setFile(null);
    } catch (error) {
        console.error('Error adding restaurant:', error.response.data);

    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Latitude:</label>
        <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} required />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="number" value={long} onChange={(e) => setLong(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </div>
      <div>
        <label>Photo:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurantForm;
