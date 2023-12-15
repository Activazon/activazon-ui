interface SearchTileGridProps {
  children: React.ReactNode;
}

const TileGridContainer = ({ children }: SearchTileGridProps) => (
  <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3">
    {children}
  </div>
);

export default TileGridContainer;
