import { useActivazonSelector } from "@/store/hooks";
import moment, { CalendarSpec } from "moment-timezone";
import { useCallback } from "react";

const LOCALE_CALENDAR_MAP: { es: CalendarSpec; en: CalendarSpec } = {
  es: {
    lastDay: "[Ayer]",
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    lastWeek: "[el] dddd [pasado]",
    nextWeek: "dddd",
    sameElse: "L",
  },
  en: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[last] dddd",
    nextWeek: "dddd",
    sameElse: "L",
  },
};

export const dateDisplay = (dateString: string, locale: string) => {
  moment.locale(locale);

  if (Object.keys(LOCALE_CALENDAR_MAP).includes(locale)) {
    return moment(dateString).calendar(
      LOCALE_CALENDAR_MAP[locale as "en" | "es"]
    );
  }
};
