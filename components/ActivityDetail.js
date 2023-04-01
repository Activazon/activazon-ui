import GeoWithImagesTile from "components/GeoWithImagesTile";
import SourceArticle from "components/SourceArticle";
import { useTrans } from "lib/trans";
import { useDate } from "lib/date";

const ActivityDetail = ({ activity, locale }) => {
  const { t } = useTrans();
  const { displayDate } = useDate();
  const summary = {
    en: activity.summary_en,
    es: activity.summary_es,
  }[locale];

  return (
    <div className="container pt-3">
      <p className="lead mb-1 text-capitalized">{t("Summary")}</p>
      <p className="text-capitalize mb-2">
        <b>{displayDate(activity.date_occured)}</b>
      </p>
      <p>{summary}</p>

      <SourceArticle sourceArticle={activity.source_article} />
    </div>
  );
};

export default ActivityDetail;
