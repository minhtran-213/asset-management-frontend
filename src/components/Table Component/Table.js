import React from 'react';
import TableData from './TableData';
import TableHeader from './TableHeader';

const Table = ({ elements, headers, icons, handleOnClick, handleOpenInfo }) => {
  return (
    <div className='pt-4'>
      <table
        style={{ borderSpacing: '1rem 0rem' }}
        className='w-auto border-separate text-left'>
        <thead>
          <tr>
            <TableHeader headers={headers} handleOnClick={handleOnClick} />
          </tr>
        </thead>
        {elements ? (
          <tbody>
            {elements.map((element) => (
              <TableData
                handleOpenInfo={handleOpenInfo}
                key={element[Object.keys(element)[0]]}
                element={element}
                icons={icons}
              />
            ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
      {!elements ? <h1 className='pl-4 pt-3'>There is no data here</h1> : ''}
    </div>
  );
};

export default Table;
