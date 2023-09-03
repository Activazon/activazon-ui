import { useState } from "react";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import Content from "components/Content/Content";
import OptionsModal from "components/FixContent/OptionsModal";
import FixContentWrongCity from "components/FixContent/FixContentWrongCity";
import FixContentLocation from "components/FixContent/FixContentLocation";
import FixContentInvalidPlace from "components/FixContent/FixContentInvalidPlace";
import options from "components/FixContent/options";
import { useTrans } from "lib/trans";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";

const Page = ({ countrySlug, citySlug, areaSlug }) => {
  const { t, p } = useTrans();
  // const user = useUserRequired();
  const placeManager = usePlaceManager(
    "area",
    countrySlug,
    citySlug,
    areaSlug,
    {}
  );
  const { area } = placeManager;
  const [optionName, setOptionName] = useState(null);
  useTrackOnce("page.explore.area.fix", {
    // isAuthenticated: !!user,
    areaSlug: areaSlug,
  });

  const onOptionSelect = (optionName) => {
    setOptionName(optionName);
  };

  return (
    <>
      <Head />
      <body>
        <div className="page">
          {!optionName && (
            <OptionsModal
              areaDisplayName={area?.display_name}
              onOptionSelect={onOptionSelect}
            />
          )}
          <Nav />

          <Content>
            {optionName === options.wrong_city && (
              <FixContentWrongCity area={area} onSubmitCorrection={() => {}} />
            )}
            {optionName === options.location && (
              <FixContentLocation area={area} onSubmitCorrection={() => {}} />
            )}
            {optionName === options.invalid_place && (
              <FixContentInvalidPlace
                area={area}
                onSubmitCorrection={() => {}}
              />
            )}
          </Content>

          <Footer />
        </div>
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { countrySlug, citySlug, areaSlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
      areaSlug,
    },
  };
}
