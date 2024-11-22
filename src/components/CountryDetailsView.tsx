import { formatTimezoneOffset, parseEmojiU } from "../helpers";
import { Country } from "../types";
import useWeather from "../hooks/useWeather";

interface Props {
  country?: Country;
  onClose: () => void;
}

function CountryDetailsView({ country, onClose }: Props) {
  const { loading, error, weather } = useWeather(country);

  if (!country) {
    return null;
  }

  const renderWeather = () => {
    if (loading) {
      return (
        <p className="text-green-700 text-sm">Loading weather information...</p>
      );
    }

    if (error) {
      return <p className="text-red-700 text-sm">{error}</p>;
    }

    if (!weather) {
      return null;
    }

    return (
      <div className="space-y-2">
        <div className="font-bold">Weather for {country.capital}</div>
        <ul>
          <li>Timezone: {formatTimezoneOffset(weather.timezone)}</li>
          <li>Temperature: {weather.temperature}</li>
          {weather.conditions.map((condition) => (
            <li key={condition.id} className="flex gap-x-1 items-center">
              {condition.description}
              <img
                src={condition.icon}
                className="max-w-6 max-h-6"
                alt={condition.description}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
    >
      <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0" />
      <div className="relative p-4 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 flex gap-x-1">
              {country.name}
              <span>{parseEmojiU(country.emojiU)}</span>
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="font-bold">Languages</div>
              <ul>
                {country.languages.map((language) => (
                  <li key={language.name}>{language.name}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-bold">Currencies</div>
              <ul>
                {country.currencies.map((currency) => (
                  <li key={currency}>{currency}</li>
                ))}
              </ul>
            </div>
            {renderWeather()}
          </div>
          <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetailsView;
