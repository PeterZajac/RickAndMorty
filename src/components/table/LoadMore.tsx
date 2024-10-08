import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';

interface LoadMoreProps {
  handleLoadMore: () => void;
}
const LoadMore: React.FC<LoadMoreProps> = ({ handleLoadMore }) => {
  return (
    <div className='load-more-wrapper'>
      <div>
        <button className='load-button' onClick={handleLoadMore}>
          <FaArrowDown className='arrow-down-style bg-transparent' />{' '}
          <span className='ls-1 bg-transparent'>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default LoadMore;
