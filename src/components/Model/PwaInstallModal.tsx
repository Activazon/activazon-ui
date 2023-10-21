import { ReactNode } from "react";
import Content from "../Content/Content";
import ContentGroup from "../Content/ContentGroup";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

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

const IosInstructions = () => (
  <ContentGroup extraClasses="ios-specific">
    <p className="tw-text-lg tw-text-center">
      To continue, tap the{" "}
      <span className="tw-text-xl">
        <i className="bi bi-box-arrow-up"></i>
      </span>{" "}
      button below
    </p>
    <p className="tw-text-lg tw-text-center">
      then tap{" "}
      <b className="tw-whitespace-nowrap">
        <i className="bi bi-plus-square"></i> Add to Home Screen
      </b>
    </p>
    <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-bounce">
      <i className="bi bi-arrow-down"></i>
    </p>
  </ContentGroup>
);

const NonIosInstructions = () => (
  <ContentGroup extraClasses="non-ios-specific">
    <p className="tw-text-lg tw-text-center">
      To continue, tap the{" "}
      <span className="tw-text-xl">
        <i className="bi bi-three-dots-vertical"></i>
      </span>{" "}
      menu in your browser&apos;s menu
    </p>
    <p className="tw-text-lg tw-text-center">
      then tap{" "}
      <b className="tw-whitespace-nowrap">
        <i className="bi bi-phone"></i> Add to Home Screen
      </b>
    </p>
    <p className="tw-text-center tw-text-3xl tw-my-3 tw-animate-spin">
      <i className="bi bi-arrow-clockwise"></i>
    </p>
  </ContentGroup>
);

const PwaInstalModal = ({ data }: PwaInstalModalProps) => {
  return (
    <Modal>
      <Content>
        <ModalHeader />
        <ContentGroup>
          <ListItem
            icon={<i className="bi bi-bell-fill"></i>}
            title="Notifications"
            description="Receive push notification alerts when activity is detected in your neighborhood"
          />
          <ListItem
            icon={<i className="bi bi-geo-alt-fill"></i>}
            title="Location"
            description="Discover what is happening near you"
          />
        </ContentGroup>
        <IosInstructions />
        <NonIosInstructions />
      </Content>
    </Modal>
  );
};

export default PwaInstalModal;
