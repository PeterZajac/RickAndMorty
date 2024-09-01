import React from 'react';

import CharacterStatusBadge from '../CharacterStatusBadge';
import { CharacterOrigin } from '../CharacterOrigin';
import { ICharacter } from '../../types/ICharacter';

interface CharacterTableBodyProps {
  characters: ICharacter[];
}

const CharacterTableBody: React.FC<CharacterTableBodyProps> = ({
  characters,
}) => {
  return (
    <tbody>
      {characters.map((character) => (
        <tr key={character.id}>
          <td>
            <div>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          </td>
          <td className='w-130'>
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
