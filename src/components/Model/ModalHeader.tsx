import ContentGroup from "../Content/ContentGroup";

const ModalHeader = () => (
  <ContentGroup>
    <p className="tw-m-0 tw-text-blue-dark tw-text-2xl tw-font-semibold">
      Unlock the full power of{" "}
      <span className="tw-whitespace-nowrap tw-text-blue-light">
        <i className="bi bi-activity"></i> Activazon
      </span>
    </p>
    <p className="tw-font-normal tw-text-gray-dark">
      Adding Activazon to your{" "}
      <b>
        <i className="bi bi-plus-square"></i> Home Screen
      </b>{" "}
      can allow you to use some cool features for free
    </p>
  </ContentGroup>
);

export default ModalHeader;
