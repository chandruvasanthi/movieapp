import React, { useEffect } from 'react';
import './Search.css';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";

const Search = ({apiPath}) => {
    const [searchParams] = useSearchParams();
    const queryTerm = searchParams.get("q");
    const { data: movies} = useFetch(apiPath, queryTerm);
    useEffect(()=>{
        document.title = `Search result for${queryTerm}`;
    });
  return (
    <div>
      <h5 className='searchh5'>
         {movies.length == 0 ? `No  result  found  for ${ queryTerm}` : `Result  for ${ queryTerm}`}
      </h5>
       {movies.length === 0 ? (
        <div className="imgdiv">
          <img src="/pagenotfound.jpg" alt="Page Not Found" className="not-found-image" />
        </div>
      ) : (
       <div className='cards' >
       { movies.map((movie) =>{
          return  <Card key={movie.id} movie={movie} />;
       })}
      </div>
         )}
          <Link to="/" className="bthbtn"> <span> <IoHomeSharp /> </span></Link>
    </div>
  )
}

export default Search;