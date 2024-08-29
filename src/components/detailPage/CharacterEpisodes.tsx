const CharacterEpisodes = ({ episodesData }: { episodesData: string[] }) => {
  return (
    <div>
      <div className='character-episodes-info'>
        <h3 className='character-episodes-h3'>
          Episodes{' '}
          <span className='character-episodes-span'>{episodesData.length}</span>
        </h3>
      </div>
      <div className='character-episodes-names '>
        {' '}
        {episodesData.join(', ')}
      </div>
    </div>
  );
};

export default CharacterEpisodes;
