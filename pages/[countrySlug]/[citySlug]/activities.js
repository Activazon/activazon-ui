import Nav from "components/Nav";
import Content from "components/Content/Content";
import Footer from "components/Footer";
import Head from "components/Head";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import { useTrans } from "lib/trans";
import { explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";
import { useEffect, useState } from "react";
import { getCityActivities } from "lib/client-api";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";

const Page = ({ countrySlug, citySlug }) => {
  const { t, p } = useTrans();
  const user = useUserRequired();
  const { displayDate } = useDate();

  const placeManager = usePlaceManager("city", countrySlug, citySlug, null, {});
  const { city } = placeManager;
  const isSeoReady = !!city;
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (city && !activities) {
      getCityActivities(city.id, 30).then((resp) => setActivities(resp));
    }
  }, [city, activities]);

  const activitesText =
    isSeoReady &&
    p("1 activity", "{{count}} activities", city.activity_total_last5months);
  const address =
    isSeoReady && `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = isSeoReady && `${address} (${activitesText})`;
  const seoDescription =
    isSeoReady &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = isSeoReady && city.image_wide_url;
  useTrackOnce("page.explore.city.activities", {
    citySlug: citySlug,
    isAuthenticated: !!user,
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
  const { countrySlug, citySlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
    },
  };
}
