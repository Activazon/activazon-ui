export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">{children}</div>
  );
}
