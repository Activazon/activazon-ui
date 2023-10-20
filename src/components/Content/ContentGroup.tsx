interface ContentGroupProps {
  children: React.ReactNode;
}

const ContentGroup = ({ children }: ContentGroupProps) => (
  <div className="tw-w-full tw-gap-3 tw-flex tw-flex-col">{children}</div>
);

export default ContentGroup;
