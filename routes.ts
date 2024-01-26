/**
 * These are the public routes which are visible to everty user.
 * Thses routes are visible without even logging in.
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
]


/**
 * These are the auth route which will include the authentication routes.
 * @type {string[]}
 */

export const authRoutes = [
    "/login",
    "/register"
]

/**
 * The prefix routes include the api authentication routes.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";


/**
 * These is the default route to which the user will be directed once he loggs In
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings'