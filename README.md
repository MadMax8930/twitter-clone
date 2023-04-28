## Twitter Clone with [`Next.js`] and React Typescript (fully responsive)
Node version 16.13

### User will be able to:

- Authenticate
- Post tweets
- Reply to tweets
- Like tweets (with notification trigger)
- Follow other users (with notification trigger)
- Edit name, bio, profile cover with file upload

### Run server:

```bash
npm run dev
# or
yarn dev
```

### Dependencies

```bash
npm install -D tailwindcss -D prisma @prisma/client bcrypt -D @types/bcrypt next-auth @next-auth/prisma-adapter swr axios zustand react-icons react-hot-toast react-spinners date-fns react-dropzone
```

### Development framework:
[Next.js documentation](https://nextjs.org/docs) for routing & server side rendering

### Authentication:
[NextAuth.js documentation](https://next-auth.js.org/configuration/nextjs#getserversession) for more details

### CSS Management:
[Tailwind documentation](https://tailwindcss.com/docs/guides/nextjs) for styling

### ORM Library:
[Prisma documentation](https://www.prisma.io/docs/getting-started) for data management

- Init ORM: npx prisma init
- Format models: npx prisma format
- Migrate schema changes: npx prisma migrate 
- Push modals to db : npx prisma db push

### Backend Storage:
[MongoDB Atlas documentation](https://www.mongodb.com/atlas) for free database solution

### Global Store Management Library:
[SWR documentation](https://swr.vercel.app/docs/getting-started) for more details <br />

This library will fetch data. Store it in the global store.
The great thing is that the reuse of swr hooks, will not going to re-fetch the data.
It will take a look, see if data exists in a cache, and it will decide whether data needs to be re-validated and fetched again. In my opinion, it's a good alternative to Redux Toolkit.

### Lightweight Store Management Library:
[Zustand documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) for modals

### Deployment
[Project deployed](https://next-twittah.netlify.app) on Vercel.