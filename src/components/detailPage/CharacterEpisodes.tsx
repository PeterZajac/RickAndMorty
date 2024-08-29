const CharacterEpisodes = ({ episodesData }: { episodesData: string[] }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '28px',
        }}
      >
        <h3
          style={{
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'Montserrat , sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          Episodes{' '}
          <span
            style={{
              backgroundColor: '#0D8CD2',
              color: 'white',
              borderRadius: '5px',
              fontSize: '11px',
              width: '23px',
              height: '23px',
              display: 'inline-block',
              textAlign: 'center',
              lineHeight: '23px',
            }}
          >
            {episodesData.length}
          </span>
        </h3>
      </div>
      <div
        style={{
          fontSize: '14px',
          fontWeight: '400',
          fontFamily: 'Montserrat , sans-serif',
          width: '611px',
          marginTop: '12px',
        }}
      >
        {' '}
        {episodesData.join(', ')}
      </div>
    </div>
  );
};

export default CharacterEpisodes;
