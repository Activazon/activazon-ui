interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {children}
  </main>
);

export default Main;
