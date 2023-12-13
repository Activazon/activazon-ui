import Content from "@/components/Content/Content";
import PageTitle from "@/components/PageTitle";

interface LayoutProps {
  children: React.ReactNode;
  subscriptions: React.ReactNode;
  languageSettings: React.ReactNode;
}

const Layout = ({ children, subscriptions, languageSettings }: LayoutProps) => {
  return (
    <Content extraClasses="tw-mb-4">
      <PageTitle title="Menu" />
      {children}
      {subscriptions}
      {languageSettings}
    </Content>
  );
};

export default Layout;
