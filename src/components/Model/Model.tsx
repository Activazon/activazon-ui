import React from "react";
import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";

interface ModalProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

const Modal = ({ children }: ModalProps) => {
  const dispatch = useActivazonDispatch();
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      setModel({
        modelName: undefined,
        modalData: undefined,
      })
    );
    console.log("HELLO ");
  };
  const handleCloseByTint = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      // only close if the click was on the binding element
      handleClose(event);
    }
  };

  return (
    <div
      className="tw-fixed tw-top-0 tw-left-0 tw-z-[10000000] tw-h-screen tw-w-screen tw-backdrop-blur-md tw-bg-white/30 tw-transition-opacity tw-flex tw-justify-center tw-items-end md:tw-items-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleCloseByTint}
    >
      <div className="tw-relative tw-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] tw-bg-white tw-max-h-full tw-max-w-full md:tw-min-w-[550px] tw-w-full md:tw-w-auto tw-pt-9 tw-px-4 md:tw-px-10 tw-pb-[6rem] md:tw-pb-9 tw-flex tw-flex-col tw-gap-6 tw-rounded-t-3xl md:tw-rounded-3xl">
        <button
          className="tw-absolute tw-top-4 tw-right-4 tw-cursor-pointer tw-z-50 tw-bg-slate-200 tw-rounded-full tw-aspect-square tw-w-8 tw-flex tw-justify-center tw-items-center tw-text-blue-dark"
          onClick={handleClose}
          role="close"
        >
          <i className="bi bi-x tw-text-2xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
