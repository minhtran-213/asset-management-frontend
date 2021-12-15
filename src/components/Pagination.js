import React from 'react';

const Pagination = ({ totalPage, currentPage, handlePage }) => {
  const items = [];
  for (let i = 0; i < totalPage; i++) {
    items.push(
      <li key={i}>
        <button
          key={i}
          onClick={() => handlePage(i)}
          className={`h-10 px-5 border border-r-0  border-gray-400 ${
            currentPage === i
              ? 'text-white bg-red-600'
              : 'bg-white text-red-600'
          } `}>
          {i + 1}
        </button>
      </li>
    );
  }
  return (
    <ul className='flex justify-end pt-9'>
      <li>
        <button
          disabled={currentPage <= 0}
          onClick={() => {
            currentPage > 0 && handlePage(currentPage - 1);
          }}
          className={`h-10 px-5 text-red-500 bg-white border border-r-0 border-gray-400 rounded-l-md hover:bg-gray-100 ${
            currentPage <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}>
          Previous
        </button>
      </li>
      {items}
      <li>
        <button
          disabled={currentPage >= totalPage - 1}
          onClick={() => {
            currentPage < totalPage - 1 && handlePage(currentPage + 1);
          }}
          className={`h-10 px-5 text-red-500 bg-white border border-gray-400 rounded-r-md hover:bg-gray-100 ${
            currentPage >= totalPage - 1
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
