import { useTrans } from "lib/trans";
import WidgetContainer from "components/WidgetContainer";
import { explorePath } from "lib/urls";
import { accessorActivityTitle } from "lib/activityAcessors";
import { useDate } from "lib/date";

const WidgetListItemCity = ({ city }) => {
  const { t } = useTrans();
  return (
    <a href={explorePath(city.slug_path)} className="widget-list-item mb-2">
      <div className="widget-list-item-image">
        <img src={city.image_square_url} />
      </div>
      <div className="widget-list-item-content">
        <p className="widget-list-item-title">
          {t("{{CityName}} (City)", {
            CityName: city.display_name,
          })}
        </p>
        <p className="widget-list-item-text widget-list-item-text-light">
          {city.activity_total_last7days !== 0
            ? t("{{ActivityCount}} activities detected in the last week", {
                ActivityCount: city.activity_total_last7days,
              })
            : t("{{ActivityCount}} activities detected in the last 5 months", {
                ActivityCount: city.activity_total_last5months,
              })}
        </p>
      </div>
    </a>
  );
};

const WidgetListItemSmallActivity = ({ activity }) => {
  const { t } = useTrans();
  const title = accessorActivityTitle(t, activity);
  const { displayDate } = useDate();

  const url = explorePath(
    [activity.area.slug_path, "activities", activity.id].join("/")
  );
  return (
    <a href={url} className="widget-list-item widget-list-item-small">
      <div className="widget-list-item-content">
        <p className="widget-list-item-text">{title}</p>
        <p className="widget-list-item-text widget-list-item-text-light widget-list-item-text-small text-capitalize">
          {displayDate(activity.date_occured)}
        </p>
      </div>
    </a>
  );
};

const UserCurrentCityWidget = ({ city, activities }) => {
  const { t } = useTrans();
  return (
    <WidgetContainer
      title={t("Stay Informed About Your City", {
        CityName: city.display_name,
      })}
      description={t(
        "Stay up-to-date on your city. See recent activity in your area."
      )}
      viewAllText={t("View more from {{CityName}}", {
        CityName: city.display_name,
      })}
      viewAllUrl={explorePath(city.slug_path)}
    >
      <div className="widget-list">
        <WidgetListItemCity city={city} />
        {activities.map((activity) => (
          <WidgetListItemSmallActivity key={activity.id} activity={activity} />
        ))}
      </div>
    </WidgetContainer>
  );
};

export default UserCurrentCityWidget;
