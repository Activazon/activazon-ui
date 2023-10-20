import { useActivazonSelector } from "@/store/hooks";
import { useEffect, useState, createElement } from "react";

interface Dictionary {
  locale: string;
  translations: Record<string, string>;
}

const formatString = (str: string, params: Record<string, string>) => {
  return Object.keys(params).reduce((acc, param) => {
    return acc.replace(`{{${param}}}`, params[param]);
  }, str);
};

const getDictionary = async (
  locale: string,
  namespace: string = "common"
): Promise<Dictionary> => {
  try {
    return import(`./data/${locale}/${namespace}.json`).then(
      (module) => module.default
    );
  } catch (e) {
    console.error(
      `Error loading dictionary for locale ${locale} and namespace ${namespace}`,
      e
    );
    return {
      locale,
      translations: {},
    };
  }
};

export const useDictionary = (namespace: string = "common") => {
  const locale = useActivazonSelector((state) => state.locale.locale);
  const [dictionary, setDictionary] = useState<Dictionary>({
    locale,
    translations: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getDictionary(locale, namespace).then((dictionary) => {
      setDictionary(dictionary);
      setIsLoaded(true);
    });
  }, [locale, namespace]);

  /**
   * gets translation for key
   */
  const t = (key: string, params?: Record<string, string>) => {
    if (!dictionary.translations) {
      return key;
    }
    const translation = dictionary.translations[key];
    if (!translation) {
      return key;
    }
    // format string
    if (params) {
      return formatString(translation, params);
    }

    return translation;
  };

  /**
   * gets translation for key and converts to react element to perserve html tags
   */
  const thtml = (key: string, params?: Record<string, string>) => {
    const translation = t(key, params);
    return createElement("span", {
      id: `--trans-${key}`,
      dangerouslySetInnerHTML: {
        __html: translation,
      },
    });
  };

  return { t, thtml, locale, isLoaded };
};
