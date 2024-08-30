import CharacterStatusBadge from '../CharacterStatusBadge';
import { ICharacter } from '../../types/ICharacter';

type TCharacterInfoProps = Pick<
  ICharacter,
  'species' | 'gender' | 'name' | 'status' | 'origin' | 'location'
>;

const CharacterInfo = ({
  species,
  gender,
  name,
  status,
  origin,
  location,
}: TCharacterInfoProps) => {
  const rows = [
    {
      iconPath: '/images/gender.svg',
      text: gender,
    },
    {
      iconPath: '/images/species.svg',
      text: species,
    },
    {
      iconPath: '/images/origin-name.svg',
      text: origin.name,
    },
    {
      iconPath: '/images/location-name.svg',
      text: location.name,
    },
  ];

  return (
    <div>
      <div className='detail-wrapper'>
        <h1 className='detail-h1'>{name}</h1>
        <CharacterStatusBadge status={status} />
      </div>
      {rows.map((item, index) => (
        <div
          key={item.text}
          className={`character-about ${index > 0 ? 'm-top-bot18' : ''}`}
        >
          <img src={item.iconPath} alt={item.text} />
          <span className='character-info-text'>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CharacterInfo;
