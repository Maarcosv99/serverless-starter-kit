echo "Publish resources and functions on Localstack"
docker compose exec app npx sls deploy --stage local

# Para pular linha
echo

echo "Run tests"
docker compose exec app npm run test:modules