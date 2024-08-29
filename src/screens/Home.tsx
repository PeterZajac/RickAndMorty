import { ICharacter, Response } from '../types/ICharacter';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
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
    queryKey: ['rickAndMorty'],
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

  const columns = useMemo(
    () => [
      { name: 'Name', key: 'name' },
      { name: 'Status', key: 'status' },
      { name: 'Gender', key: 'gender' },
      { name: 'Species', key: 'species' },
      { name: 'Created', key: 'created' },
      { name: 'Origin', key: 'origin' },
      { name: 'Detail', key: 'url' },
    ],
    []
  );

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
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return tableData.slice(0, visibleCount);

    const visibleData = tableData.slice(0, visibleCount);

    return visibleData.sort((a, b) => {
      if (sortConfig.key === 'origin') {
        if (a.origin.name < b.origin.name)
          return sortConfig.direction === 'asc' ? -1 : 1;
        if (a.origin.name > b.origin.name)
          return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      } else {
        if (
          a[sortConfig.key as keyof ICharacter] <
          b[sortConfig.key as keyof ICharacter]
        ) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof ICharacter] >
          b[sortConfig.key as keyof ICharacter]
        ) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
  }, [tableData, sortConfig, visibleCount]);

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

  return (
    <div className='table-wrapper '>
      <table>
        <CharacterTableHead
          columns={columns}
          sortData={sortData}
          getSortIcon={getSortIcon}
        />

        <CharacterTableBody
          characters={sortedData}
          visibleCount={visibleCount}
        />
      </table>
      {visibleCount < tableData.length && (
        <LoadMore handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
