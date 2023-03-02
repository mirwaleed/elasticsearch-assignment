import esClient from './client';

esClient
  .ping({}, { requestTimeout: 30000 })
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
