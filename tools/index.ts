import {
  getCredits,
  getFilmography,
  getFilmographyActor,
  getFilmographyCrew,
} from "../API/getData";
import { MoviePerson, MovieSimplified, Person } from "../interfaces";
import { groupByMovieId } from "./utils";

export const two_actors_on_screen = async ({
  actor1,
  actor2,
  language = "en",
}: {
  actor1: string;
  actor2: string;
  language?: string;
}) => {
  const filmo1 = await getFilmographyActor({ actor: actor1, language });
  const filmo2 = await getFilmographyActor({ actor: actor2, language });

  return filmo1
    .filter((movie1: MoviePerson) =>
      filmo2.some((movie2: MoviePerson) => movie1.id === movie2.id)
    )
    .reduce((acc: MovieSimplified[], current: MoviePerson) => {
      if (!acc.some((movie) => movie.id === current.id)) {
        acc.push({
          id: current.id,
          title: current.title,
          year: current.year,
          media_type: current.media_type,
        });
      }
      return acc;
    }, []);
};

export const two_people = async ({
  person1,
  job1 = 'crew',
  person2,
  job2 = 'crew',
  language = "en",
}: {
  person1: string;
  job1?: string;
  person2: string;
  job2?: string;
  language?: string;
}) => {
  const filmo1 = job1 === 'crew'? await getFilmographyCrew({ person: person1, language }) : await getFilmographyActor({ actor: person1, language });
  const filmo2 = job2 === 'crew'? await getFilmographyCrew({ person: person2, language }) : await getFilmographyActor({ actor: person2, language });

  return filmo1
    .filter((movie1: MoviePerson) =>
      filmo2.some((movie2: MoviePerson) => movie1.id === movie2.id)
    )
    .reduce((acc: MovieSimplified[], current: MoviePerson) => {
      if (!acc.some((movie) => movie.id === current.id)) {
        acc.push({
          id: current.id,
          title: current.title,
          year: current.year,
          media_type: current.media_type,
        });
      }
      return acc;
    }, []);
};

export const filmography_crew_genre = async ({
  person,
  job,
  language = "en",
  genre,
}: {
  person: string;
  job?: string;
  language?: string;
  genre?: string;
}) => {
  const filmoData = await getFilmographyCrew({ person, job, language, genre });
  return groupByMovieId(filmoData).map((item: MoviePerson) => {
    const { id, original_title, genres, ...rest } = item;
    return { ...rest };
  }).sort((a, b) => a.year - b.year);
};

export const filmography_actor_genre = async ({
  person,
  language = "en",
  genre,
}: {
  person: string;
  job?: string;
  language?: string;
  genre?: string;
}) => {
    const filmoData = await getFilmographyActor({
      actor: person,
      genre,
      language,
    });
    return filmoData.map((item: MoviePerson) => {
      const { id, original_title, genres, ...rest } = item;
      return { ...rest };
    });
};

export const two_movies = async ({
  movie1,
  year1,
  movie2,
  year2,
  language = "en",
}: {
  movie1: string;
  year1?: number;
  movie2: string;
  year2?: number;
  language?: string;
}) => {
  const castAndCrew1 = await getCredits({ movie: movie1, year: year1, language });
  const castAndCrew2 = await getCredits({ movie: movie2, year: year2, language });

  return castAndCrew1
    .filter((person1: Person) =>
      castAndCrew2.some((person2: Person) => person1.id === person2.id)
    )
    .reduce((acc: Person[], current: Person) => {
      if (!acc.some((movie) => movie.id === current.id)) {
        acc.push({
          id: current.id,
          name: current.name,
          job: current.job,
          known_for_department: current.known_for_department
        });
      }
      return acc;
    }, []);
};