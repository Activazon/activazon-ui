import { ReactNode } from "react";

const TABLE_COMPONENTS = {
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-6 border border-white/15 rounded-xl">
      <table className="w-full border-collapse overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-white/10 text-white/80 border-b border-white/15">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b border-white/15 hover:bg-white/5 transition-colors last:border-0">
      {children}
    </tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-4 py-2.5 text-left text-white/90 font-normal border first:border-l-0 last:border-r-0 border-t-0 border-white/15  bg-white/5">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-4 py-2.5 border first:border-l-0 last:border-r-0 border-white/15 text-white/80">
      {children}
    </td>
  ),
};

const CUSTOM_COMPONENTS = {
  // Add custom components here
};

const BASIC_COMPONENTS = {
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
      className="text-primary underline decoration-primary/50 hover:decoration-primary transition-all duration-200 underline-offset-4"
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
    <blockquote className="border-l-4 border-primary/60 pl-5 italic text-white/80 my-8 text-lg md:text-xl bg-white/5 p-4 rounded-lg">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-white/10 p-4 rounded-lg text-primary text-sm md:text-base overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-white/10 px-2 py-1 rounded text-sm text-primary font-mono">
      {children}
    </code>
  ),
  img: (props: any) => <img className="rounded-lg my-6 shadow-md" {...props} />,
  hr: () => <hr className="border-white/15 my-10" />,
};

export const MDX_COMPONENTS = {
  ...BASIC_COMPONENTS,
  ...TABLE_COMPONENTS,
  ...CUSTOM_COMPONENTS,
};
