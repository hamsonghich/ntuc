import requestUpload from '../utils/customAxios/requestUpload';
import checkLogout from '../utils/logout/checkLogout'

const postAxiosUpload = (data) => {
  const dataCheck = requestUpload({
    url: '/fileupload',
    method: 'POST',
    data,
  })
  checkLogout(dataCheck)
  return dataCheck
}

export { postAxiosUpload }