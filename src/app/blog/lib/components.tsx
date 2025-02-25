import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";
import JoinWaitlistButton from "@/app/JoinWaitListButton";

export const MDX_COMPONENTS = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 tracking-tight text-white leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-medium mt-12 mb-6 text-white">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-medium mt-12 mb-6 text-white">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-lg md:text-lg leading-relaxed text-white/85 mb-6">
      {children}
    </p>
  ),
  a: ({ href, children }: { children: ReactNode; href: string }) => (
    <a
      href={href}
      className="text-[#00A3FF] underline decoration-[#00A3FF]/50 hover:decoration-[#00A3FF] transition-all duration-200 underline-offset-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside text-lg md:text-lg text-white/80 mb-6 space-y-2 pl-5">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside text-lg md:text-lg text-white/80 mb-6 space-y-2 pl-5">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="pl-2 leading-relaxed text-white/90">{children}</li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-[#00A3FF]/60 pl-5 italic text-white/80 my-8 text-lg md:text-xl bg-white/5 p-4 rounded-lg">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-white/10 p-4 rounded-lg text-[#00A3FF] text-sm md:text-base overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-white/10 px-2 py-1 rounded text-sm text-[#00A3FF] font-mono">
      {children}
    </code>
  ),
  img: (props: any) => (
    <Image
      sizes="100vw"
      className="rounded-lg border border-white/10 my-6 shadow-md"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  hr: () => <hr className="border-white/15 my-10" />,
  JoinWaitlistButton,
};
