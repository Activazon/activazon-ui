interface TextContent {
  children: React.ReactNode;
  title: string;
  pulse: boolean;
}

export const TextContent = ({ children, title, pulse }: TextContent) => {
  return (
    <div className="tw-p-4 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-2xl tw-flex tw-flex-col tw-gap-2">
      <p className=" tw-font-semibold tw-text-lg">{title}</p>
      {!pulse && (
        <div className="tw-font-medium tw-text-gray-dark">{children}</div>
      )}
      {pulse && (
        <div className="tw-grid tw-grid-cols-7 tw-gap-2 tw-animate-pulse tw-flex-grow">
          <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-7"></div>
          <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-6"></div>
          <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-7"></div>
          <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-4"></div>
        </div>
      )}
    </div>
  );
};

export default TextContent;
