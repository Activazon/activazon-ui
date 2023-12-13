import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { shouldInstall } from "./browser";

const usePwaInstallHook = () => {
  const dispatch = useActivazonDispatch();
  const [shouldOpenModalInstead, setShouldOpenModalInstead] = useState(false);

  useEffect(() => {
    setShouldOpenModalInstead(shouldInstall());
  }, []);

  const openModal = () => {
    dispatch(
      setModel({
        name: "pwa_install",
        data: undefined,
      })
    );
  };
  return { openModal, shouldOpenModalInstead };
};

export default usePwaInstallHook;
