import { useEffect, useState } from "react";

interface SubscribePopupProps {
  label: string;
}

const PopupMessage = ({ label }: SubscribePopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`tw-fixed tw-z-50 tw-left-1/2 tw-top-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw--translate-x-(-50%) tw--translate-y-(-50%) tw-text-center tw-pointer-events-none ${
        isVisible ? "animate--fadein" : "animate--fadeout"
      }`}
    >
      <div className="tw-bg-black/60 tw-px-3 tw-py-1 tw-rounded-xl tw-backdrop-blur-sm tw-shadow-2xl tw-text-white tw-font-semibold">
        <p>{label}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
