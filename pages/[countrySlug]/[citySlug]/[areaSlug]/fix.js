import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import Content from "components/Content/Content";
import { Modal, useModal, ModalText } from "components/Modal";
import { useTrans } from "lib/trans";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";

const OptionsButton = ({ icon, label, onClick }) => {
  return (
    <button
      className="tw-flex-1 tw-flex tw-flex-row tw-items-center tw-text tw-justify-start tw-gap-3 tw-text-blue-bright tw-py-3 tw-px-4 tw-bg-gray tw-rounded-md tw-border tw-border-blue-bright tw-border-opacity-30 hover:tw-bg-blue-bright hover:tw-bg-opacity-10"
      onClick={onClick}
    >
      <i class={`bi bi-${icon} tw-text-xl`} />
      <span>{label}</span>
    </button>
  );
};

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
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useModal({
    isShowingDefault: true,
  });

  useTrackOnce("page.explore.area.fix", {
    // isAuthenticated: !!user,
    areaSlug: areaSlug,
  });

  return (
    <>
      <Head />
      <body>
        <div className="page">
          {isOptionsModalOpen && (
            <Modal
              title="What is wrong?"
              onClose={() => setIsOptionsModalOpen(false)}
            >
              <ModalText>
                What is wrong with <b>{area.display_name}</b> that you would
                like to fix?
              </ModalText>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <OptionsButton label="Location is wrong" icon="pin-map-fill" />
                <OptionsButton
                  label="Place incorrectly name"
                  icon="houses-fill"
                />
                <OptionsButton label="Not a real place" icon="x-octagon-fill" />
                <OptionsButton label="Nothing" icon="hand-thumbs-up-fill" />
              </div>
            </Modal>
          )}
          <Nav />

          <Content>{/*  */}</Content>
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
