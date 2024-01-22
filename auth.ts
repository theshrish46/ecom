// import NextAuth from 'next-auth';
// import { db } from './lib/db';


// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     pages: {
//         signIn: '/login',
//     },
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account?.provider !== 'credentials') return true

//             const existingUser = await db.user.findMany({
//                 where: {
//                     email: user.email
//                 }
//             })
//         }
//     }
// })