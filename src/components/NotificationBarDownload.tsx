import { shouldInstall } from "@/lib/browser";
import usePwaInstallHook from "@/lib/pwaInstallHook";

const NotificationBarDownload = () => {
  const openModal = usePwaInstallHook();

  if (!shouldInstall()) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
        className="tw-text-blue-dark tw-text-[1.5rem] tw-px-3 hover:tw-bg-blue-light/20 tw-rounded-md"
      >
        <i className="bi bi-download tw-relative" />
      </button>
    </div>
  );
};

export default NotificationBarDownload;
