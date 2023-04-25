[Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`] under Typescript with ESLint and Tailwind

## Twitter Clone with fully auth system (fully responsive)

React TS -> FrontEnd
Next -> Routing & Server Side rendering
Tailwind -> CSS Management
Prisma -> Data Management
MongoDB -> Backend Storage
Next AutH ->  Authentication

- Post tweets
- Reply to tweets
- Like tweets -> with notification trigger
- Follow other users -> with notification trigger
- Being notigied when their content is liked or replied to
- Post tweets shown on their profile page
- Edit name, bio, profile cover with file upload

## Run the development server:

```bash
npm run dev
```

## Dependencies

npm install -D tailwindcss

npx tailwind init

npm install react-icons zustand
(zustand: ligthweight global state management library)
npm install -D prisma

npx prisma init

After our models, to push them in db -> npx prisma db push

Auth Controllers -> 

npm install @prisma/client (+ folder : libs)
npm install bcrypt -D @types/bcrypt
npm install next-auth    
npm install @next-auth/prisma-adapter   
npm install swr
npm install axios
npm install react-hot-toast
npm install react-spinners
 npm install date-fns

## Next.js resources:

- [Next.js Documentation](https://nextjs.org/docs)

## SWR
[SWR Documentation](https://swr.vercel.app/docs/getting-started)

// Swr will fetch the currentuser
// Store it in the global store
// Reuse this hook => not gonna refetch every time the data
// It will take a look and see if data exists
// And it will decide whether data needs to be re-validated and fetched again

// -> Replaces the global state like Redux (Great Lib for fetching)

## Project Deployed




