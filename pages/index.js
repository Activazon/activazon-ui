import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";

import PlaceList from "components/PlaceList";
import SearchWidget from "components/SearchWidget";
import A2hsCtaTile from "components/A2hsCtaTile";
import UserCurrentCityWidget from "components/UserCurrentCityWidget";

// import Tip from "components/Tip";
import { useTrans } from "lib/trans";
import { getActivities } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useApi } from "lib/api-helper";
import { useDate } from "lib/date";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";

const Page = () => {
  const { i, t } = useTrans();
  const user = useUser();
  const { displayDate } = useDate();
  const isAuthenticated = !!user;
  useTrackOnce("page.explore", {
    isAuthenticated,
  });

  const activitiesLimit = 3;
  const activities = useApi(() => getActivities(activitiesLimit), null);

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />
          {/* <Tip /> */}
          <Bannerv2 title={i("Get to know your neighbourhood")} dark={true}>
            <div className="row mt-4 mb-4">
              <div className="col-12">
                <SearchWidget />
              </div>
            </div>
          </Bannerv2>
          <Main>
            <>
              <Col>
                <UserCurrentCityWidget />
              </Col>
              <Col>
                <PlaceList
                  description={i("Activities detected")}
                  name="home-activities"
                  items={activities?.data?.results}
                  accessorHref={(activity) =>
                    explorePath(
                      [activity.area.slug_path, "activities", activity.id].join(
                        "/"
                      )
                    )
                  }
                  accessorImageUrl={(activity) =>
                    accessorActivityImageUrl(activity)
                  }
                  accessorLead={(activity) =>
                    displayDate(activity.date_occured)
                  }
                  accessorTitle={(activity) =>
                    accessorActivityTitle(t, activity)
                  }
                  shimmerLimit={activitiesLimit}
                />
              </Col>

              <Col>
                <A2hsCtaTile />
              </Col>
            </>

            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
