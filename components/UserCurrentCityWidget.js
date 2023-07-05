import { useTrans } from "lib/trans";
import Link from "next/link";
import { explorePath } from "lib/urls";
import ContentGroupTitle from "./Content/ContentGroupTitle";
import ContentGroup from "./Content/ContentGroup";
import MapTile from "./Map/MapTile";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";
import { useDate } from "lib/date";

const UserCurrentCityWidget = ({ city, activities }) => {
  const { t } = useTrans();
  const { displayDate } = useDate();
  return (
    <ContentGroup>
      <MapTile imgUrl={city.image_wide_url} />
      <ContentGroupTitle
        title={t("Activity detected in {{cityDisplayName}}", {
          cityDisplayName: city.display_name,
        })}
        description={t(
          "We've detected {{ActivityCount}} activities near you in the last week",
          {
            ActivityCount: city.activity_total_last7days,
          }
        )}
      />
      <ItemList>
        {activities?.map((activity) => (
          <Item
            key={`activity-${activity.id}`}
            href={explorePath(
              [activity.area.slug_path, "activities", activity.id].join("/")
            )}
            imgUrl={accessorActivityImageUrl(activity)}
            itemType={t("Activity")}
            title={accessorActivityTitle(t, activity)}
            message={displayDate(activity.date_occured)}
            pill={
              <ItemActivityTypePill name={t(activity.activity_type.name)} />
            }
          />
        ))}
        <Link
          href={explorePath(city?.slug_path)}
          className="tw-text-blue-bright tw-text-center tw-no-underline tw-p-3 tw-bg-blue-bright-trans tw-rounded-full"
        >
          {t("View more from {{CityName}}", {
            CityName: city.display_name,
          })}
        </Link>
      </ItemList>
    </ContentGroup>
  );
  // return (
  //   <WidgetContainer
  //     title={t("Stay informed about your city", {
  //       CityName: city.display_name,
  //     })}
  //     description={t(
  //       "Stay up-to-date on your city. See recent activity in your area."
  //     )}
  //     viewAllText={t("View more from {{CityName}}", {
  //       CityName: city.display_name,
  //     })}
  //     viewAllUrl={explorePath(city.slug_path)}
  //   >
  //     <div className="widget-list">
  //       <WidgetListItemCity city={city} />
  //       {activities.map((activity, index) => (
  //         <WidgetListItemSmallActivity
  //           index={index + 1}
  //           key={activity.id}
  //           activity={activity}
  //           city={city}
  //         />
  //       ))}
  //     </div>
  //   </WidgetContainer>
  // );
};

export default UserCurrentCityWidget;
