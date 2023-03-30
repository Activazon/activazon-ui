import { explorePath } from "lib/urls";

const Page = ({}) => {
  return <></>;
};

export default Page;

export async function getServerSideProps(context) {
  const [_, countrySlug, citySlug, areaSlug, areaSlugTag] =
    context.query.tag.split("/");
  const activityId = areaSlugTag.split("-")[1];

  const redirectUrl = explorePath(
    [countrySlug, citySlug, areaSlug, "activities", activityId].join("/")
  );

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
}
