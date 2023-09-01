import { useCallback, forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { track } from "lib/track";
import { useUser } from "lib/user";
import { useTrans } from "lib/trans";
import { isDisplayModeStandalone } from "lib/pwa";

const NavMenuItem = ({ icon, label, active, href, onClick }) => {
  return (
    <Link
      className={`tw-py-2 tw-no-underline ${active ? " active" : ""}`}
      id="v-pills-home-tab"
      data-toggle="pill"
      href={href}
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      onClick={onClick}
    >
      <p className="tw-m-0 tw-text-blue-dark">
        {icon}
        {label}
      </p>
    </Link>
  );
};

const NavMenu = forwardRef(({ open, close }, ref) => {
  const router = useRouter();
  const user = useUser();
  const { t } = useTrans();
  const isAuthenticated = !!user;
  const localButtonLabel =
    router.locale === "en"
      ? "Cambiar idioma a Español"
      : "Change Language to English";
  const toggleLocale = async () => {
    // switch to the other locale
    const nextLocale = router.locale === "en" ? "es" : "en";
    track("nav.menu.locale", { locale: nextLocale });
    await router.push(
      { pathname: router.asPath, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
    close();
  };
  const isActive = useCallback(
    (path) => {
      return path === router.asPath;
    },
    [router.asPath]
  );

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="tw-px-3 tw-w-full tw-max-w-4xl tw-mx-auto">
        <div
          ref={ref}
          className="tw-w-full tw-mb-3 tw-px-3 tw-flex tw-flex-col tw-bg-slate-200 tw-border-[1px] tw-border-slate-200 tw-rounded-lg tw-shadow-2xl"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <NavMenuItem
            icon={<i className="bi bi-binoculars me-3" />}
            label={t("Explore")}
            active={isActive("/")}
            href="/"
          />
          {!isDisplayModeStandalone() && (
            <NavMenuItem
              icon={<i className="bi bi-box-arrow-in-down me-3" />}
              label={t("Add To Home Screen")}
              href={{
                pathname: "/a2hs",
              }}
            />
          )}
          {!isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-box-arrow-in-right me-3" />}
              label={t("Sign In")}
              active={isActive("/app")}
              href={{
                pathname: "/app",
                query: { callbackUrl: router.asPath },
              }}
            />
          )}
          {isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-person-circle me-3" />}
              label={t("Account")}
              href="/account"
              active={isActive("/account")}
            />
          )}
          <NavMenuItem
            icon={<i className="bi bi-translate me-3" />}
            label={localButtonLabel}
            href="#"
            active={false}
            onClick={toggleLocale}
          />
          {isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-box-arrow-left me-3" />}
              label={t("Log Out")}
              href="#"
              active={false}
              onClick={async () => {
                await signOut({
                  redirect: false,
                });
                router.push("/logout");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default NavMenu;
