import React from "react";

const ItemAttentionWrapper = ({
  children,
  showAttention,
}: {
  children: React.ReactNode;
  showAttention: boolean;
}) => {
  if (!showAttention) {
    return <>{children}</>;
  }
  return (
    <div className="tw-bg-blue-light/40 tw-mx-[-0.75rem] tw-mt-[-0.75rem] tw-px-3 tw-py-3 tw-border-b tw-border-blue-light">
      {children}
    </div>
  );
};

export default ItemAttentionWrapper;
