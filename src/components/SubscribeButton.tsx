import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import { getNotificationHandlingDecision } from "@/lib/push_notifications";

const SubscribeButton = () => {
  const disaptch = useActivazonDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (getNotificationHandlingDecision()) {
      case "subscribe":
        alert("Notifications are enabled");
        break;
      case "ask_permission":
        alert("Ask permission");
        break;
      case "redirect_to_a2hs":
        disaptch(
          setModel({
            name: "pwa_install",
            data: undefined,
          })
        );
        return;
      case "open_in_browser":
        alert("Open in browser");
        break;
      case "unsupported":
        alert("Unsupported");
        break;
    }
  };

  return (
    <button
      className="tw-rounded-xl tw-aspect-square tw-w-10 tw-text-blue-dark hover:tw-bg-blue-light hover:tw-text-white"
      onClick={onClick}
    >
      <i className="bi bi-bell-fill tw-text-xl" />
    </button>
  );
};

export default SubscribeButton;
