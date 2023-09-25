import { useState, useEffect } from 'react';

import SmoothieCard from '../components/SmoothieCard';

import supabase from '../services/supabase';

const Home = () => {
  const [smoothies, setSmoothies] = useState([]);
  const [error, setError] = useState(null);

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
      }
    };

    fetchSmoothies();
  }, []);

  console.log(smoothies);

  return (
    <div className="page home">
      {error && <p>{error}</p>}

      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
