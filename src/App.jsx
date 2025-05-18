import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MoviesList from './pages/MoviesList/MoviesList';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Search from './pages/Search/Search';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MoviesList apiPath="movie/now_playing"  title="Movie App"/>} />
          <Route path="movie/:id" element={<MovieDetails   title="Movie Details"/>} />
          <Route path="/search" element={<Search apiPath="search/movie" />} />
          <Route path="movies/top" element={<MoviesList key="top" apiPath="movie/top_rated"  title="Top Rated Movies"/>} />
          <Route path="movies/upcoming" element={<MoviesList key="upcoming" apiPath="movie/upcoming" title="Upcoming Movies"/>} />
          <Route path="movies/popular" element={<MoviesList key="popular" apiPath="movie/popular" title="Popular Movies"/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
