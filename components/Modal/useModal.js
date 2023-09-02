import { useState } from "react";

const useModal = ({ isShowingDefault }) => {
  const [isShowing, setIsShowing] = useState(isShowingDefault);

  return [isShowing, setIsShowing];
};

export default useModal;
