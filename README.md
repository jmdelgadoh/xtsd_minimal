## My Express App with Typescript and Docker boilerplate

This is a very barebones setup that I like of an express server with the following bare features:
- node 18 image
- it uses absolute paths! more on how that works below
- built with typescript
- not connected to any DB and no endpoints or controllers yet, very barebones.
- uses a Dockerfile

This is mostly for my own usage but if anyone lands here and you find it helpful well glad to hear it!



### SCRIPTS
The `package.json` comes with some useful scripts, here is some descriptions

><mark>**If you are not me:** please change any docker specific username in the scripts

To build the docker image from the Dockerfile.

- `yarn buildDockerImage`

To run the image just run `yarn devd`

>
>The dev environment gets run with the following script
>

```
"dev": "NODE_ENV=dev ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/app.ts"
```

Let's break it down
- First we establish env varibale NODE_ENV=dev mostly for redundancy 
- we used `ts-node-dev` command, which is one of our dependencies
	- `ts-node-dev` is a superset of `ts-node` and `node-dev` with some optimizations to make it faster. But all `ts-node` and `node-dev` options are applicable. Info here [ts-node docs](https://github.com/TypeStrong/ts-node) and here [node-dev](https://github.com/fgnass/node-dev)

	- `-r tsconfig-paths/register` we have another package called `tsconfig-paths` which uses the tsconfig baseUrl to allow us to use absolute paths
[label](https://open.spotify.com/track/5qkWxDtIdQuDzzfuK0oI9e)
	- `--respawn`: Keep watching for changes after the script has exited

**THE JUICY SCRIPTS**

`yarn dockerBuild` will build the docker image -> you don't need this in this version of the starter

>`yarn devd` - this is also deprecated now, since the docker-compose command will build and start the container. The docker-compose file itself calls the `dev` command and watches for changes. The volumes is now defined in the compose file rather than the `devd`` command

<br>

------------
<br>

## PostgreSQL Notes

Postgres is running in a separate docker container, using an official standard postgres image. The `docker-compose.yml` file contains the configuration for the database. Inspect it and change elements like the database username, password and dbname. Make sure to keep track of those changes and make them accordingly across the multiple services in the docker-compose file.

>### Inspecting the DB with CLI
><br>
> Since we are running the db server on a container I'm not sure if we can inspect the db with some db browsing tool (maybe it is...)
>
>But I know we can run `psql` from the terminal within the container in order to browser it manually and manipulate it directly with the *CLI*
>
> The general command you need looks like this ` psql -h <ip_address_of_container> -p <port> -U "user" -d dbname`
>
>To find the ip address of the container, you can inspect the container `docker inspect <container_name_or_id>`
> It will be in network settings -> HostIp
>
>In my specific case it looks like this ` psql -h 0.0.0.0 -p 5432 -U "myuser" -d mydb`
