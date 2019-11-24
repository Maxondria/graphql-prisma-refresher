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

Then run `docker-compose -d` to pull the prisma docker image.

Run `prisma deploy` to kickstart the prisma app created.

