import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

interface OpenInBrowserModalProps {
  data: any;
}

const OpenInBrowserModal = ({ data }: OpenInBrowserModalProps) => {
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <p className="tw-text-lg tw-text-center">
            To continue, tap the{" "}
            <span className="tw-text-xl">
              <i className="bi bi-three-dots"></i>
            </span>{" "}
            button
          </p>
          <p className="tw-text-lg tw-text-center">
            then tap{" "}
            <b className="tw-whitespace-nowrap">Open in external browser</b>
          </p>
          <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-spin">
            <i className="bi bi-arrow-clockwise"></i>
          </p>
        </ContentGroup>
      </Content>
    </Modal>
  );
};

export default OpenInBrowserModal;
