"use client";
import { useDictionary } from "@/dictionaries";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useState } from "react";

interface MenuItemProps {
  icon: ReactNode;
  children: string;
  onClick?: () => void;
}

const MenuItem = ({ children, icon, onClick }: MenuItemProps) => {
  return (
    <button
      className="tw-whitespace-nowrap tw-px-4 tw-py-2 first:tw-pt-4 last:tw-pb-4 tw-min-w-full tw-text-left tw-border-b tw-border-slate-200 hover:tw-bg-blue-light hover:tw-text-white last:tw-border-b-0 tw-flex tw-gap-2 tw-items-center tw-text-blue-dark"
      onClick={onClick}
    >
      <span className="tw-text-lg">{icon}</span>
      <span>{children}</span>
    </button>
  );
};

const NavigationBarMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { t, locale } = useDictionary();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuToggle = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    setIsMenuOpen((prev) => !prev);
  };

  const redirectAndClose = (url: string) => {
    return () => {
      router.push(url);
      setIsMenuOpen(false);
    };
  };

  const changeLanguageUrl =
    locale == "es"
      ? pathname.replace("/es", "/en")
      : pathname.replace("/en", "/es");

  // const onShareApp = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share()
  //       .then(() => setIsMenuOpen(false))
  //       .catch((error) => alert("Error sharing"));
  //   }
  // };

  return (
    <div className="tw-relative">
      <button
        className={"tw-text-blue-bright tw-text-[1.5rem] tw-z-[10000]"}
        onClick={onMenuToggle}
      >
        <i className="bi bi-list" />
      </button>
      {isMenuOpen && (
        <>
          <div
            className="tw-fixed tw-left-0 tw-top-0 tw-w-full tw-h-full tw-backdrop-blur-2xl tw-bg-white/30 md:tw-opacity-0"
            onClick={onMenuToggle}
          />
          <div className="tw-visible tw-absolute tw-bottom--full tw-right-0 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-2xl tw-min-w-[200px] tw-shadow-2xl tw-overflow-hidden">
            {/* <MenuItem
              icon={<i className="bi bi-person-fill-lock" />}
              onClick={redirectAndClose("/account/signup")}
            >
              {t("menu:signup")}
            </MenuItem> */}
            {/* <MenuItem
              icon={<i className="bi bi-box-arrow-down" />}
              onClick={redirectAndClose("/install_app")}
            >
              {t("menu:install_app")}
            </MenuItem> */}
            <MenuItem
              icon={<i className="bi bi-house-fill" />}
              onClick={redirectAndClose("/")}
            >
              {t("menu:home")}
            </MenuItem>
            {/* <MenuItem
              icon={<i className="bi bi-hearts" />}
              onClick={onShareApp}
            >
              {t("menu:share_app")}
            </MenuItem> */}
            <MenuItem
              icon={<i className="bi bi-translate" />}
              onClick={redirectAndClose(changeLanguageUrl)}
            >
              {t("menu:language", {
                language:
                  locale == "en"
                    ? t("language:spanish")
                    : t("language:english"),
              })}
            </MenuItem>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationBarMenu;
