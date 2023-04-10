import axios from 'axios'

const hostname = window.location.hostname;
const isDeploymentSites = (hostname.endsWith('bixflexi.sg')
  || hostname.endsWith('benefitsolutions.com.sg'));
if (isDeploymentSites) {
  const protocol = window.location.protocol;
  const clientName = window.location.pathname.split('/',2)[1];
  axios.get(`${protocol}//${hostname}/${clientName}/empty.txt`)
    .then(response => {
      var responseURL = response.request.responseURL;
      var newClientName = responseURL.split('/', 4)[3];
      if (newClientName != clientName) {
        var splittedURL = window.location.href.split('/');
        splittedURL[3] = newClientName;
        window.location.href = splittedURL.join('/');
      }
    })
    .catch(error => {
      var responseURL = error.response.request.responseURL;
      var newClientName = responseURL.split('/', 4)[3];
      if (newClientName != clientName) {
        var splittedURL = window.location.href.split('/');
        splittedURL[3] = newClientName;
        window.location.href = splittedURL.join('/');
      }
    });
}