import React from 'react';

interface IColumn {
  key: string;
  name: string;
}

interface IColumnTableProps {
  columns: IColumn[];
  sortData: (key: string) => void;
  getSortIcon: (key: string) => React.ReactNode;
}
const CharacterTableHead: React.FC<IColumnTableProps> = ({
  columns,
  sortData,
  getSortIcon,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => column.key !== 'url' && sortData(column.key)}
            style={{
              cursor: column.key !== 'url' ? 'pointer' : 'default',
              paddingBottom: '15px',
              paddingLeft: column.key === 'name' ? '10px' : '0px',
            }}
          >
            {column.name} {getSortIcon(column.key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CharacterTableHead;
