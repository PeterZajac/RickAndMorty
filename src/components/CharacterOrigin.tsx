interface ICharacterOriginProps {
  origin: string;
}

export const CharacterOrigin: React.FC<ICharacterOriginProps> = ({
  origin,
}) => {
  const isUnknown = origin === 'unknown';
  return (
    <span className={isUnknown ? 'character-origin' : ''}>
      {isUnknown && '? '}
      {origin}
    </span>
  );
};
