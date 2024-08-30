import { ICharacter, Response } from '../types/ICharacter';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import CharacterTableBody from '../components/table/CharacterTableBody';
import CharacterTableHead from '../components/table/CharacterTableHead';
import LoadMore from '../components/table/LoadMore';
import { ESorting } from '../types/Sorting';
import { IColumn } from '../types/Table';
import { sortTableData } from '../utils/tableUtils';

const VISIBILITY_COUNT = 5;

export const Home: React.FC = () => {
  const [tableData, setTableData] = useState<ICharacter[]>([]);
  const [visibleCount, setVisibleCount] = useState(VISIBILITY_COUNT);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ICharacter;
    direction: ESorting;
  } | null>(null);

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

  const columns: IColumn[] = useMemo(
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

  const sortData = (key: keyof ICharacter) => {
    let direction: ESorting = ESorting.Ascending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === ESorting.Ascending
    ) {
      direction = ESorting.Descending;
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return tableData.slice(0, visibleCount);

    const visibleData = tableData.slice(0, visibleCount);
    return visibleData.sort(sortTableData(sortConfig));
  }, [tableData, sortConfig, visibleCount]);

  const getSortIcon = (key: string) => {
    if (key === 'url') return null;
    if (sortConfig?.key === key) {
      return sortConfig.direction === ESorting.Ascending ? (
        <TiArrowSortedUp />
      ) : (
        <TiArrowSortedDown />
      );
    }
    return <TiArrowSortedDown style={{ opacity: 0.5 }} />;
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + VISIBILITY_COUNT);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='table-wrapper'>
      <table>
        <CharacterTableHead
          columns={columns}
          sortData={sortData}
          getSortIcon={getSortIcon}
        />
        <CharacterTableBody characters={sortedData.slice(0, visibleCount)} />
      </table>
      {visibleCount < tableData.length && (
        <LoadMore handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
