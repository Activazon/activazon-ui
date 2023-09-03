import { useRouter } from "next/router";
import { Modal, ModalText, ModalButton } from "components/Modal";

const SuccessModal = ({ redirectTo }) => {
  const router = useRouter();
  const onClose = () => {
    router.push(redirectTo);
  };

  return (
    <Modal
      title="Correction Submitted"
      actions={[<ModalButton label="Close" onClick={onClose} />]}
    >
      <ModalText>
        Thank for your help. We here at Activazon are grateful for your support.
        We will review your correction and update this area as soon as possible.
      </ModalText>
    </Modal>
  );
};

export default SuccessModal;
