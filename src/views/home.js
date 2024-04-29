import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async () => {
    try {
      let url;
      //Si une recherche est en cours, j'exécute l'URL de recherche de film
      if (searchQuery) {
        //Requête pour rechercher un film
        url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&page=1&query=${searchQuery}`;
      } else {
        //Requête pour afficher les films les plus populaires du moment
        url = 'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1';
      }
      
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTU0MDFjZDBmNjBhYTE4NjBhZTI5YTBlNmIzNGE0NCIsInN1YiI6IjY2MjhlZTc2YTEzNTMzMDE0YjE3YmRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.scyd_6bKnaul8Vz-O_QLmo2m5PGSoitWlVUEXp3voBw'
        }
      };
      
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div>
      <div className="navbar"> {/* Barre de navigation fixe */}
        <h2>Cinemalegaud</h2>
        <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Rechercher un film" 
        />
      </form>
      </div>
      
      <div className='content'>
      
      <div className="movie-list">
      <center>{searchQuery && <h2>Résultats pour {searchQuery}</h2>}
      {searchQuery === '' && <h2>Tendance</h2>}</center>
        {movies.length > 0 && (
          <div className="movie-container">
            {movies.map(movie => (
              <Link to={`/details/${movie.id}`} key={movie.id} className="movie-link">
              <div key={movie.id} className="movie">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Home;
