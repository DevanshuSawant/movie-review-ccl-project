// MovieReview.js
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const MovieReview = ({ title, director, year, imgLink }) => {
  return (
    <div className="movie-review">
      <h2>{title}</h2>
      <img src={imgLink} alt={title} height='200px' />
      <p>Director: {director}</p>
      <p>Release Year: {year}</p>
      <button><Link to={`/movies/${title}`}>See Reviews</Link></button>
    </div>
  );
};

export default MovieReview;
