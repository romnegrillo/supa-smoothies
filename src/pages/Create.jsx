import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../services/supabase';

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setError('All fields are required!');
      return;
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title, method, rating }])
      .select();

    console.log(data);

    if (error) {
      setError(error.message);
    }

    if (data) {
      setError(null);
      navigate('/');
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method</label>
        <input
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          min={1}
          max={10}
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Add Smoothie</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Create;
