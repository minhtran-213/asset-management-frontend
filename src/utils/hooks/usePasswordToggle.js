import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const ToggleIcon = visible ? (
    <FaEyeSlash
      onClick={() => setVisible(!visible)}
      style={{ marginLeft: '-29px' }}
    />
  ) : (
    <FaEye
      onClick={() => setVisible(!visible)}
      style={{ marginLeft: '-29px' }}
    />
  );

  const InputType = visible ? 'text' : 'password';
  return [InputType, ToggleIcon];
};

export default usePasswordToggle;
