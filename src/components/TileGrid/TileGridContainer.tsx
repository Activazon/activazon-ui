interface SearchTileGridProps {
  children: React.ReactNode;
}

const TileGridContainer = ({ children }: SearchTileGridProps) => (
  <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2">
    {children}
  </div>
);

export default TileGridContainer;
