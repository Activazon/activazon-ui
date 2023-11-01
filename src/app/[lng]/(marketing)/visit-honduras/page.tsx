"use client";

interface SectionProps {
  children: any;
  color: "blue" | "white" | "slate";
}

const Section = ({ children, color }: SectionProps) => {
  const colorClassName = {
    blue: "tw-bg-blue-light",
    white: "tw-bg-white",
    slate: "tw-bg-slate-200",
  }[color];
  return (
    <div className={"tw-w-full tw-py-12 " + colorClassName}>
      <div className="tw-w-full tw-max-w-6xl tw-px-3 tw-mx-auto">
        {children}
      </div>
    </div>
  );
};

const Point = ({ children }: { children: React.ReactNode }) => (
  <div className="tw-text-blue-dark tw-text-lg tw-bg-blue-light/20 tw-p-4 tw-rounded-2xl tw-shadow-xll tw-border-2 tw-border-blue-light tw-flex tw-flex-row tw-gap-3 tw-items-center hover:tw-scale-110 tw-ease-in-out tw-duration-300">
    <i className="bi bi-asterisk tw-text-2xl tw-text-blue-light"></i>
    <p>{children}</p>
  </div>
);

const Page = () => {
  return (
    <>
      {/* what the user will get */}
      <Section color="blue">
        <div className="tw-flex tw-flex-row tw-pb-12 tw-gap-8">
          <div className="tw-flex tw-flex-shrink tw-flex-col tw-gap-3 tw-justify-center">
            <h1 className="tw-text-6xl tw-font-bold tw-text-white">
              Explore Honduras&apos; Secrets with
              <br />
              Peace of Mind
            </h1>
            <p className="tw-text-xl tw-font-medium tw-text-white">
              Find Peace of Mind Knowing You&apos;re Safe while You to Explore
              with Confidence.
            </p>
          </div>
          <div className="tw-flex tw-flex-shrink-0">
            <div className="tw-bg-blue-dark/50 tw-shadow-xl tw-rounded-2xl tw-aspect-[16/9] tw-w-[500px]">
              {/*  */}
            </div>
          </div>
        </div>
      </Section>
      {/* the problem with the way things are done */}
      <Section color="white">
        <div className="tw-flex tw-flex-col tw-gap-10">
          <h1 className="tw-text-blue-dark tw-text-5xl tw-font-bold tw-text-left">
            Honestly, We Get It.
          </h1>
          <div className="tw-flex tw-flex-row tw-gap-10 tw-justify-evenly">
            {/* first issue our customers have */}
            <div className="tw-w-full tw-flex tw-flex-col tw-gap-5">
              <p className="tw-text-2xl tw-font-bold tw-text-blue-dark">
                You can&apos;t enjoy yourself while feeling anxious or unsure of
                your surroundings.
              </p>
              <Point>
                The constant worry about your safety can cast a shadow on your
                travel experience. Preventing you from enjoying yourself.
              </Point>
              <Point>Hard to find information relevant to you</Point>
              <Point>
                Googling news articles can be time-consuming, especially if the
                news is in a language you don&apos;t understand.
              </Point>
            </div>

            <div className="tw-w-2/3 tw-flex tw-items-center tw-justify-center">
              <img src="/assets/landing/undraw_Departing_re_mlq3.png" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Page;
