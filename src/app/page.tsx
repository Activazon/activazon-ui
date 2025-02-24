import { Fragment, ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  House03Icon as HouseIcon,
  Store01Icon as StoreIcon,
  PoliceCapIcon as CrimeIcon,
  TrafficLightIcon as TrafficIcon,
  CourtLawIcon as LawIcon,
  ArrowRight02Icon as JoinIcon,
} from "@hugeicons/core-free-icons";
import { Waitlist } from "@clerk/nextjs";

const Banner = () => (
  <div className="w-fit flex flex-col gap-3 px-4">
    <img
      src="/logo.svg"
      alt="Activazon Logo"
      className="w-full max-w-[250px] md:max-w-[300px]"
    />
    <p className="md:text-lg font-medium">
      Neighborhood Intelligence for Decision-Makers
    </p>
  </div>
);

const UseCase = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) => (
  <div className="w-full px-3 flex flex-row items-center group hover:bg-white/[0.03] transition-colors duration-200">
    <div className="w-20 flex justify-center items-center">{icon}</div>
    <div className="flex flex-col flex-1 group-last:border-b-0 border-b border-white/5 group-hover:border-transparent py-4">
      <p className="font-semibold text-lg">{title}</p>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const JoinWaitListButton = () => {
  return (
    <Fragment>
      <div className="w-full px-4 md:px-0">
        <button className="w-full bg-[#FFC95C]/80 hover:bg-[#FFC95C] border border-white/30 text-black font-semibold py-3 md:rounded-2xl text-lg flex flex-row items-center justify-center gap-2">
          <span>&#8594;</span>
          <span>Join the Waitlist</span>
        </button>
      </div>
    </Fragment>
  );
};

const Icon = ({ icon }: { icon: any }) => (
  <HugeiconsIcon icon={icon} size={35} color="#FFC95C" strokeWidth={0.1} />
);

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px] flex flex-col justify-end gap-5">
        <Banner />

        <div className="w-full flex flex-col bg-white/[0.03] md:rounded-2xl border-t border-b border-white/5 md:border overflow-hidden">
          <UseCase
            icon={<Icon icon={HouseIcon} />}
            title="Real Estate Trends"
            description="Property values, market shifts & investment opportunities."
          />
          <UseCase
            icon={<Icon icon={StoreIcon} />}
            title="Business Openings & Closures"
            description="Stay ahead of market shifts & local economy trends."
          />
          <UseCase
            icon={<Icon icon={CrimeIcon} />}
            title="Crime & Safety Reports"
            description="Understand neighborhood risks & safety changes."
          />
          <UseCase
            icon={<Icon icon={TrafficIcon} />}
            title="Infrastructure & Transit Changes"
            description="Be informed about road expansions & city planning."
          />
          <UseCase
            icon={<Icon icon={LawIcon} />}
            title="Regulatory & Policy Updates"
            description="See how new laws impact property & businesses."
          />
        </div>
        <JoinWaitListButton />
      </div>
    </div>
  );
}
