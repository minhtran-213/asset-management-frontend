import errorCode from './errorCode.json';

export const convertErrorCode = (key) => {
  return errorCode[key];
};
