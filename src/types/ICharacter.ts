export const enum EStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'Unknown',
}

export const enum EGender {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  Unknown = 'unknown',
}

export interface ICharacter {
  id: number;
  name: string;
  status: EStatus;
  species: string;
  type: string;
  gender: EGender;
  created: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string
    };  
  url: string;
  episode: string[];
}

export interface Response {
  results: ICharacter[];
}
