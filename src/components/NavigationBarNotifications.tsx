import { useUnopenedIncidents } from "@/lib/badge";
import { shouldInstall } from "@/lib/browser";
import usePwaInstallHook from "@/lib/pwaInstallHook";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationBarNotifications = () => {
  const { showBadge, altMessage } = useUnopenedIncidents();
  const openModal = usePwaInstallHook();
  const [shouldOpenModalInstead, setShouldOpenModalInstead] = useState(false);
  useEffect(() => {
    setShouldOpenModalInstead(shouldInstall());
  }, []);
  const href = shouldOpenModalInstead ? "#" : "/notifications";

  const onClickCheck = () => {
    if (shouldOpenModalInstead) {
      openModal();
    }
  };

  return (
    <div>
      <Link
        href={href}
        onClick={onClickCheck}
        className="tw-text-blue-dark tw-text-[1.5rem] tw-px-3 hover:tw-bg-blue-light/20 tw-rounded-md"
        title={altMessage}
      >
        <i className="bi bi-bell-fill tw-relative">
          {showBadge && (
            <div className="tw-absolute tw-bottom-0 tw-left-4 tw-w-3 tw-h-3 tw-bg-blue-light tw-rounded-full tw-shadow"></div>
          )}
        </i>
      </Link>
    </div>
  );
};

export default NavigationBarNotifications;
