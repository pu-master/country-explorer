import { renderHook, act, waitFor } from "@testing-library/react";
import useWeather from "../../src/hooks/useWeather";
import { Country, WeatherInfo } from "../../src/types";
import { vi } from "vitest";

// Mock the getWeatherInfo function
const mockGetWeatherInfo = vi.fn();

vi.mock("../../src/helpers", () => ({
  getWeatherInfo: (code: string, capital: string) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    mockGetWeatherInfo(code, capital),
}));

const mockCountry: Country = {
  name: "France",
  code: "FR",
  capital: "Paris",
  continent: { code: "EU", name: "Europe" },
  emojiU: "U+1F1EB U+1F1F7",
  languages: [{ code: "FR", name: "French" }],
  currencies: ["EUR"],
};

describe("useWeather", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  it("should load weather information successfully", async () => {
    const mockWeather: WeatherInfo = {
      temperature: 20,
      conditions: [
        {
          id: 800,
          description: "Clear Sky",
          icon: "01d",
        },
      ],
      timezone: 3600,
    };

    mockGetWeatherInfo.mockResolvedValueOnce(mockWeather);

    const { result } = renderHook(() => useWeather(mockCountry));

    act(() => {
      // Trigger the effect to load weather info
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      result.current;
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.weather).toEqual(mockWeather);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should handle errors when loading weather information", async () => {
    mockGetWeatherInfo.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useWeather(mockCountry));

    act(() => {
      // Trigger the effect to load weather info
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      result.current;
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.weather).toBeUndefined();
      expect(result.current.error).toBe("Failed to load weather information.");
    });
  });

  it("should not load weather information if no country is provided", () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.weather).toBeUndefined();
  });
});
