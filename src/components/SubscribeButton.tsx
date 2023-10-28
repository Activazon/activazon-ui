import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import {
  askPushNotificationPermission,
  getNotificationHandlingDecision,
} from "@/lib/push_notifications";
import { usePlaceSubscription } from "@/lib/subscriptions";
import PopupMessage from "./PopupMessage";
import { useDictionary } from "@/dictionaries";

interface SubscribeButtonProps {
  countrySlug: string;
  citySlug: string;
  areaSlug?: string;
}

const SubscribeButton = ({
  countrySlug,
  citySlug,
  areaSlug,
}: SubscribeButtonProps) => {
  const { t } = useDictionary();
  const disaptch = useActivazonDispatch();
  const {
    isSubscribed,
    isEnrolled,
    actionSuccessful,
    registerDevice,
    subscribeToPlace,
    unsubscribeToPlace,
  } = usePlaceSubscription({ countrySlug, citySlug, areaSlug });

  const enrollAndSubscribe = async () => {
    if (!isEnrolled()) {
      // make sure device is enrolled
      await registerDevice();
    }

    //  subscribe
    await subscribeToPlace();
  };

  const onSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (getNotificationHandlingDecision()) {
      case "subscribe":
        enrollAndSubscribe();
        break;
      case "ask_permission":
        askPushNotificationPermission().then(({ permission }) => {
          if (permission == "granted") {
            enrollAndSubscribe();
          } else {
            alert("Please enable notifications in app settings to continue");
          }
        });
        break;
      case "redirect_to_a2hs":
        // display pwa install instructions modal (ModalManager.tsx)
        disaptch(
          setModel({
            name: "pwa_install",
            data: undefined,
          })
        );
        return;
      case "open_in_browser":
        // display open in browser instructions modal (ModalManager.tsx)
        disaptch(
          setModel({
            name: "open_in_browser",
            data: undefined,
          })
        );
        break;
      case "unsupported":
        // display unsupported instructions modal (ModalManager.tsx)
        disaptch(
          setModel({
            name: "unsupported",
            data: undefined,
          })
        );
        break;
    }
  };

  const onUnsubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    unsubscribeToPlace();
  };

  return (
    <>
      {actionSuccessful && isSubscribed && (
        <PopupMessage label={t("popup:subscribed")} />
      )}
      {actionSuccessful && !isSubscribed && (
        <PopupMessage label={t("popup:unsubscribed")} />
      )}
      {!isSubscribed && (
        <button
          className="tw-rounded-xl tw-aspect-square tw-w-10 tw-text-blue-dark hover:tw-bg-blue-light hover:tw-text-white"
          onClick={onSubscribe}
        >
          <i className="bi bi-bell-fill tw-text-xl" />
        </button>
      )}
      {isSubscribed && (
        <button
          className="tw-rounded-xl tw-aspect-square tw-w-10 tw-text-gray-dark hover:tw-bg-slate-200 hover:tw-text-blue-dark"
          onClick={onUnsubscribe}
        >
          <i className="bi bi-bell-slash-fill tw-text-xl" />
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
