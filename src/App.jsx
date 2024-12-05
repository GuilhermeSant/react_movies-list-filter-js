/* eslint-disable function-paren-newline */
import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getFilteredMovies(movies, { query }) {
  let filteredMovies = [...movies];

  const cleanedQuery = query.trim().toLowerCase();

  if (!cleanedQuery) {
    return movies;
  }

  if (query) {
    filteredMovies = filteredMovies.filter(
      movie =>
        (movie.title && movie.title.toLowerCase().includes(cleanedQuery)) ||
        (movie.description &&
          movie.description
            .toLowerCase()
            .replace(' ', '')
            .includes(cleanedQuery)),
    );
  }

  return filteredMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');

  const visibleMovies = getFilteredMovies(moviesFromServer, { query });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={event => {
                  setQuery(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
