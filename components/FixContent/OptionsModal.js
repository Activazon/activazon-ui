import { Modal, useModal, ModalText } from "components/Modal";
import options from "./options";

const OptionsButton = ({ icon, label, onClick }) => {
  return (
    <button
      className="tw-flex-1 tw-flex tw-flex-row tw-items-center tw-text tw-justify-start tw-gap-3 tw-text-blue-bright tw-py-3 tw-px-4 tw-bg-gray tw-rounded-md tw-border tw-border-blue-bright tw-border-opacity-30 hover:tw-bg-blue-bright hover:tw-bg-opacity-10"
      onClick={onClick}
    >
      <i class={`bi bi-${icon} tw-text-xl`} />
      <span>{label}</span>
    </button>
  );
};

const OptionsModal = ({ areaDisplayName, onOptionSelect }) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useModal({
    isShowingDefault: true,
  });

  const handleOptionSelect = (optionName) => () => {
    onOptionSelect(optionName);
    setIsOptionsModalOpen(false);
  };

  return (
    isOptionsModalOpen && (
      <Modal title="What is wrong?">
        <ModalText>
          What is wrong with <b>{areaDisplayName}</b> that you would like to
          fix?
        </ModalText>
        <div className="tw-flex tw-flex-col tw-gap-2">
          <OptionsButton
            label="Location on the map"
            icon="pin-map-fill"
            onClick={handleOptionSelect(options.location)}
          />
          <OptionsButton
            label="Wrong City"
            icon="houses-fill"
            onClick={handleOptionSelect(options.wrong_city)}
          />
          <OptionsButton
            label="Not a real place"
            icon="x-octagon-fill"
            onClick={handleOptionSelect(options.invalid_place)}
          />
          <OptionsButton
            label="Nothing"
            icon="hand-thumbs-up-fill"
            onClick={handleOptionSelect(options.nothing)}
          />
        </div>
      </Modal>
    )
  );
};

export default OptionsModal;
