import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import MapTile from "components/Map/MapTile";
import MapInfo from "components/Map/MapInfo";
import Select from "components/Select";

const FixContentWrongCity = ({ area }) => {
  return (
    <Content>
      <div className="tw-bg-gray-200 tw-p-3 tw-rounded-xl">
        <ContentGroup>
          <MapTile imgUrl={area.image_wide_url} />
          <MapInfo
            areaType="Area"
            addressParts={[area.display_name]}
            activityCount={area.activity_total_last5months}
          />
        </ContentGroup>
      </div>
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
        />
      </ContentGroup>
    </Content>
  );
};

export default FixContentWrongCity;
