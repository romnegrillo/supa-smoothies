import { Link } from 'react-router-dom';

const SmoothieCard = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={`/update/${smoothie.id}`}>
          <span className="material-symbols-outlined">edit</span>
        </Link>
      </div>
    </div>
  );
};

export default SmoothieCard;
