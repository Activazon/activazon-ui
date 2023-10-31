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
      <Section color="slate">
        <div className="tw-flex tw-flex-col tw-gap-10">
          <h1 className="tw-text-blue-dark tw-text-5xl tw-font-bold tw-text-center">
            Honestly, We Get It.
          </h1>
          <div className="tw-flex tw-flex-row tw-gap-10 tw-justify-evenly">
            <div className="tw-bg-slate-200 tw-w-full tw-rounded-3xl tw-px-10 tw-py-10 tw-shadow-2xl tw-flex tw-flex-col tw-gap-3">
              <p className="tw-text-2xl tw-font-bold tw-text-blue-dark">
                You want to explore, but you don&apos;t know what is happening
                around you.
              </p>
              <p className="tw-text-gray-dark">
                It&apos;s frustrating to arrive in a new place, eager to
                explore, only to be in the dark about safety of the area you
                will be staying
              </p>
              <p className="tw-text-gray-dark">
                You might try relying on generic travel guides, but they often
                lack real-time information.
              </p>
              <p className="tw-text-gray-dark">
                Googling news articles can be time-consuming, especially if the
                news is in a language you don&apos;t understand.
              </p>
            </div>
            <div className="tw-bg-slate-200 tw-w-full tw-rounded-3xl tw-px-10 tw-py-10 tw-shadow-2xl tw-flex tw-flex-col tw-gap-3">
              <p className="tw-text-2xl tw-font-bold tw-text-blue-dark">
                You can&apos;t enjoy yourself while feeling anxious or unsure of
                your surroundings.
              </p>
              <p className="tw-text-gray-dark">
                The constant worry about your safety can cast a shadow on your
                travel experience. Preventing you from enjoying yourself.
              </p>
              <p className="tw-text-gray-dark">
                Hard to find information relevant to you
              </p>
              <p className="tw-text-gray-dark">
                Googling news articles can be time-consuming, especially if the
                news is in a language you don&apos;t understand.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Page;
