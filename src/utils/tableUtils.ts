import { ICharacter } from '../types/ICharacter';
import { ESorting } from '../types/Sorting';

export const sortTableData =
  (sortConfig: any) => (a: ICharacter, b: ICharacter) => {
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
