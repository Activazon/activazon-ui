import GeoWithImagesTile from "components/GeoWithImagesTile";
import ChangeLanguageLink from "components/ChangeLaugageLink";
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

      <ChangeLanguageLink />

      <p className="mt-4">
        <b>
          {t(
            "Learn more about this incident with these in-depth news articles"
          )}
        </b>
      </p>
      <GeoWithImagesTile
        image={"/sources/" + activity.source_article.source_name + ".jpg"}
        title={activity.source_article.source_display_name}
        description={activity.source_article.source_title}
        href={activity.source_article.source_url}
      />
    </div>
  );
};

export default ActivityDetail;
