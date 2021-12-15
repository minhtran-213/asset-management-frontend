import { DropdownIcon } from '../dropdownarrow';
import React from 'react';

const TableHeader = ({ headers, handleOnClick }) => {
  return (
    <>
      {headers.map((header) => (
        <th className='border-b-2 border-black' key={header.id}>
          <div style={{ width: '100%' }} className='inline-flex'>
            <p style={{ whiteSpace: 'nowrap' }}>{header.name}</p>
            <DropdownIcon handleOnClick={() => handleOnClick(header.id)} />
          </div>
        </th>
      ))}
    </>
  );
};

export default TableHeader;
