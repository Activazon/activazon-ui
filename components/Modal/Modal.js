const Modal = ({ title, children, actions, onClose }) => {
  const handleCloseByTint = (event) => {
    if (event.target === event.currentTarget) {
      // only close if the click was on the binding element
      onClose && onClose();
    }
  };

  return (
    <div
      className="tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-w-screen tw-bg-blue-dark tw-bg-opacity-80 tw-z-[10000] tw-p-3 tw-flex tw-items-center tw-justify-center"
      onClick={handleCloseByTint}
    >
      <div className="tw-bg-white tw-w-full tw-max-w-lg tw-py-5 tw-px-4 tw-rounded-2xl tw-shadow-2xl tw-flex tw-flex-col tw-gap-3">
        <p className="tw-m-0 tw-text-blue-dark tw-text-2xl">{title}</p>
        {children}
        {actions && (
          <div className="tw-flex tw-flex-row tw-gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
