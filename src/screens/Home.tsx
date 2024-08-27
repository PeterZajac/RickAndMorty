import { ICharacter, Response } from '../types/ICharacter';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import CharacterTableBody from '../components/table/CharacterTableBody';
import CharacterTableHead from '../components/table/CharacterTableHead';
import LoadMore from '../components/table/LoadMore';

export const Home: React.FC = () => {
  const [tableData, setTableData] = useState<ICharacter[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const { isLoading, error, data } = useQuery<Response>({
    queryKey: ['rickMorty'],
    queryFn: () =>
      fetch('https://rickandmortyapi.com/api/character').then((res) =>
        res.json()
      ),
  });

  useEffect(() => {
    if (data) {
      setTableData(data.results);
    }
  }, [data]);

  const sortData = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const visibleData = tableData.slice(0, visibleCount);

    const sortedData = visibleData.sort((a, b) => {
      if (key === 'origin') {
        if (a.origin.name < b.origin.name) return direction === 'asc' ? -1 : 1;
        if (a.origin.name > b.origin.name) return direction === 'asc' ? 1 : -1;
        return 0;
      } else {
        if (a[key as keyof ICharacter] < b[key as keyof ICharacter]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key as keyof ICharacter] > b[key as keyof ICharacter]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });

    setTableData((prev) => {
      return [...sortedData, ...prev.slice(visibleCount)];
    });
  };

  const getSortIcon = (key: string) => {
    if (key === 'url') return null;
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? (
        <TiArrowSortedUp />
      ) : (
        <TiArrowSortedDown />
      );
    }
    return <TiArrowSortedDown style={{ opacity: 0.5 }} />;
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Status', key: 'status' },
    { name: 'Gender', key: 'gender' },
    { name: 'Species', key: 'species' },
    { name: 'Created', key: 'created' },
    { name: 'Origin', key: 'origin' },
    { name: 'Detail', key: 'url' },
  ];

  return (
    <div className='table-wrapper'>
      <table>
        <CharacterTableHead
          columns={columns}
          sortData={sortData}
          getSortIcon={getSortIcon}
        />

        <CharacterTableBody
          characters={tableData}
          visibleCount={visibleCount}
        />
      </table>
      {visibleCount < tableData.length && (
        <LoadMore handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
