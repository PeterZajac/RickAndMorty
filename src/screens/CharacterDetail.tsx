import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ICharacter } from '../types/ICharacter';
import CharacterImage from '../components/detailPage/CharacterImage';
import CharacterInfo from '../components/detailPage/CharacterInfo';
import CharacterEpisodes from '../components/detailPage/CharacterEpisodes';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episodesData, setEpisodesData] = useState<any[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState<boolean>(true);

  const { isLoading, error, data } = useQuery<ICharacter>({
    queryKey: ['rickMorty'],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
        res.json()
      ),
  });

  useEffect(() => {
    if (!data) return;
    const fetchEpisodes = async () => {
      try {
        const episodes = await Promise.all(
          data.episode.map((episode: string) =>
            fetch(episode).then((res) => res.json())
          )
        );
        setEpisodesData(episodes.map((episode) => episode.name));
        setEpisodesLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEpisodes();
  }, [data]);

  if (isLoading || episodesLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div style={{ display: 'flex' }}>
      <a href='/'>{'<'} Back</a>
      <div style={{ width: '720px', margin: '50px auto' }}>
        <div className='character-detail-container'>
          <CharacterImage data={data} />
          <CharacterInfo
            species={data.species}
            gender={data.gender}
            name={data.name}
            status={data.status}
            origin={data.origin}
            location={data.location}
          />
        </div>
        <CharacterEpisodes episodesData={episodesData} />
      </div>
    </div>
  );
};

export default CharacterDetail;
