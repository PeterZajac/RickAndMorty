import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';

interface LoadMoreProps {
  handleLoadMore: () => void;
}
const LoadMore: React.FC<LoadMoreProps> = ({ handleLoadMore }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px auto',
      }}
    >
      <div>
        <button className='load-button' onClick={handleLoadMore}>
          <FaArrowDown
            style={{
              marginRight: '8px',
              width: '20px',
              height: '18px',
              fontWeight: '400',
              fontSize: '4px',
            }}
          />{' '}
          <span style={{ letterSpacing: '1px' }}>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default LoadMore;
