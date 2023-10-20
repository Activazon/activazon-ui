interface ItemListContainerProps {
  children: React.ReactNode;
}

const ItemListContainer = ({ children }: ItemListContainerProps) => {
  return <div className="tw-flex tw-flex-col tw-gap-3">{children}</div>;
};

export default ItemListContainer;
