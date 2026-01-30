import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host");
  const host = hostname?.replace("www.", "");

  console.log("host", host);
  if (host === process.env.HOST_NAME) {
    return NextResponse.next();
  } else if (!host?.includes(process.env.HOST_NAME!)) {
    return NextResponse.rewrite(
      new URL(`/s/${host}${req.nextUrl.pathname}`, req.url),
    );
  } else if (host?.includes(`.${process.env.HOST_NAME}`)) {
    const tenant = host.split(".")[0];
    console.log("tenant", tenant);
    return NextResponse.rewrite(
      new URL(`/s/${tenant}${req.nextUrl.pathname}`, req.url),
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|[\\w-]+\\.\\w+).*)",
  ],
};
