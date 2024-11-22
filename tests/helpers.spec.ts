import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import {
  formatTimezoneOffset,
  getWeatherInfo,
  parseEmojiU,
} from "../src/helpers";

vi.stubEnv("VITE_WEATHER_API_KEY", "test_api_key");
vi.stubEnv("VITE_WEATHER_API_URL", "https://api.weather.com");
vi.stubEnv("VITE_WEATHER_API_IMAGE_URL", "https://images.weather.com");

describe("helpers", () => {
  describe("parseEmojiU()", () => {
    it("should convert Unicode emoji to strings", () => {
      expect(parseEmojiU("U+1F1FA U+1F1F8")).toBe(
        `${String.fromCodePoint(127482)}${String.fromCodePoint(127480)}`
      );
    });
  });

  describe("getWeatherInfo()", () => {
    beforeEach(() => {
      // Reset fetch mock before each test
      globalThis.fetch = vi.fn();
    });

    it("should fetch weather information successfully", async () => {
      const mockResponse = {
        main: {
          temp: 25,
        },
        weather: [
          {
            id: 801,
            description: "Few clouds",
            icon: "02d",
          },
        ],
        timezone: 3600,
      };

      (globalThis.fetch as Mock).mockResolvedValueOnce({
        status: 200,
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await getWeatherInfo("US", "Washington");

      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.weather.com?q=Washington%2CUS&appid=test_api_key"
      );
      expect(result).toEqual({
        temperature: 25,
        conditions: [
          {
            id: 801,
            description: "Few clouds",
            icon: "https://images.weather.com/02d@2x.png",
          },
        ],
        timezone: 3600,
      });
    });

    it("should throw an error if the response status is not OK", async () => {
      (globalThis.fetch as Mock).mockResolvedValueOnce({
        status: 429,
        json: vi.fn(),
      });

      await expect(getWeatherInfo("US", "Washington")).rejects.toThrow(
        "Failed to get weather information."
      );
    });

    it("should handle fetch errors", async () => {
      (globalThis.fetch as Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(getWeatherInfo("US", "Washington")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("formatTimezoneOffset", () => {
    it("should format positive timezone offsets correctly", () => {
      expect(formatTimezoneOffset(3600)).toBe("UTC +01:00");
      expect(formatTimezoneOffset(7200)).toBe("UTC +02:00");
      expect(formatTimezoneOffset(10800)).toBe("UTC +03:00");
      expect(formatTimezoneOffset(36000)).toBe("UTC +10:00");
    });

    it("should format negative timezone offsets correctly", () => {
      expect(formatTimezoneOffset(-3600)).toBe("UTC -01:00");
      expect(formatTimezoneOffset(-7200)).toBe("UTC -02:00");
      expect(formatTimezoneOffset(-10800)).toBe("UTC -03:00");
      expect(formatTimezoneOffset(-36000)).toBe("UTC -10:00");
    });

    it("should handle zero offset correctly", () => {
      expect(formatTimezoneOffset(0)).toBe("UTC +00:00");
    });

    it("should handle offsets that result in minutes", () => {
      expect(formatTimezoneOffset(1500)).toBe("UTC +00:25");
      expect(formatTimezoneOffset(-1500)).toBe("UTC -00:25");
    });

    it("should handle large offsets correctly", () => {
      expect(formatTimezoneOffset(86340)).toBe("UTC +23:59"); // Just under 24 hours
      expect(formatTimezoneOffset(-86340)).toBe("UTC -23:59");
    });
  });
});
