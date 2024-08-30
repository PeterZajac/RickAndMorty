import { ICharacter } from './ICharacter';

export interface IColumn {
  name: string;
  key: keyof ICharacter;
}
