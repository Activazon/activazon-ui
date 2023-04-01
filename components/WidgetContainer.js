const WidgetContainer = ({ title, description, children }) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <p className="widget-title">{title}</p>
        {description && <p className="widget-description">{description}</p>}
      </div>
      {children}
    </div>
  );
};

export default WidgetContainer;
