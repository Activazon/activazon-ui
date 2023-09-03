import ContentGroup from "components/Content/ContentGroup";
import Select from "components/Select";
import FixCorrectionButton from "components/FixContent/FixCorrectionButton";
import { useState } from "react";

const FixContentWrongCity = ({ area, onSubmitCorrection }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const handleOnSubmitCorrection = () => {
    onSubmitCorrection({
      area_id: area.id,
      correction_params: {
        city: selectedCity,
      },
    });
  };
  return (
    <>
      <ContentGroup>
        <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
          <b>{area.display_name}</b> is not in {area.city.display_name}?
        </p>
        <p className="tw-m-0 tw-text-gray-dark">
          Please select the correct city below that {area.display_name} is in.
          Our admins will review and fix this mistake.
        </p>
        <Select
          placeholder="Select the correct city"
          options={[
            { value: "la-ceiba", label: "La Ceiba" },
            { value: "san-pedro-sula", label: "San Pedro Sula" },
            { value: "tegucigalpa", label: "Tegucigalpa" },
            { value: "trujillo", label: "Trujillo" },
          ]}
          onSelect={setSelectedCity}
        />
      </ContentGroup>
      <FixCorrectionButton onClick={handleOnSubmitCorrection} />
    </>
  );
};

export default FixContentWrongCity;
