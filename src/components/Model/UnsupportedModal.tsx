import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

interface UnsupportedModalProps {
  data: any;
}

const UnsupportedModal = ({ data }: UnsupportedModalProps) => {
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <p className="tw-text-lg tw-text-center tw-text-yellow-500">
            <b>
              <i className="bi bi-exclamation-triangle-fill"></i> Look&apos;s
              like your browser or device does not support this feature
            </b>
          </p>
          <p className="tw-text-lg tw-text-center">
            Try opening{" "}
            <b>
              <a href="https://activazon.com">www.activazon.com</a>
            </b>{" "}
            in a different browser or device to continue.
          </p>

          <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-spin">
            <i className="bi bi-arrow-clockwise"></i>
          </p>
        </ContentGroup>
      </Content>
    </Modal>
  );
};

export default UnsupportedModal;
