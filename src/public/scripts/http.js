var Http = (() => {
  // Setup request for json
  var getOptions = (verb, data) => {
    var options = {
      dataType: 'json',
      method: verb,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('elastic' + ':' + 'vFpz6L3McsperLO2dO0WvokN'),
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return options;
  };
  // Set Http methods
  return {
    get: (path, data) => fetch(path, getOptions('GET', data)),
    post: (path, data) => fetch(path, getOptions('POST', data)),
    put: (path, data) => fetch(path, getOptions('PUT', data)),
    delete: (path) => fetch(path, getOptions('DELETE')),
  };
})();
