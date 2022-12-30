import Head from "../../components/Head";
import Image from "next/image";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import { useTrans } from "../../lib/trans";
import { useDate } from "../../lib/date";
import { getActivity } from "../../lib/api";

const Source = ({ sourceName, sourceDisplayName, sourceUrl, sourceTitle }) => (
  <li className="list-group-item">
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none d-flex align-items-center"
    >
      <Image
        src={`/sources/${sourceName}.jpg`}
        width={80}
        height={80}
        alt="Source Logo"
        className="me-3"
      />
      <div>
        <p className="mb-0 text-theme-black">
          <b>{sourceTitle || sourceName}</b>
        </p>
        <p className="mb-0 text-theme-default">
          <small>{sourceDisplayName}</small>
        </p>
      </div>
    </a>
  </li>
);

export default function Home({ activity }) {
  const { i, locale } = useTrans();
  const { displayDate } = useDate();
  const title = i("{{activity_type_name}} in {{neighbourhood_name}}", {
    activity_type_name: i(activity.activity_type.name),
    neighbourhood_name: activity.neighbourhood.name,
  });
  const summary = {
    en: activity.summary_en,
    es: activity.summary_es,
  }[locale];
  return (
    <>
      <Head title={title} />
      <body>
        <div className="page">
          <Nav
            pageTitle={i(activity.neighbourhood.country)}
            backUrl={`/c/${activity.neighbourhood.country}`}
          />
          <main>
            <Banner
              title={title}
              description={i("Reported {{date}}", {
                date: displayDate(activity.date_occured),
              })}
              showSearch={false}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> {i("Summary")}
              </p>

              <p className="lh-lg">{summary}</p>
            </div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> {i("Sources")}
              </p>
              <p>
                {i(
                  "This activity was detected by analyzing the following sources using AI."
                )}
              </p>

              <ul className="list-group">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                  href="https://elheraldo.hn/honduras/diana-rivera-sobreviviente-violencia-clama-ayuda-convertirse-ingeniera-forestal-unacifor-honduras-beca-siguatepeque-AG11535317"
                >
                  {activity.source_article && (
                    <Source
                      sourceName={activity.source_article.source_name}
                      sourceUrl={activity.source_article.source_url}
                      sourceTitle={activity.source_article.source_title}
                      sourceDisplayName={
                        activity.source_article.source_display_name
                      }
                    />
                  )}
                </a>
              </ul>
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps(context) {
  if (isNaN(context.params.id)) {
    return {
      notFound: true,
    };
  }

  const activityId = parseInt(context.params.id);
  const activity = await getActivity(activityId);

  if (!activity.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
    },
  };
}
