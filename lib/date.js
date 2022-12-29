import { useRouter } from "next/router";
import moment from "moment";

const CALENDAR_FORMATS = {
  "en-US": {
    sameDay: "[today]",
    nextDay: "[tomorrow]",
    nextWeek: "dddd",
    lastDay: "[yesterday]",
    lastWeek: "dddd",
    sameElse: "MMM Do, YYYY",
  },
  "es-ES": {
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
  moment.locale(locale, { calendar: CALENDAR_FORMATS[locale] });

  return {
    displayDate: (dateString) => moment(dateString).calendar(),
  };
};
