const SearchBarResults = () => {
  return (
    <div className="tw-border-t tw-border-slate-300 tw-px-4 tw-py-3">
      {[1, 2, 3, 4, 5].map(() => (
        <div className="tw-border-b last:tw-border-0 last:tw-pb-0 first:tw-pt-0 tw-border-slate-300 tw-py-2">
          <p className="tw-font-bold tw-mb-0">San Pedro Sula</p>
          <p className="tw-mb-0 tw-text-sm">Honduras</p>
        </div>
      ))}
    </div>
  );
};

export default SearchBarResults;
