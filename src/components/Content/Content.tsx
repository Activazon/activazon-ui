interface ContentProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const Content = ({ children, extraClasses }: ContentProps) => (
  <main
    className={
      "tw-w-full tw-px-3 tw-gap-5 tw-flex tw-flex-col tw-max-w-4xl tw-mx-auto " +
      extraClasses
    }
  >
    {children}
  </main>
);

export default Content;
