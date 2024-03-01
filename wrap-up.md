## Questions

### Please provide instructions on how to run your project in a bulleted list below.

## Setup Instructions

1. **Download GitHub Repo**:
   Download the GitHub repository from [here](https://github.com/tejedamiguel6/code_challenge/tree/main).

2. **Install Dependencies**:
   Run `npm install` in your terminal to install project dependencies.

3. **Create Environment Files**:

   - Create a `.env` file and a `.env.development.local` file in the root directory of the project.

4. **Add Credentials to `.env`**:
   Inside the `.env` file, add the following credentials:

5. **Add Credentials to `.env.development.local`**:
   Inside the `.env.development.local` file, add these credentials:

6. **Run Development Server**:
   Execute `npm run dev` in your terminal.

7. **Open Prisma Studio**:
   Run `npx prisma studio` in your terminal to access the database via Prisma Studio and check how data persists in the database.

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

Yes, I ran out of time, but there are some of the withdrawing logic that I really wanted to work longer to implement.

Sidenote: I was not able to spin up a docker container. It kept telling me that I was missing a users table? i then added a users table via command but it said I did not have the persmissions to seed the table. Which is why I spun up a Postgres DB via vercel with the same credentials.

### If you were to continue building this out, what would you like to add next?

I would add authentication, probably auth0 because I am familiar with it, but I would love to explore more auth services. I would also think it would be cool to add some sort of tracking to see how many time you look at your bank account or how many time a user withdraw or deposits.
i would also love to add a graphql endpoint, thinkning in long term, a customer/user would want to search through their transactions, and such. For us we would be able to query users, type of accounts, and such

### If you have any other comments or info you'd like the reviewers to know, please add them below.

I had so a fun time building this out. I ran out of time but this is definitely something I enjoyed building.I have been wanting to rebuild ‘what-to-wear’ https://github.com/tejedamiguel6/what-to-wear
Again but using next.js app router, this project gave me the opportunity to actually use Next.js new server component with client component paradigm. I now know when and how to use “Server Actions” inside client components. Interacting with databases is one of the best joys of building web applications. thank you for the opportunity to build something with a modern web technologies.
