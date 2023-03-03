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

`yarn dockerBuild` will build the docker image

`yarn devd` will run a new container on that same image. This is a complex script

```
    "devd": "docker run -p 5000:5000 -v $(pwd):/app -v /app/node_modules -d --name xtsd_template_container xunnux/xtsd_template_image && docker logs -f xtsd_template_container"
```
- it runs the container on port 5000 mapped to container port 5000
- the `-v $(pwd):/app -v /app/node_modules` 
>The -v $(pwd):/app option mounts the current directory into the container, which allows nodemon to watch for changes to your code. The -v /app/node_modules option creates a volume for the node_modules directory so that it is not overwritten by the mounted volume.

- the next few optins are pretty straight forward, setting a name for the container and giving it the image to use. 
- Finally, `&& docker logs -f \<container-name>` just executes another command after the container is running, in order to view the container logs in real time in the same terminal window

>
>**Note:**
> If you get an error when trying to run the container, and the error says something like it can't find the image "and:latest" it might be an issue with a parent directory that has whitespace. This happened to me, and it was frustrating how long it took to figure out that that is what was causing the container to fail (with the -v flags, because without them it worked fine)
>