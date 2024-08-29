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

  const arrowBackIcon = (
    <svg
      width='17'
      height='13'
      viewBox='0 0 17 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='back-icon'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0.292893 6.94975C-0.0976312 6.55922 -0.097631 5.92606 0.292893 5.53553L5.53553 0.292893C5.92606 -0.0976313 6.55922 -0.097631 6.94975 0.292893C7.34027 0.683418 7.34027 1.31658 6.94975 1.70711L3.41421 5.24264H15.2425C15.7948 5.24264 16.2425 5.69036 16.2425 6.24264C16.2425 6.79493 15.7948 7.24264 15.2425 7.24264H3.41421L6.94975 10.7782C7.34027 11.1687 7.34027 11.8019 6.94975 12.1924C6.55922 12.5829 5.92606 12.5829 5.53553 12.1924L0.292893 6.94975Z'
        fill='white'
      />
    </svg>
  );

  const { isLoading, error, data } = useQuery<ICharacter>({
    queryKey: ['rickAndMorty'],
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
    <div className='flex-container'>
      <div className='character-detail-container'>
        <a href='/' className='back-button'>
          {arrowBackIcon}
          <span className='p-left-10'>Back</span>
        </a>
        <div className='character-detail'>
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
