interface ICharacterOriginProps {
  origin: string;
}

export const CharacterOrigin: React.FC<ICharacterOriginProps> = ({
  origin,
}) => {
  if (origin === 'unknown') {
    return (
      <span
        style={{
          backgroundColor: 'gray',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          textTransform: 'capitalize',
        }}
      >
        {' '}
        ? {origin}
      </span>
    );
  }
  return <span>{origin}</span>;
};
