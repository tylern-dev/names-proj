### Resources

[Log Rocket building-a-graphql-server-in-next-js ](https://www.preciouschicken.com/blog/posts/vercel-apollo-server-react/)

[Stacking Vercel, a GraphQL Apollo Server and React ](https://blog.logrocket.com/building-a-graphql-server-in-next-js/)

[Theme Colors](https://flatuicolors.com/palette/de)

[Docker Postgres Setup](https://towardsdatascience.com/local-development-set-up-of-postgresql-with-docker-c022632f13ea)

[postgres user and DB setup](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)

#### Webpack

[Webpack](https://binyamin.medium.com/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334)

---

## Docker Setup Notes

`docker pull postgres`

check the image -- `docker images`

## 1. Create a folder in a known location for you

`mkdir ${HOME}/postgres-data/`

## 2. run the postgres image

` docker run -d \ --name dev-postgres \ -e POSTGRES_PASSWORD=Pass2020! \ -v ${HOME}/postgres-data/:/var/lib/postgresql/data \ -p 5432:5432 postgres`

## 3. check that the container is running

`docker ps`

Great, you have a running PostgreSQL instance and you should be able to enter the container from your command line and test the database instance:

`docker exec -it dev-postgres bash`

Now you are in the container's bash console. Connect to the database
`root@dfa570d6e843:/# psql -h localhost -U postgres`
