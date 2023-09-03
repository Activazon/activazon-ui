const FixCorrectionButton = ({ onClick }) => (
  <button
    className="tw-bg-blue-bright tw-text-white tw-p-3 tw-rounded-xl tw-flex tw-flex-row tw-justify-center tw-gap-2"
    onClick={onClick}
  >
    <i className="bi bi-check-circle tw-text-xl"></i>
    <span>Submit Correction</span>
  </button>
);

export default FixCorrectionButton;
