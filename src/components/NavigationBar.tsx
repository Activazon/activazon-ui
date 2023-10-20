"use client";
import Image from "next/image";
import Link from "next/link";
import NavigationBarMenu from "./NavigationBarMenu";

const NavigationBar = () => {
  return (
    <div className="tw-sticky tw-top-0 tw-w-full tw-z-50 tw-h-[62px]">
      <div className="tw-fixed tw-w-full tw-bg-white">
        <nav className="tw-py-3 tw-w-full tw-px-3 tw-flex tw-flex-row tw-justify-between tw-max-w-4xl tw-mx-auto">
          <Link
            className="tw-text-[1.5rem] tw-font-medium tw-no-underline tw-text-blue-light tw-flex tw-gap-3"
            href="/"
          >
            <Image
              src="/assets/icons/logo.svg"
              alt="Activazon"
              width={38}
              height={38}
            />
            Activazon
          </Link>
          <div className="flex-grow-1"></div>
          <NavigationBarMenu />
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
