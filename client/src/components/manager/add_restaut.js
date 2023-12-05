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
      formData.append('lat', lat);
      formData.append('long', long);
      formData.append('categoryId', categoryId);

      if (file) {
        const base64 = await convertToBase64(file);
        formData.append('photo', base64);

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
      }
    } catch (error) {
      console.error('Error adding restaurant:', error.response.data);
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
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="lat" className="form-label">Latitude:</label>
        <input type="number" className="form-control" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="long" className="form-label">Longitude:</label>
        <input type="number" className="form-control" id="long" value={long} onChange={(e) => setLong(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId" className="form-label">Category:</label>
        <input type="text" className="form-control" id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">Photo:</label>
        <input type="file" className="form-control" id="photo" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <button type="submit" className="btn btn-primary">Add Restaurant</button>
    </form>
    </div>
    </div>
    </div>
  );
};

export default AddRestaurantForm;
