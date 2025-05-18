import React, { useEffect, useState } from 'react'
import './MovieDetails.css';
import { useParams } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";

const MovieDetails = ({title}) => {
useEffect(()=>{
      document.title = title;
    });
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const key = "c58c0cd7ccadd426a1bdcd63500303ad";
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "/picnotfound.png";
useEffect(()=>{
    async function fetchMovies(){
       fetch(url).then((res) => res.json()).then((jsonData) =>  {setMovie(jsonData); 
      });
    }
    fetchMovies();
 }, []);
 
  return (
    <div>
       <h5 className='movieh5'>Movie Details </h5>
       <div className='movie-details'> 
         <div className="movie-header">
            <img  src={image} alt={movie.title} />
         </div>
      <div className="movie-info">
        <h4  className='movie-title2'>{movie.title}</h4>
         <p className='movie-overview'><strong>Overview :</strong> {movie.overview}</p>
       {movie.genres && (
          <div className="movie-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}><b>{genre.name}</b></span>
            ))}
          </div>
        )}
        <p className="movie-rating"> <FaRegStar className='star' /> {movie.vote_average}</p>
        <p className="movie-rating"> <IoPeople className='star' /> {movie.vote_count} reviews</p>
        <p className="movie-language"><strong>Language:</strong> {movie.original_language?.toUpperCase()}</p>
        <table className="movie-table">
          <tbody>
            <tr>
              <th>Runtime :</th>
             <td> {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`  : 'N/A'} </td>
            </tr>
            <tr>
              <th>Budget :</th>
              <td>₹ {movie.budget}</td>
            </tr>
            <tr>
              <th>Revenue :</th>
              <td>₹ {movie.revenue}</td>
            </tr>
            <tr>
              <th>Release Date :</th>
              <td>{movie.release_date}</td>
            </tr>
          </tbody>
        </table>
        {movie.imdb_id && (
          <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
           <button className='imdbbtn'>View on IMDB</button> 
          </a>
        )}
         <Link to="/" className="bthbtn"> <span> <IoHomeSharp /> </span></Link>
      </div>
    </div>
    </div>

  );
}

export default MovieDetails;
