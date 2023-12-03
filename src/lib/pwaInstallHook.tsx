import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";

const usePwaInstallHook = () => {
  const dispatch = useActivazonDispatch();

  const openModel = () => {
    dispatch(
      setModel({
        name: "pwa_install",
        data: undefined,
      })
    );
  };
  return openModel;
};

export default usePwaInstallHook;
