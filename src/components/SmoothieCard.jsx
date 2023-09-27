import { Link } from 'react-router-dom';

import supabase from '../services/supabase';

const SmoothieCard = ({ smoothie, onDeleteSmoothie }) => {
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={`/update/${smoothie.id}`}>
          <span className="material-symbols-outlined">edit</span>
        </Link>

        <span
          className="material-symbols-outlined delete-button"
          onClick={() => onDeleteSmoothie(smoothie.id)}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default SmoothieCard;
