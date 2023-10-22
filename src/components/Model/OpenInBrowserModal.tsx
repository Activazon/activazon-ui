import { useDictionary } from "@/dictionaries";
import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

interface OpenInBrowserModalProps {
  data: any;
}

const OpenInBrowserModal = ({ data }: OpenInBrowserModalProps) => {
  const { thtml } = useDictionary();
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <p className="tw-text-lg tw-text-center">
            {thtml("modal:open_in_browswer_instruction_1")}
          </p>
          <p className="tw-text-lg tw-text-center">
            {thtml("modal:open_in_browswer_instruction_2")}
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
