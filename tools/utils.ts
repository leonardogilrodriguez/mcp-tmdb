import { MoviePerson } from "../interfaces";

export const groupByMovieId = (credits: MoviePerson[]): MoviePerson[] => {
  return Object.values(
    credits.reduce((acc: Record<number, MoviePerson>, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          id: item.id,
          title: item.title,
          media_type: item.media_type,
          year: item.year,
          jobs: [item.job || ''],
          character: item.character || undefined,
          genres: item.genres || [],
        };
      } else {
        acc[item.id].jobs?.push(item.job || '');
      }
      return acc;
    }, {})
  );
}