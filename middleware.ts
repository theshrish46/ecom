import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    // publicRoutes: ["/"],

    // isPublicRoute = 

    afterAuth(auth, req, evt) {


        if (!auth.userId && !auth.isPublicRoute) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next()
        }
    }
})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};