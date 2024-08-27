import React from 'react';

import CharacterStatusBadge from '../CharacterStatusBadge';
import { CharacterOrigin } from '../CharacterOrogin';
import { ICharacter } from '../../types/ICharacter';

interface CharacterTableBodyProps {
  characters: ICharacter[];
  visibleCount: number;
}

const CharacterTableBody: React.FC<CharacterTableBodyProps> = ({
  characters,
  visibleCount,
}) => {
  return (
    <tbody>
      {characters.slice(0, visibleCount).map((character) => (
        <tr key={character.id} className='table-row'>
          <td>
            <div>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          </td>
          <td style={{ width: '130px' }}>
            <CharacterStatusBadge status={character.status} />
          </td>
          <td>{character.gender}</td>
          <td>{character.species}</td>
          <td>{new Date(character.created).toLocaleDateString()}</td>
          <td>
            <CharacterOrigin origin={character.origin.name} />
          </td>
          <td>
            <a href={`/${character.id}`}>Link</a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CharacterTableBody;
