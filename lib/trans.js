import { useRouter } from "next/router";
import { renderToString } from "react-dom/server";

import trans from "trans.json";

export const useTrans = () => {
  const { locale } = useRouter();
  const translate = (msg, subs = {}, rawString) => {
    const msgInfo = trans[msg];
    if (msgInfo && msgInfo[locale]) {
      let finalMsg = msgInfo[locale];

      // replace positional subsitutions

      Object.keys(subs || {}).forEach((s) => {
        finalMsg = finalMsg.replaceAll(`{{${s}}}`, renderToString(subs[s]));
      });

      if (rawString) {
        return finalMsg;
      }
      return <span dangerouslySetInnerHTML={{ __html: finalMsg }}></span>;
    }
    return `~~${msg}~~`;
  };
  const translateSimple = (msg, subs = {}, rawString) => {
    const msgInfo = trans[msg];
    if (msgInfo && msgInfo[locale]) {
      let finalMsg = msgInfo[locale];

      // replace positional subsitutions

      Object.keys(subs || {}).forEach((s) => {
        finalMsg = finalMsg.replaceAll(`{{${s}}}`, renderToString(subs[s]));
      });

      if (rawString) {
        return finalMsg;
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
    isEng: locale === "en",
    ts: translateSimple,
  };
};
