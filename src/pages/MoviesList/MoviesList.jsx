import React, { useEffect, useState, lazy, Suspense } from 'react';
import './MoviesList.css';
import useFetch from '../../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
const Card = lazy(() => import('../../components/Card/Card'));
const CardShimmer = lazy(() => import('../../components/CardShimmer/CardShimmer'));

const MoviesList = ({ apiPath, title }) => {
const [currentPage, setCurrentPage] = useState(1);
const [retryCount, setRetryCount] = useState(0);
const { data: movies, totalPages, loading, error } = useFetch(apiPath, "", currentPage, retryCount);

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
const visiblePages = Array.from({ length: 5 }, (_, i) => currentPage - 2 + i).filter(
    (page) => page >= 1 && page <= totalPages
  );
const handleRetry = () => {
  setRetryCount(prev => prev + 1);
};


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
        {loading ? (
          <Suspense fallback={<div>Loading shimmer...</div>}>
            {[...Array(8)].map((_, index) => (
              <CardShimmer key={index} />
            ))}
          </Suspense>
        ) : error ? (
          <div className="error-container">
            <p className="error-text"> Oops! Couldn't load movies. Please check your internet or try again.</p>
           <button className="retry-button" onClick={handleRetry}> Retry </button>
         </div>
        ) : (
          <Suspense fallback={<div>Loading cards...</div>}>
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </Suspense>
        )}
      </div>

      <div className="container mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>

           {visiblePages.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
            </li>
          ))}
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
