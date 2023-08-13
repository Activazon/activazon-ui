import Link from "next/link";

const getSubText = (place) => {
  if (place.type == "city") {
    return place.country_display_name;
  }
  return `${place.city_display_name}, ${place.country_display_name}`;
};

const SearchBarResults = ({ data }) => {
  return (
    <div className="tw-border-t tw-border-slate-300 tw-px-4 tw-py-3">
      {[...(data || [])].map((place) => (
        <Link
          href={place.slug_path}
          className="tw-no-underline tw-text-gray-dark tw-border-b last:tw-border-0 last:tw-pb-0 first:tw-pt-0 tw-border-slate-300 tw-py-2 tw-block"
        >
          <p className="tw-font-bold tw-mb-0">{place.display_name}</p>
          <p className="tw-mb-0 tw-text-sm">{getSubText(place)}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchBarResults;
