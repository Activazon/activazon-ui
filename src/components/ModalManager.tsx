"use client";
import { useActivazonSelector } from "@/store/hooks";
import PwaInstalModal from "./Model/PwaInstallModal";
import OpenInBrowserModal from "./Model/OpenInBrowserModal";
import UnsupportedModal from "./Model/UnsupportedModal";

const ModalManager = () => {
  const { name, data } = useActivazonSelector((state) => state.modal);

  if (name == "pwa_install") {
    return <PwaInstalModal data={data} />;
  }

  if (name == "open_in_browser") {
    return <OpenInBrowserModal data={data} />;
  }

  if (name == "unsupported") {
    return <UnsupportedModal data={data} />;
  }

  return null;
};

export default ModalManager;
