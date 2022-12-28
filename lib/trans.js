import { useRouter } from "next/router";
import trans from "./../trans.json";

export const useTrans = () => {
  const { locale } = useRouter();

  return {
    i: (msg) => {
      const msgInfo = trans[msg];
      if (msgInfo && msgInfo[locale]) {
        return msgInfo[locale];
      }
      return `~~${msg}~~`;
    },
    locale,
    isEng: locale === "en-US",
  };
};
