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
  const items = [
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '27px',
          justifyContent: 'start',
          maxWidth: '300px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '400',
            fontFamily: 'Oswald , sans-serif',
          }}
        >
          {name}
        </h1>
        <CharacterStatusBadge status={status} />
      </div>
      {items.map((item, index) => (
        <div className={`character-info-div ${index > 0 ? 'm-top-bot18' : ''}`}>
          <img src={item.iconPath} alt={item.text} />
          <span className='character-info-span'>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CharacterInfo;
