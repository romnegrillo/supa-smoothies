import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import supabase from '../services/supabase';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        navigate('/', { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchSmoothie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setError('All fields are required!');
      return;
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update([{ title, method, rating }])
      .eq('id', id)
      .select();

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

        <button type="submit">Edit Smoothie</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Update;
