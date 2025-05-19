import React, { useEffect, useState } from 'react';
import './MoviesList.css';
import Card from '../../components/Card/Card';
import useFetch from '../../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import CardShimmer from '../../components/CardShimmer/CardShimmer';

const MoviesList = ({ apiPath, title }) => {
const [currentPage, setCurrentPage] = useState(1);
const { data: movies, totalPages, loading, error } = useFetch(apiPath, "", currentPage);

 useEffect(() => {
    document.title = title;
  }, [title]);


const handlePageChange = (page) => {
  if (page !== currentPage && page >= 1 && page <= totalPages) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const location = useLocation();
const showHomeBtn = location.pathname !== '/';

  return (
    <div className='movie-list'>
       <div className='maincarousel'>
            <div id="demo" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
         <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
         </div>
         <div className="carousel-inner">
            <div className="carousel-item active">
           <img  src="https://i.ibb.co/VpxpH7mw/carouselimg3.jpg" className="d-block" />
           <div className="carousel-caption">
             <h3>Your Ultimate Movie Destination</h3>
             <p>Discover the world of cinema like never before. </p>
           </div>
            </div>
            <div className="carousel-item">
                <img  src="https://i.ibb.co/HLD0j9zK/lens-1418954.webp" className="d-block" />
                <div className="carousel-caption">
                    <h3>Dive into Cinematic Worlds</h3>
                    <p>Explore and enjoy handpicked favorite movies in one place.</p>
                  </div>
             </div>
             <div className="carousel-item">
                <img  src="https://i.ibb.co/Gvt2CXGH/27cb79007c1c8742b34dde8e534a43eb.jpg" className="d-block" />
                <div className="carousel-caption">
                    <h3>Watch Anytime, Anywhere</h3>
                    <p>Your favorite new and old titles, anytime, anywhere.</p>
                  </div>
             </div>
         </div>

    </div>  

    </div>
      <p className='watchlistp'>Your Watchlist Begins Here. . .</p>
      <div className='watchlistbr'></div>
      
      <div className='cards'>
        {/* {loading && <p className="loading-text">Loading movies...</p>} */}
        {loading && (
          <>
            {[...Array(8)].map((_, index) => (
             <CardShimmer key={index} />
            ))}
         </>
         )}


        {error && <p className="error-text">Error: {error}</p>}
        {!loading && !error && movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
        ))}
     </div>

      <div className="container mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>

          {[...Array(5)].map((_, i) => {
            const page = currentPage - 2 + i;
            if (page < 1 || page > totalPages) return null;
            return (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
              </li>
            );
          })}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </div>
    {showHomeBtn && (
        <Link to="/" className="bthbtn"> <span><IoHomeSharp /></span>  </Link>
      )}
    </div>
  );
};

export default MoviesList;
