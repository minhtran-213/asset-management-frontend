import React from 'react';

const TableData = ({ element, icons, handleOpenInfo }) => {
  const keys = Object.keys(element);
  return (
    <tr key={element[keys[0]]} className='cursor-pointer'>
      {keys.map((key, index) => (
        <td
          style={{ paddingRight: '3.5rem' }}
          key={index}
          onClick={() => handleOpenInfo(element[keys[0]])}
          className='border-b-2 border-black border-opacity-25 whitespace-nowrap text-left'>
          {element[key]}
        </td>
      ))}
      {icons.map((anIcon) => (
        <td key={anIcon.id}>
          <button
            onClick={() => anIcon.action(element[keys[0]])}
            disabled={element.state && element.state === 'ASSIGNED'}
            className='flex items-center'>
            {anIcon.component}
          </button>
        </td>
      ))}
    </tr>
  );
};

export default TableData;
