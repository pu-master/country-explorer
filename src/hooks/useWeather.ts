import { useEffect, useState } from "react";
import { Country, WeatherInfo } from "../types";
import { getWeatherInfo } from "../helpers";

function useWeather(country?: Country) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [weather, setWeather] = useState<WeatherInfo>();

  const loadWeatherInfo = async () => {
    setLoading(true);
    try {
      const response = await getWeatherInfo(country!.code, country!.capital);
      setWeather(response);
    } catch {
      setError("Failed to load weather information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!country) {
      return;
    }

    void loadWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  return {
    loading,
    error,
    weather,
  };
}

export default useWeather;
