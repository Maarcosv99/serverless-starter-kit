clear

echo "Run unity tests:";
npm run test:unity;

echo;

echo "Deploy service";
docker compose exec app npx sls deploy --stage local;

echo;

echo "Run integration tests:";
docker compose exec app npm run test:integration;

echo;

echo "Run end-to-end tests:"
docker compose exec app npm run test:e2e;
