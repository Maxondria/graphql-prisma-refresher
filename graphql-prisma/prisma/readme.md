## Installation of prisma

Run the following in order;-

Install prisma globally:

`yarn global add prisma`

Create a new prisma project:

`prisma init project_name`

Follow thru the necessary prompts from the terminal.

Then resume to run the following,
If using prisma versions ``1.*.*``, you could choose rename `datamodel.prisma` file to `.graphql` extension if you wish.

Also, update `prisma.yml` to reflect the changes.

Then run `docker-compose -d` to pull the prisma docker image in current prisma project directory

Define your schema in `datamodel.prisma`

Run `prisma deploy` to kickstart the prisma app created.

In the main project, then,install `graphql-cli`

-Create your node js project as usual, add a directory, `generated`
-Add a `.graphqlconfig` file, stating the name of your project and schema name
-Run `graphql get-schema -p project-name` to generated schema from `datamodel.prisma`
-Install `prisma-binding`, add a file `prisma.js` in your project to be able to config and use prisma in node.js