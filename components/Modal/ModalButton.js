const ModalButton = ({ type, label, onClick }) => {
  let extraClassName = "";
  if (type === "blue-bright") {
    extraClassName = "tw-bg-blue-bright ";
  } else {
    extraClassName = "tw-bg-gray-200";
  }
  return (
    <button
      className={`tw-flex-1 tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-blue-dark tw-rounded-lg tw-p-2 ${extraClassName}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ModalButton;
