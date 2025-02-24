"use client";
import { Fragment, useState } from "react";
import { Waitlist } from "@clerk/nextjs";

const JoinWaitListButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the background is clicked
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  return (
    <Fragment>
      <div
        className={`w-screen h-screen z-50 bg-black/20 backdrop-blur-md fixed top-0 left-0 flex justify-center items-center transition-all ${
          show
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
      >
        <Waitlist />
      </div>
      <div className="w-full px-4 md:px-0 sticky md:relative bottom-0 md:bottom-auto py-3 md:py-0 bg-black/10 backdrop-blur border-t border-white/10 md:border-0 md:backdrop-blur-0 md:bg-transparent">
        <button
          className="w-full bg-[#FFC95C]/80 hover:bg-[#FFC95C] border border-white/30 text-black font-semibold py-3 rounded-2xl text-lg flex flex-row items-center justify-center gap-2"
          onClick={() => setShow(true)}
        >
          <span>&#8594;</span>
          <span>Join the Waitlist</span>
        </button>
      </div>
    </Fragment>
  );
};

export default JoinWaitListButton;
