import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        })
    ]

})

// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         CredentialsProvider({
//             type: 'credentials',
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "Email" },
//                 password: {
//                     label: "Password", type: "password"
//                 }

//             },
//             authorize(credentials, req) {
//                 const { email, password } = credentials as {
//                     email: string;
//                     password: string;
//                 }
//             }
//         })
//     ]
// }

// export default NextAuth(authOptions)
export { handler as GET, handler as POST }

