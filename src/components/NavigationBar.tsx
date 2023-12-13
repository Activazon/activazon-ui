"use client";
import Image from "next/image";
import Link from "next/link";
import NavigationBarMenu from "./NavigationBarMenu";
import NavigationBarNotifications from "./NavigationBarNotifications";
import NotificationBarDownload from "./NotificationBarDownload";
import { useEffect } from "react";

const NavigationBar = () => {
  useEffect(() => {
    const onScroll = (e) => {
      console.log(
        "e.target.documentElement.scrollTop",
        e.target.documentElement.scrollTop
      );
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="tw-w-full tw-z-50 tw-h-[62px]">
      <div className="tw-fixed tw-w-full tw-bg-white tw-z-50">
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
          <div className="tw-flex tw-flex-row">
            <NotificationBarDownload />
            <NavigationBarNotifications />
            <NavigationBarMenu />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
