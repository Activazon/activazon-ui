"use client";
import Image from "next/image";
import Link from "next/link";
import NavigationBarMenu from "./NavigationBarMenu";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  // react listen for scroll event
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const nav = document.querySelector("nav");
      if (nav) {
        if (window.scrollY > 0) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
      }
    });
  }, []);

  return (
    <div className="tw-sticky tw-top-0 tw-w-full tw-z-50 tw-h-[62px]">
      <div
        className={`tw-fixed tw-w-full tw-bg-white tw-shadow-2xl ${
          !hasScrolled ? "tw-shadow-transparent" : ""
        }`}
      >
        <nav className="tw-py-3 tw-w-full tw-px-3 tw-flex tw-flex-row tw-justify-between tw-max-w-4xl tw-mx-auto">
          <Link
            className="tw-text-[1.5rem] tw-font-medium tw-no-underline tw-text-blue-light tw-flex tw-gap-3"
            href="/home"
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
