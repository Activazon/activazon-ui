import { useRouter } from "next/router";
import trans from "./../trans.json";

export const useTrans = () => {
  const { locale } = useRouter();
  const translate = (msg, subs = {}) => {
    const msgInfo = trans[msg];
    if (msgInfo && msgInfo[locale]) {
      let finalMsg = msgInfo[locale];

      // replace positional subsitutions
      if (subs) {
        Object.keys(subs).forEach((s) => {
          finalMsg = finalMsg.replaceAll(`{{${s}}}`, subs[s]);
        });
      }
      return finalMsg;
    }
    return `~~${msg}~~`;
  };
  const pluralize = (msgSingular, msgPlural, count) => {
    return translate(count === 1 ? msgSingular : msgPlural, { count });
  };

  const pluralizeFromSingular = (msgSingular, count) => {
    return translate(count === 1 ? msgSingular : msgSingular + "__plural", {
      count,
    });
  };

  return {
    i: translate,
    t: translate,
    p: pluralize,
    pfs: pluralizeFromSingular,
    locale,
    isEng: locale === "en-US",
  };
};
