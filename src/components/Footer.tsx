"use client";
import { useEffect, useRef, useState } from "react";
import Content from "./Content/Content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import usePwaInstallHook from "@/lib/pwaInstallHook";

interface FooterButtonProps {
  href: string;
  label: string;
  iconName: string;
  active: boolean;
  extraClasses?: string;
  onClick?: () => void;
}

const FooterButton = ({
  href,
  label,
  iconName,
  active,
  extraClasses,
  onClick,
}: FooterButtonProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`tw-w-full tw-pt-3 footer-button focus:tw-bg-blue-light-2 tw-text-center tw-my-1 tw-rounded-lg ${
      extraClasses || ""
    } ${active ? "tw-text-blue-dark" : "tw-text-black/50"}`}
    aria-label={label}
  >
    <i className={`bi ${iconName} tw-text-2xl`}></i>
  </Link>
);

const useGetActivePathName = (paths: string[], def: string) => {
  const pathname = usePathname();
  const [activePathName, setActivePathName] = useState<string | null>(def);

  useEffect(() => {
    setActivePathName(def);
    for (let path of paths) {
      if (window.location.pathname.endsWith(path)) {
        setActivePathName(path);
      }
    }
  }, [pathname, paths, def]);
  return activePathName;
};

const Footer = () => {
  const { openModal, shouldOpenModalInstead } = usePwaInstallHook();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight);
    }
  }, [footerRef]);

  const activePathName = useGetActivePathName(
    ["/search", "/notifications", "/menu"],
    "/"
  );

  const onClickCheck = () => {
    if (shouldOpenModalInstead) {
      openModal();
    }
  };

  return (
    <>
      <footer
        ref={footerRef}
        className="tw-w-full tw-fixed tw-bottom-0 tw-left-0 tw-backdrop-blur-lg tw-bg-white/90 tw-pointer-events-auto tw-border-t md:tw-hidden"
      >
        <Content extraClasses="!tw-flex-row">
          <FooterButton
            href="/"
            label="Home"
            iconName="bi-house-fill"
            active={activePathName == "/"}
          />
          <FooterButton
            href="/search"
            label="Search"
            iconName="bi-search"
            active={activePathName == "/search"}
          />
          <FooterButton
            onClick={onClickCheck}
            href={shouldOpenModalInstead ? "#" : "/notifications"}
            label="Alerts"
            iconName="bi-bell-fill"
            active={activePathName == "/notifications"}
          />

          {!shouldOpenModalInstead && (
            <FooterButton
              href="/menu"
              label="Menu"
              iconName="bi-list"
              active={activePathName == "/menu"}
            />
          )}
          {shouldOpenModalInstead && (
            <FooterButton
              onClick={() => openModal()}
              href="#"
              label="Download App"
              iconName="bi-download"
              active={false}
              extraClasses="tw-text-white tw-bg-gradient-to-b tw-from-blue-light/80 tw-to-blue-500/70"
            />
          )}
        </Content>
      </footer>
      <div
        className="tw-w-full tw-mt-5 md:tw-hidden"
        style={{ height: footerHeight }}
      ></div>
    </>
  );
};
export default Footer;
