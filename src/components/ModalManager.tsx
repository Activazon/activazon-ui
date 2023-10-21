"use client";
import { useActivazonSelector } from "@/store/hooks";
import PwaInstalModel from "./Model/PwaInstallModel";

const ModalManager = () => {
  const { modelName, modalData } = useActivazonSelector((state) => state.modal);

  if (modelName == "pwa_install") {
    return <PwaInstalModel data={modalData} />;
  }

  return null;
};

export default ModalManager;
