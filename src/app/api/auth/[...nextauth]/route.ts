import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET_ID!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }

            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user_email: {},
                user_password: {}
            },
            async authorize(credentials) {
                if (!credentials?.user_email || !credentials?.user_password) {
                    return null;
                }

                try {
                    const response = await fetch("http://localhost:3001/api/v1/sign-in", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    });

                    if (!response.ok) {
                        throw new Error("Invalid credentials");
                    }

                    const user = await response.json();

                    // Ensure the user object has the required properties
                    if (user?.user) {
                        return {
                            id: user.user.user_id,
                            email: user.user.user_email,
                            name: user.user.user_name,
                            image: user.user.user_profile,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {

        async jwt({ token, user, session }) {
                if(user){
                    return {
                        ...token,
                        id: user.id
                    }                    
                }
                return token;
        },
        async session({ session, token, user }) {
            return {...session, user : {
                ...session.user,
                id: token.id,
            }};
        },

        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile?.email) {
                try {
                    const response = await fetch("http://localhost:3001/api/v1/user-exist", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ user_email: profile.email }),
                    });

                    const data = await response.json();

                    if (data.status === 202) {
                        const response = await fetch("http://localhost:3001/api/v1/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                user_email: profile.email,
                                user_profile: profile.image,
                                user_name: profile.name,
                            })
                        })
                        console.log(response);
                    }

                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false; 
                }
            }
            return true; 
        }

    }
}

// Export the handler for Next.js API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
