import { useRouter } from "next/router";
import trans from "./../trans.json";

export const useTrans = () => {
  const { locale } = useRouter();
  const translate = (msg) => {
    const msgInfo = trans[msg];
    if (msgInfo && msgInfo[locale]) {
      return msgInfo[locale];
    }
    return `~~${msg}~~`;
  };
  const pluralize = (msgSingular, msgPlural, count) => {
    return translate(count === 1 ? msgSingular : msgPlural).replace(
      "{{count}}",
      count
    );
  };

  return {
    i: translate,
    t: translate,
    p: pluralize,
    locale,
    isEng: locale === "en-US",
  };
};
