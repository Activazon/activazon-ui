import { useDictionary } from "@/dictionaries";

interface ActivityTypePillProps {
  name: string;
}

export const ActivityTypePill = ({ name }: ActivityTypePillProps) => {
  const { t } = useDictionary("activity_types");
  return (
    <p className="tw-rounded-md tw-inline-block tw-mb-0 tw-text-xs tw-font-semibold tw-mt-2 tw-uppercase tw-text-white tw-bg-blue-light tw-px-1.5 tw-py-0.5">
      {t(name)}
    </p>
  );
};

export default ActivityTypePill;
