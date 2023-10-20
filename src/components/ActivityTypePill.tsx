import { useDictionary } from "@/dictionaries";

interface ActivityTypePillProps {
  name: string;
}

export const ActivityTypePill = ({ name }: ActivityTypePillProps) => {
  const { t } = useDictionary("activity_types");
  return (
    <p className="tw-rounded-full tw-inline-block tw-mb-0 tw-text-sm tw-font-semibold tw-mt-2 tw-uppercase tw-text-white tw-bg-blue-light tw-px-3 tw-py-1">
      <i className="bi bi-shield-fill-exclamation"></i> {t(name)}
    </p>
  );
};

export default ActivityTypePill;
