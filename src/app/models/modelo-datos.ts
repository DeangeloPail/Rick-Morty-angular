export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}

export interface LocationResponse {
  info: Info;
  results: Location[];
}

export interface Episode{
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface EpisodeResponse {
  info: Info;
  results: Episode[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickAndMortyResponse {
  info: Info;
  results: Character[];
}
