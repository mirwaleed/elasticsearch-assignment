import elasticClient from './client';

(async () => {
  const result = await elasticClient.search({
    index: 'cars',
    query: { match: { make: 'Acura' } },
  });

  console.log(result.hits.hits);
})();
