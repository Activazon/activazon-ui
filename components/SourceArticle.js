import { useTrans } from "lib/trans";
import WidgetContainer from "components/WidgetContainer";

const SourceArticle = ({ sourceArticle }) => {
  const { t } = useTrans();

  return (
    <WidgetContainer
      title={t("Source")}
      description={t(
        "Learn more about this incident with these in-depth news articles"
      )}
    >
      <div className="widget-list">
        <a href={sourceArticle.source_url}>
          <div className="widget-list-item">
            <div className="widget-list-item-image">
              <img
                src={"/sources/" + sourceArticle.source_name + ".jpg"}
                alt={sourceArticle.source_display_name}
              />
            </div>
            <div className="widget-list-item-content">
              <p className="widget-list-item-text">
                <b className="me-1">{sourceArticle.source_display_name}</b>
                {sourceArticle.source_title}
              </p>
            </div>
          </div>
        </a>
      </div>
    </WidgetContainer>
  );
};

export default SourceArticle;
