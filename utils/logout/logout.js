const logout = data => {
    data.then(Response => {
      var pathname = location.hash;
      if (!pathname.startsWith('/'))
        pathname = '/' + pathname;
      if (!pathname.endsWith('/'))
        pathname += '/';
      if (
        pathname != '/login/' &&
        pathname != '/inactive/' &&
        pathname != '/account-locked/'
      ) {
        if (Response.data.data[0] != null && Response.data.data[0].dt == 'exception') {
          if (Response.data.data[0].value.includes('please log in again')) {
            localStorage.setItem('inactive',location.pathname)
              var hostname = location.hostname;
              var protocol = location.protocol;
              var port = location.port != null && location.port.length > 0 ? ':' + location.port : '';
              var location_pathname = location.pathname;
              if (!location_pathname.startsWith('/'))
                location_pathname = '/' + location_pathname;
              if (!location_pathname.endsWith('/'))
                location_pathname += '/';
              var url = `${protocol}//${hostname}${port}${location_pathname}#/login`;
              location.href = url;
          }
        }
      }
    });
  };
  export default logout;
  