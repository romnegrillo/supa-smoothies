import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

import SmoothieCard from '../components/SmoothieCard';

import supabase from '../services/supabase';

const Home = () => {
  const [smoothies, setSmoothies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.log(error.message);
    }

    if (data) {
      console.log(data);
      const updatedSmoothies = smoothies.filter(
        (smoothie) => smoothie.id !== id
      );
      setSmoothies(updatedSmoothies);
    }
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select();

      if (error) {
        setSmoothies([]);
        setError('Cannot fetch smoothies.');
      }

      if (data) {
        setSmoothies(data);
        setError(null);
        setLoading(false);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {loading && <LoadingSpinner />}

      {error && <p>{error}</p>}

      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDeleteSmoothie={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
