import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <div className="mesh-gradient-bg !fixed !translate-y-[-50vh] md:!translate-y-[-70vh] top-0 left-0 w-full h-[40vh] z-[-1]" />
      <header className="w-full flex flex-row justify-between items-center border-b border-white/10 bg-white/5 md:bg-transparent md:py-5 md:px-5 py-4 px-3 sticky top-0 backdrop-blur-xl z-10">
        <Link href="/blog" className="">
          <img
            src="/logo.svg"
            alt="Activazon Logo"
            className="h-6 md:h-7 invert brightness-0 transition-all hover:brightness-100 hover:invert-0 duration-200"
          />
        </Link>

        <div className="">
          <Link
            href="/"
            className="text-[#00A3FF] underline decoration-[#00A3FF]/50 hover:decoration-[#00A3FF] transition-all duration-200 underline-offset-4 md:text-base text-sm"
          >
            Back to Site
          </Link>
        </div>
      </header>

      <div className="w-full">{children}</div>
      <footer className="w-full pt-5 pb-5">
        <p className="text-center text-sm text-white/70">
          &copy; Activazon 2025 |{" "}
          <a
            href="/"
            className="text-[#00A3FF] underline decoration-[#00A3FF]/50 hover:decoration-[#00A3FF] transition-all duration-200 underline-offset-"
          >
            Home
          </a>
        </p>
      </footer>
    </Fragment>
  );
}
