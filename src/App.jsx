import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const MoviesList = lazy(() => import('./pages/MoviesList/MoviesList'));
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));
const Search = lazy(() => import('./pages/Search/Search'));

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-content">
        <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MoviesList apiPath="movie/now_playing"  title="Movie App"/>} />
          <Route path="movie/:id" element={<MovieDetails   title="Movie Details"/>} />
          <Route path="/search" element={<Search apiPath="search/movie" />} />
          <Route path="movies/top" element={<MoviesList key="top" apiPath="movie/top_rated"  title="Top Rated Movies"/>} />
          <Route path="movies/upcoming" element={<MoviesList key="upcoming" apiPath="movie/upcoming" title="Upcoming Movies"/>} />
          <Route path="movies/popular" element={<MoviesList key="popular" apiPath="movie/popular" title="Popular Movies"/>} />
        </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
