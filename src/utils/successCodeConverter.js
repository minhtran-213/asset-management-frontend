import successCode from './successCode.json';

export const convertSuccessCode = (key) => {
  return successCode[key];
};
