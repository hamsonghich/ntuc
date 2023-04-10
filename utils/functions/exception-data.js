import { TITLE, CONTENT } from '../constants/exception';
export const handleGetTitle = params => {
  return handleGetData(TITLE, params);
};
export const handleGetContent = params => {
  return handleGetData(CONTENT, params);
};
const handleGetData = (request, payload = 400) => {
  //default if server error of undefined
  let data;
  for (const value of Object.keys(request)) {
    if (value.includes(String(payload))) {
      data = request[value];
      break;
    }
  }
  return data;
};
