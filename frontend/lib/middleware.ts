import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export const updateSession = async (request: NextRequest) => {
  try {
    const response = NextResponse.next()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set(name, value, options)
          },
          remove(name: string, options: any) {
            response.cookies.set(name, "", { ...options, maxAge: -1 })
          },
        },
      }
    )

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    const isAuth = !!user

    const url = request.nextUrl

    const isAuthPage =
      url.pathname.startsWith("/login") || url.pathname.startsWith("/sign-up")

    const isProtectedRoute = url.pathname.startsWith("/dashboard")

    // ✅ Block access to protected routes
    if (isProtectedRoute && !isAuth) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // ✅ Prevent access to login/signup if already logged in
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}
