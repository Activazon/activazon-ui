import { useTrans } from "lib/trans";
import WidgetContainer from "components/WidgetContainer";

const WidgetListItem = () => (
  <a href="#" className="widget-list-item">
    <div className="widget-list-item-image">
      <img src="https://api.mapbox.com/styles/v1/activazon/clcwih7xp002c14l6ealh9xmf/static/url-https%3A%2F%2Fstorage.googleapis.com%2Factivazon-ublic%2Fred-marker-sm4.png(-88.2759224,13.9612612)/[-88.27963109999999,13.9594113,-88.27214239999999,13.9641175]/299x299@2x?access_token=pk.eyJ1IjoiYWN0aXZhem9uIiwiYSI6ImNsY3ZuMmNldjFrd3EzcW12Y2ltNTl4ZWoifQ.N_cbWjPrnheehGi7zlqyVw&logo=false" />
    </div>
    <div className="widget-list-item-content">
      <p className="widget-list-item-title">Tegucigalpa (City)</p>
      <p className="widget-list-item-text widget-list-item-text-light">
        10 activities detected in the last week
      </p>
    </div>
  </a>
);

const WidgetListItemSmall = () => (
  <a href="#" className="widget-list-item widget-list-item-small">
    <div className="widget-list-item-content">
      <p className="widget-list-item-text">
        Protest detected in <b>Colonia Kennedy</b>
      </p>
      <p className="widget-list-item-text widget-list-item-text-light widget-list-item-text-small">
        Thursday
      </p>
    </div>
  </a>
);

const UserCurrentCityWidget = ({ sourceArticle }) => {
  const { t } = useTrans();
  return (
    <WidgetContainer
      title={t("Stay Informed About Your City", {
        CityName: "Tegucigalpa",
      })}
      description={null}
      viewAllUrl="/"
    >
      <div className="widget-list">
        <WidgetListItem />

        <WidgetListItemSmall />
        <WidgetListItemSmall />
        <WidgetListItemSmall />
      </div>
    </WidgetContainer>
  );
};

export default UserCurrentCityWidget;
