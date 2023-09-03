import ContentGroup from "components/Content/ContentGroup";
import FixCorrectionButton from "components/FixContent/FixCorrectionButton";
import { useState } from "react";

const FixContentLocation = ({ area, onSubmitCorrection }) => {
  const handleOnSubmitCorrection = () => {
    onSubmitCorrection({
      area_id: area.id,
      correction_params: {},
    });
  };
  return (
    <>
      <ContentGroup>
        <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
          <b>Find {area.display_name}</b> on the map
        </p>
        <p className="tw-m-0 tw-text-gray-dark">
          Use the map below to pin point where {area.display_name} is located.
        </p>
        {/*  */}
      </ContentGroup>
      <FixCorrectionButton onClick={handleOnSubmitCorrection} />
    </>
  );
};

export default FixContentLocation;
