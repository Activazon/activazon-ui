import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import Content from "components/Content/Content";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import { useTrans } from "lib/trans";
import { getAreaActivities } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";
import { useEffect, useState } from "react";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";

const Page = ({ countrySlug, citySlug, areaSlug }) => {
  const { t, p } = useTrans();
  const user = useUserRequired();
  const { displayDate } = useDate();

  const placeManager = usePlaceManager(
    "area",
    countrySlug,
    citySlug,
    areaSlug,
    {}
  );
  const { area } = placeManager;
  const seoLoaded = !!area;

  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (area && !activities) {
      getAreaActivities(area.id, 30).then((resp) => setActivities(resp));
    }
  }, [area, activities]);

  const activitesText =
    seoLoaded && p("1 activity", "{{count}} activities", area.activity_total);
  const address =
    seoLoaded &&
    `${area.display_name}, ${area.city.display_name}, , ${area.city.country.display_name}`;
  const seoTitle = seoLoaded && `${address} (${activitesText})`;
  const seoDescription =
    seoLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = seoLoaded && area.image_wide_url;
  useTrackOnce("page.explore.area.activities", {
    isAuthenticated: !!user,
    areaSlug: areaSlug,
  });

  return (
    <>
      <Head
        title={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={[address]}
        seoImageUrl={seoImageUrl}
      />
      <body>
        <div className="page">
          <Nav />
          <Content>
            <ItemList>
              {activities?.results?.map((activity) => (
                <Item
                  key={`activity-${activity.id}`}
                  href={explorePath(
                    [activity.area.slug_path, "activities", activity.id].join(
                      "/"
                    )
                  )}
                  imgUrl={accessorActivityImageUrl(activity)}
                  itemType={t("Activity")}
                  title={accessorActivityTitle(t, activity)}
                  message={displayDate(activity.date_occured)}
                  pill={
                    <ItemActivityTypePill
                      name={t(activity.activity_type.name)}
                    />
                  }
                />
              ))}
            </ItemList>
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
