"use client";
import { useActivazonSelector } from "@/store/hooks";
import PwaInstalModel from "./Model/PwaInstallModel";

const ModalManager = () => {
  const { name, data } = useActivazonSelector((state) => state.modal);

  if (name == "pwa_install") {
    return <PwaInstalModel data={data} />;
  }

  return null;
};

export default ModalManager;
