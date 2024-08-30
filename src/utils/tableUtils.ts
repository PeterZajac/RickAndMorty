import { ICharacter } from '../types/ICharacter';
import { ESorting } from '../types/Sorting';

interface SortConfig {
  key: keyof ICharacter;
  direction: ESorting;
}

export const sortTableData =
  (sortConfig: SortConfig) => (a: ICharacter, b: ICharacter) => {
    if (sortConfig.key === 'origin') {
      if (a.origin.name < b.origin.name)
        return sortConfig.direction === ESorting.Ascending ? -1 : 1;
      if (a.origin.name > b.origin.name)
        return sortConfig.direction === ESorting.Ascending ? 1 : -1;
      return 0;
    } else {
      if (
        a[sortConfig.key as keyof ICharacter] <
        b[sortConfig.key as keyof ICharacter]
      ) {
        return sortConfig.direction === ESorting.Ascending ? -1 : 1;
      }
      if (
        a[sortConfig.key as keyof ICharacter] >
        b[sortConfig.key as keyof ICharacter]
      ) {
        return sortConfig.direction === ESorting.Ascending ? 1 : -1;
      }
      return 0;
    }
  };
