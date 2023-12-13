"use client";
import Link from "next/link";

const NavigationBarMenu = () => {
  return (
    <Link
      className="tw-text-blue-dark tw-text-[1.5rem] tw-z-[10000] tw-px-3 hover:tw-bg-blue-light/20 tw-rounded-md"
      href="/menu"
      title="Menu"
      role="menu"
    >
      <i className="bi bi-list" />
    </Link>
  );
};

export default NavigationBarMenu;
