import { Genre, Movie, MoviePerson, Person } from "../interfaces";
import {
  buildCombinedCreditsUrl,
  buildMovieGenresUrl,
  buildPersonSearchUrl,
  buildSearchCrewUrl,
  buildSearchMoviesUrl,
  buildTvGenresUrl,
} from "./urls";

const APIFetch = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const getGenres = async (language: string = "en"): Promise<Genre[]> => {
  const URL_MOVIE_GENRES = buildMovieGenresUrl(language);
  const URL_TV_GENRES = buildTvGenresUrl(language);
  const [movie_genres, tv_genres] = await Promise.all([
    APIFetch(URL_MOVIE_GENRES),
    APIFetch(URL_TV_GENRES),
  ]);

  return [...movie_genres.genres, ...tv_genres.genres];
};

const genres: Genre[] = await getGenres("en");
const genresDictionary: Record<string, Genre[]> = {
  en: genres,
};

const mainInfo = (item: Movie, language: string): MoviePerson => ({
  id: item.id,
  title: item.title || item.name,
  original_title: item.original_title || item.original_name,
  character: item.character,
  media_type: item.media_type,
  genres: translateGenres(item.genre_ids, language),
  job: item.job,
  year: getYear(item),
});

export const getFilmography = async ({
  person,
  type,
  language = "en",
}: {
  person: string;
  type?: string;
  language: string;
}): Promise<MoviePerson[]> => {
  if (!genresDictionary[language]) {
    const genres = await getGenres(language);
    genresDictionary[language] = genres;
  }

  const PERSON_SEARCH_URL = buildPersonSearchUrl(person, language);
  const dataPerson = await APIFetch(PERSON_SEARCH_URL);
  const personId = (type === 'cast') 
  ? dataPerson.results.find((person: Person) => person.known_for_department === 'Acting')?.id
  : dataPerson.results[0].id;
  if (!personId)  return [];
  const COMBINED_URL = buildCombinedCreditsUrl(personId, language);
  const rawData = await APIFetch(COMBINED_URL);
  const filmography = type ? rawData[type] : [...rawData.cast, ...rawData.crew];
  return filmography
    ?.map((item: Movie) => mainInfo(item, language))
    .sort((a: MoviePerson, b: MoviePerson) => a.year - b.year);
};

export const getFilmographyActor = async ({
  actor,
  genre,
  language = "en",
}: {
  actor: string;
  genre?: string;
  language?: string;
}): Promise<MoviePerson[]> => {
  const data = await getFilmography({ person: actor, type: "cast", language });

  return genre
    ? data?.filter((item: MoviePerson) =>
        (item.genres || []).some(
          (g: string) => g.toLowerCase() === genre.toLowerCase()
        )
      )
    : data;
};

export const getFilmographyCrew = async ({
  person,
  job,
  genre,
  language = "en",
}: {
  person: string;
  job?: string;
  genre?: string;
  language?: string;
}): Promise<MoviePerson[]> => {
  const data = await getFilmography({ person, type: "crew", language });

  let filteredResult = job
    ? data?.filter((item: MoviePerson) => item.job === job)
    : data;

  filteredResult = genre
    ? filteredResult?.filter((item: MoviePerson) =>
        (item.genres || []).some(
          (g: string) => g.toLowerCase() === genre.toLowerCase()
        )
      )
    : filteredResult;

  return filteredResult;
};

const translateGenres = (
  genreIds: number[],
  language: string = "en"
): string[] => {
  if (genreIds.length === 0) return [];
  const translatedGenres = genresDictionary[language];
  return genreIds.map((id) => {
    return translatedGenres.find((genre) => genre.id === id)?.name || "";
  });
};

const getYear = (item: Movie): number => {
  let date = item.release_date
    ? item.release_date
    : item.first_air_date
    ? item.first_air_date
    : "";
  return date !== "" ? new Date(date).getFullYear() : 9999;
};

export const getCredits = async ({
  movie,
  language = "en",
  year
}: {
  movie: string;
  language?: string;
  year?: number;
}): Promise<Person[]> => {
  const movieQuery = encodeURIComponent(movie).replace(/%20/g, '+');
  const MOVIE_SEARCH_URL = buildSearchMoviesUrl(language, movieQuery, year);
 
  const dataMovie = await APIFetch(MOVIE_SEARCH_URL);
  if (!dataMovie.results || dataMovie.results.length === 0) {
    return [];
  };

  const movieId = dataMovie.results[0].id;
  const MOVIE_CREW_URL = buildSearchCrewUrl(language, movieId, 'movie');
  const dataCrew = await APIFetch(MOVIE_CREW_URL);
  return dataCrew.cast.concat(dataCrew.crew);
};