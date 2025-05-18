import React from 'react';
import './Card.css';
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = ({movie}) => {

  const {title, id, poster_path, release_date, vote_average} = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : "/picnotfound.png";

  return (
    <div className="card" >
      <Link to={`/movie/${id}`} className='cardlink'>
            <div className="card-container" title={title}>
           <img className="movie-poster" src={image} alt={title} />
           <div className="hover-title">{title}</div>

            <div className="text">
            <h4 className="movie-title">{title.length > 20 ? title.slice(0, 20) + '...' : title}</h4>
            <p className="movie-year">{release_date}</p>
            <p className="movie-rating"> <FaRegStar  className='star'/> {vote_average.toFixed(1)} </p>
        </div>
      </div>
      </Link>
     
    </div>
  );
};

export default Card;
