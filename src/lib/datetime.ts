import { useActivazonSelector } from "@/store/hooks";
import moment, { CalendarSpec } from "moment-timezone";
import { useCallback } from "react";

const LOCALE_CALENDAR_MAP: { es: CalendarSpec; en: CalendarSpec } = {
  es: {
    lastDay: "[Ayer]",
    sameDay: "[Hoy]",
    nextDay: "[Mañana]",
    lastWeek: "[El] dddd [pasado]",
    sameElse: "ll",
  },
  en: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[Last] dddd",
    sameElse: "ll",
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
