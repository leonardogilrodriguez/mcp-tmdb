import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;

export const buildPersonSearchUrl = (person: string, language: string): string => {
  return `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${person}&language=${language}`;
};

export const buildCombinedCreditsUrl = (personId: number, language: string): string => {
  return `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}&language=${language}`;
}

export const buildMovieGenresUrl = (language: string): string => {
  return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`;
}

export const buildTvGenresUrl = (language: string): string => {
  return `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${language}`;
}

export const buildSearchMoviesUrl = (language: string, query: string, year?: number): string => {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&query=${query}`;
  return year? `${url}&year=${year}`: url;
}

export const buildSearchCrewUrl = (language: string, id: string, mediaType: string): string => {
  return `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=${language}`;
}