import { useDictionary } from "@/dictionaries";
import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

interface UnsupportedModalProps {
  data: any;
}

const UnsupportedModal = ({ data }: UnsupportedModalProps) => {
  const { thtml } = useDictionary();
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <p className="tw-text-lg tw-text-center tw-text-yellow-500">
            <b>
              <i className="bi bi-exclamation-triangle-fill"></i>{" "}
              {thtml("modal:unsupported_message_1")}
            </b>
          </p>
          <p className="tw-text-lg tw-text-center">
            {thtml("modal:unsupported_message_2")}
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
