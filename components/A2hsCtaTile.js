import Link from "next/link";
import Image from "next/image";
import { useTrans } from "lib/trans";
import { useRouter } from "next/router";
import { track } from "lib/track";

const A2hsCtaTile = ({}) => {
  const router = useRouter();
  const { i } = useTrans();

  const goToA2hs = (e) => {
    e?.preventDefault();
    track("cta.click.a2hs");
    router.push("/a2hs");
  };

  return (
    <div className="card card-body tile tile-cta">
      <div className="row text-center gy-3">
        <div className="col-12">
          <Image
            src="/icons/push-notification.svg"
            width={90}
            height={90}
            alt="Push Notification"
          />
        </div>
        <div className="col-12">
          <h2 className="tile-title">
            {i("Stay alert and stay safe with Activazon")}
          </h2>
        </div>
        <div className="col-12">
          <p className="tile-description">
            {i(
              "Add us to your home screen to get real-time notifications about crime in your area."
            )}
          </p>
        </div>
        <div className="col-12">
          <button onClick={goToA2hs} className="btn btn-tile">
            {i("Add To Home Screen")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default A2hsCtaTile;
