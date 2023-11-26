import React from "react";

const ItemAttentionWrapper = ({
  children,
  showAttention,
}: {
  children: React.ReactNode;
  showAttention: boolean;
}) => {
  return (
    <div
      className={`tw-p-2 tw-rounded-xl ${
        showAttention ? "tw-bg-blue-light/20" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default ItemAttentionWrapper;
