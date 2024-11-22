import { renderHook } from "@testing-library/react";
import { Country } from "../../src/types";
import useFilteredCountries from "../../src/hooks/useFilteredCountries";

const mockCountries: Country[] = [
  {
    name: "France",
    code: "FR",
    capital: "Paris",
    continent: { code: "EU", name: "Europe" },
    emojiU: "U+1F1EB U+1F1F7",
    languages: [{ code: "FR", name: "French" }],
    currencies: ["EUR"],
  },
  {
    name: "Germany",
    code: "DE",
    capital: "Berlin",
    continent: { code: "EU", name: "Europe" },
    emojiU: "U+1F1E9 U+1F1EA",
    languages: [{ code: "DE", name: "German" }],
    currencies: ["EUR"],
  },
  {
    name: "Spain",
    code: "ES",
    capital: "Madrid",
    continent: { code: "EU", name: "Europe" },
    emojiU: "U+1F1EA U+1F1F8",
    languages: [{ code: "ES", name: "Spanish" }],
    currencies: ["EUR"],
  },
  {
    name: "Japan",
    code: "JP",
    capital: "Tokyo",
    continent: { code: "AS", name: "Asia" },
    emojiU: "U+1F1EF U+1F1F5",
    languages: [{ code: "JA", name: "Japanese" }],
    currencies: ["JPY"],
  },
];

describe("useFilteredCountries", () => {
  it("should filter countries by continent", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "EU",
        selectedLanguageCode: "",
        sortBy: "name",
        sortOrder: "asc",
      })
    );

    expect(result.current[0]).toHaveLength(3); // France, Germany, Spain
  });

  it("should filter countries by language", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "",
        selectedLanguageCode: "FR",
        sortBy: "name",
        sortOrder: "asc",
      })
    );

    expect(result.current[0]).toHaveLength(1); // Only France
  });

  it("should sort countries by name in ascending order", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "EU",
        selectedLanguageCode: "",
        sortBy: "name",
        sortOrder: "asc",
      })
    );

    expect(result.current[0][0].name).toBe("France");
    expect(result.current[0][1].name).toBe("Germany");
    expect(result.current[0][2].name).toBe("Spain");
  });

  it("should sort countries by name in descending order", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "EU",
        selectedLanguageCode: "",
        sortBy: "name",
        sortOrder: "desc",
      })
    );

    expect(result.current[0][0].name).toBe("Spain");
    expect(result.current[0][1].name).toBe("Germany");
    expect(result.current[0][2].name).toBe("France");
  });

  it("should sort countries by continent in ascending order", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "",
        selectedLanguageCode: "",
        sortBy: "continent",
        sortOrder: "asc",
      })
    );

    expect(result.current[0][0].name).toBe("Japan");
    expect(result.current[0][1].name).toBe("France");
    expect(result.current[0][2].name).toBe("Germany");
    expect(result.current[0][3].name).toBe("Spain");
  });

  it("should sort countries by continent in descending order", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "",
        selectedLanguageCode: "",
        sortBy: "continent",
        sortOrder: "desc",
      })
    );

    expect(result.current[0][0].name).toBe("France");
    expect(result.current[0][1].name).toBe("Germany");
    expect(result.current[0][2].name).toBe("Spain");
    expect(result.current[0][3].name).toBe("Japan");
  });

  it("should handle multiple filters and sorting", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "EU",
        selectedLanguageCode: "DE",
        sortBy: "continent",
        sortOrder: "asc",
      })
    );

    expect(result.current[0]).toHaveLength(1); // Only Germany
  });

  it("should return all countries if no filters are applied", () => {
    const { result } = renderHook(() =>
      useFilteredCountries({
        countries: mockCountries,
        selectedContinentCode: "",
        selectedLanguageCode: "",
        sortBy: "name",
        sortOrder: "asc",
      })
    );

    expect(result.current[0]).toHaveLength(4); // All countries
  });
});
