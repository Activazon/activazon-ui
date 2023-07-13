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
    <div className="widget widget-primary pointer" onClick={goToA2hs}>
      <div className="widget-list">
        <div className="widget-list-item">
          <div className="widget-list-item-image widget-list-item-image-small d-flex align-items-center justify-content-center">
            <i className="bi bi-bell-fill display-5 animate-bell"></i>
          </div>
          <div className="widget-list-item-content">
            <h6 className="widget-list-item-title">
              {i("Stay alert and stay safe with Activazon")}
            </h6>
            <p className="widget-list-item-text widget-list-item-text-light">
              {i(
                "Unlock features like notifications about crime in areas that matter most to you."
              )}
            </p>
            <button onClick={goToA2hs} className="btn btn-cta">
              {i("Add To Home Screen")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="card card-body tile tile-cta">
  //     <div className="text-center row gy-3">
  //       <div className="col-12">

  //       </div>
  //       <div className="col-12">
  //         <h2 className="tile-title">
  //           {i("Stay alert and stay safe with Activazon")}
  //         </h2>
  //       </div>
  //       <div className="col-12">
  //         <p className="tile-description">
  //           {i(
  //             "Add Activazon to your home screen to get real-time notifications about crime in your area."
  //           )}
  //         </p>
  //       </div>
  //       <div className="col-12">
  //         <button onClick={goToA2hs} className="btn btn-tile">
  //           {i("Add To Home Screen")}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default A2hsCtaTile;
