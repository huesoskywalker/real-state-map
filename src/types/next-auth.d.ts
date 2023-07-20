import { ObjectId } from "mongodb"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface Session {
        user: {
            _id: string
            name: string
            email: string
            image: string
        }
    }
    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    interface Account {}
    /** The OAuth profile returned from your provider */
    interface Profile {}

    interface User {
        _id: string
        name: string
        email: string
        image: string
    }
}
