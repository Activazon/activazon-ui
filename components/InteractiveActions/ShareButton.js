import { useTrans } from "lib/trans";
import { useRouter } from "next/router";
import { useCallback } from "react";

const ShareButton = ({ placeManager }) => {
  const { t } = useTrans();
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const shareUrl = `${origin}${asPath}`;
  const shareTitle = t(
    "Stay informed with real-time crime updates in {{placeDisplayName}}",
    {
      placeDisplayName: placeManager.placeDisplayName,
    }
  );
  const shareText = t(
    "Get the latest updates on crime in {{placeDisplayName}} straight to your phone or desktop with Activazon. Our platform keeps you informed and aware of what's happening in your community in real-time. Stay safe and aware with Activazon's crime updates.",
    {
      placeDisplayName: placeManager.placeDisplayName,
    }
  );

  const onShare = useCallback(
    (e) => {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        console.error("Share not supported");
      }
    },
    [placeManager, shareTitle, shareText, shareUrl]
  );
  return (
    <button className="btn btn-outline-primary border-0 py-2" onClick={onShare}>
      <p className="m-0 fs-5">
        <i className="bi bi-share-fill"></i>
      </p>
    </button>
  );
};

export default ShareButton;
