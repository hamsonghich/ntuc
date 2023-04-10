import request from '../utils/customAxios/request';
import checkLogout from '../utils/logout/checkLogout';

const postAxios = params => {
  const data = request({
    url: '/servlet/ProcessJSON2',
    method: 'POST',
    data: params,
    headers: { 'content-type': 'application/json' }
  });
  checkLogout(data);
  return data;
};

const getAxios = url => {
  const data = request({
    url,
    method: 'GET'
  });
  checkLogout(data);
  return data;
};

export { postAxios, getAxios };
