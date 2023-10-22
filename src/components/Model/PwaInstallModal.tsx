import { ReactNode } from "react";
import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import { useDictionary } from "@/dictionaries";

interface PwaInstalModalProps {
  data: any;
}

interface ListItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ListItem = ({ icon, title, description }: ListItemProps) => {
  return (
    <div className="tw-bg-slate-100 tw-p-3 tw-rounded-xl tw-flex tw-flex-row tw-gap-3">
      <div className="tw-text-blue-light tw-text-xl">{icon}</div>
      <div>
        <p className="tw-text-blue-dark tw-text-lg tw-font-semibold">{title}</p>
        <p className="tw-text-gray-dark tw-text-sm tw-font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

const IosInstructions = () => {
  const { thtml } = useDictionary();
  return (
    <ContentGroup extraClasses="ios-specific">
      <p className="tw-text-lg tw-text-center">
        {thtml("modal:pwainstall_instruction_ios_1")}
        button below
      </p>
      <p className="tw-text-lg tw-text-center">
        {thtml("modal:pwainstall_instruction_ios_2")}
      </p>
      <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-bounce">
        <i className="bi bi-arrow-down"></i>
      </p>
    </ContentGroup>
  );
};

const NonIosInstructions = () => {
  const { thtml } = useDictionary();
  return (
    <ContentGroup extraClasses="non-ios-specific">
      <p className="tw-text-lg tw-text-center">
        {thtml("modal:pwainstall_instruction_nonios_1")}
      </p>
      <p className="tw-text-lg tw-text-center">
        {thtml("modal:pwainstall_instruction_nonios_2")}
      </p>
      <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-spin">
        <i className="bi bi-arrow-clockwise"></i>
      </p>
    </ContentGroup>
  );
};

const PwaInstalModal = ({ data }: PwaInstalModalProps) => {
  const { t } = useDictionary();
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <ListItem
            icon={<i className="bi bi-bell-fill"></i>}
            title={t("modal:pwainstall_feature1_title")}
            description={t("modal:pwainstall_feature1_description")}
          />
          <ListItem
            icon={<i className="bi bi-geo-alt-fill"></i>}
            title={t("modal:pwainstall_feature2_title")}
            description={t("modal:pwainstall_feature2_description")}
          />
        </ContentGroup>
        <IosInstructions />
        <NonIosInstructions />
      </Content>
    </Modal>
  );
};

export default PwaInstalModal;
