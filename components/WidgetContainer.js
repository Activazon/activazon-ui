const WidgetContainer = ({ title, description, children, viewAllUrl }) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <p className="widget-title">{title}</p>
        {description && <p className="widget-description">{description}</p>}
      </div>
      {children}
      {viewAllUrl && (
        <div className="widget-footer">
          <a href={viewAllUrl} className="widget-footer-link">
            View all
          </a>
        </div>
      )}
    </div>
  );
};

export default WidgetContainer;
