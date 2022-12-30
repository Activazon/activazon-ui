import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import moment from "moment";

const CALENDAR_FORMATS = {
  en: {
    sameDay: "[today]",
    nextDay: "[tomorrow]",
    nextWeek: "dddd",
    lastDay: "[yesterday]",
    lastWeek: "dddd",
    sameElse: "MMM Do, YYYY",
  },
  es: {
    sameDay: "[hoy]",
    nextDay: "[mañana]",
    nextWeek: "dddd",
    lastDay: "[ayer]",
    lastWeek: "dddd",
    sameElse: "MMM Do, YYYY",
  },
};

export const useDate = () => {
  const { locale } = useRouter();

  return {
    displayDate: useCallback(
      (dateString) => {
        moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        return moment(dateString).calendar();
      },
      [moment, locale]
    ),
  };
};
