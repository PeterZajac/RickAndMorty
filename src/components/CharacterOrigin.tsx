interface ICharacterOriginProps {
  origin: string;
}

export const CharacterOrigin: React.FC<ICharacterOriginProps> = ({
  origin,
}) => {
  if (origin === 'unknown') {
    return <span className='character-origin'> ? {origin}</span>;
  }
  return <span>{origin}</span>;
};
