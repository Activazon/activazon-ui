import { useDictionary } from "@/dictionaries";
import ContentGroup from "../Content/ContentGroup";

const ModalHeader = () => {
  const { thtml } = useDictionary();
  return (
    <ContentGroup>
      <p className="tw-m-0 tw-text-blue-dark tw-text-2xl tw-font-semibold">
        {thtml("modal:generic_title")}{" "}
        <span className="tw-whitespace-nowrap tw-text-blue-light">
          <i className="bi bi-activity"></i> Activazon
        </span>
      </p>
      <p className="tw-font-normal tw-text-gray-dark">
        {thtml("modal:generic_description")}
      </p>
    </ContentGroup>
  );
};

export default ModalHeader;
