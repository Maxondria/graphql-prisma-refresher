## Installation of prisma

Run the following in order;-

Install prisma globally or locally:

`yarn global add prisma`

Create a new prisma project:

`prisma init project_name`

Follow thru the necessary prompts from the terminal.

Then resume to run the following,
If using prisma versions ``1.*.*``, you could choose rename `datamodel.prisma` file to `.graphql` extension if you wish.

Also, update `prisma.yml` to reflect the changes in case you changed the extension

Add a secret in `prisma.yml` to a string of choice

Then run `docker-compose up -d` to pull the prisma docker image in current prisma project directory

Define your schema in `datamodel.prisma`

Run `prisma deploy` to kickstart the prisma app created to get changes and update running container.

In the main project, outside the created prisma project directory then,install `graphql-cli`

-Create your node js project as usual, add a directory, `generated`
-Add a `.graphqlconfig` file, stating the name of your project and endpoint, add **`"prisma"`** property, to `prisma.yml` path, to avoid secret issues
-Run `graphql get-schema -p project-name` to download the schema from the endpoint provided in `.graphqlconfig`
-Install `prisma-binding`, add a file `prisma.js` in your project to be able to config and use prisma in node.js

## Deployment Guide

Note that when we run `prisma deploy`, datamodel is deployed on a running prisma instance(container) on the endpoint provided in `prisma.yml` file.

The container is generated from `docker-compose.yml` which is a collection of two services, prisma and our DB.

- If using prisma-clould, create a server using heroku.

- Create a 2 .env files (`dev.env` and `prod.env`) where we put environment variables

- configure scripts to pick these files and configure `prisma.yml` to point to the current environment endpoint

- configure `.graphqlconfig.yml` to use the same env configuration script to regenerate the schema from data model

- **Production** - Run ```prisma login```, follow thru. If this is a successful step, use the generated URL to access the server and configure the same in `prod.env`