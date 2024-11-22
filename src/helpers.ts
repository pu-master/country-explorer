import { WeatherInfo } from "./types";

export function parseEmojiU(emojiU: string) {
  return emojiU
    .split(" ")
    .map((code) => String.fromCodePoint(parseInt(code.replace("U+", ""), 16)))
    .join("");
}

export async function getWeatherInfo(countryCode: string, capital: string) {
  const queryParams = new URLSearchParams({
    q: `${capital},${countryCode}`,
    appid: import.meta.env.VITE_WEATHER_API_KEY as string,
  }).toString();

  const response = await fetch(
    `${import.meta.env.VITE_WEATHER_API_URL}?${queryParams}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to get weather information.");
  }

  const json = (await response.json()) as {
    main: {
      temp: number;
    };
    weather: {
      id: number;
      description: string;
      icon: string;
    }[];
    timezone: number;
  };

  return {
    temperature: json.main.temp,
    conditions: json.weather.map((condition) => ({
      id: condition.id,
      description: condition.description,
      icon: `${import.meta.env.VITE_WEATHER_API_IMAGE_URL}/${
        condition.icon
      }@2x.png`,
    })),
    timezone: json.timezone,
  } as WeatherInfo;
}

export function formatTimezoneOffset(offsetInSeconds: number) {
  const totalMinutes = Math.abs(offsetInSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  const sign = offsetInSeconds >= 0 ? "+" : "-";

  return `UTC ${sign}${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
}
