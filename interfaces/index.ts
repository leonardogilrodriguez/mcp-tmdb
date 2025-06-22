export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; // ISO format: "YYYY-MM-DD"
  first_air_date?: string; // ISO format: "YYYY-MM-DD"
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character?: string; // optional, not all responses include it
  credit_id: string;
  order?: number; // optional
  media_type: string;
  year: string; // release year
  job?: string; // optional, only for crew members
}

export interface MovieSimplified {
    id: number;
    title: string;
    media_type: string;
    year: number;
}

export interface MoviePerson {
    id: number;
    title: string;
    original_title?: string;
    character?: string;
    media_type: string;
    genres: string[];
    job?: string;
    jobs?: string[];
    year: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  known_for_department: string;
  name: string;
  job: string;
}