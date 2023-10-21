interface ContentGroupProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const ContentGroup = ({ children, extraClasses }: ContentGroupProps) => (
  <div
    className={"tw-w-full tw-gap-3 tw-flex tw-flex-col " + extraClasses || ""}
  >
    {children}
  </div>
);

export default ContentGroup;
