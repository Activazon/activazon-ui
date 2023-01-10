import { useState } from "react";
const SubscribeModal = () => {
  const [view, setView] = useState("form");
  const onAcceptClick = (e) => {
    e?.preventDefault();
    setView("thanks");
  };
  const onDeclineClick = (e) => {
    // e?.preventDefault();
  };

  return (
    <div
      className="modal fade"
      id="cta-signUpModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="vw-100 vh-100 d-flex align-items-center">
        <div className="modal-dialog w-100">
          <div className="modal-content">
            {view === "form" && (
              <div className="modal-body text-left">
                <h2 className="model-title mb-3">Be one of the first</h2>
                <p className="model-info">
                  This feature is currently in beta and we are only giving
                  access to a few users before we release it to the public.
                </p>

                <p className="model-info">
                  Enter your email or whatsapp below if you would like to learn
                  more.
                </p>

                <input
                  type="search"
                  className="form-control"
                  placeholder="Email or WhatsApp"
                />
                <button
                  className="btn btn-cta mt-3 w-100"
                  onClick={onAcceptClick}
                >
                  Sign Me Up!
                </button>
                <button
                  data-bs-dismiss="modal"
                  className="btn  mt-1 w-100"
                  onClick={onDeclineClick}
                >
                  Not interested
                </button>
              </div>
            )}
            {view === "thanks" && (
              <div className="modal-body text-left">
                <h2 className="model-title mb-3">Thank you for your help</h2>
                <p className="model-info">
                  We will notify you through Email or WhatsApp soon.
                </p>
                <button data-bs-dismiss="modal" className="btn  mt-1 w-100">
                  Okay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerCtaSubscribe = () => {
  return (
    <>
      <SubscribeModal />
      <div className="row mt-4 cta-banner">
        <div className="col-12 col-md-6">
          <p className="cta-banner-info text-left mb-1">
            Get notified when something happens in <b>Colonia 20 Marzo</b>
          </p>
          <button
            className="btn btn-cta-banner w-100"
            data-bs-toggle="modal"
            data-bs-target="#cta-signUpModal"
          >
            <i className="bi bi-bell-fill me-2" />
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default BannerCtaSubscribe;
