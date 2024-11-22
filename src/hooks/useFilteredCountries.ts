import { useMemo } from "react";
import { Country } from "../types";

function useFilteredCountries({
  countries,
  selectedContinentCode,
  selectedLanguageCode,
  sortBy,
  sortOrder,
}: {
  countries: Country[];
  selectedContinentCode: string;
  selectedLanguageCode: string;
  sortBy: "name" | "continent";
  sortOrder: "asc" | "desc";
}) {
  const filteredCountries = useMemo(() => {
    let filtered = [...countries];
    if (selectedContinentCode) {
      filtered = filtered.filter((country) => {
        return country.continent.code === selectedContinentCode;
      });
    }
    if (selectedLanguageCode) {
      filtered = filtered.filter((country) => {
        return country.languages.find(
          (lang) => lang.code === selectedLanguageCode
        );
      });
    }

    filtered.sort((countryA, countryB) => {
      if (sortBy === "name") {
        if (sortOrder === "asc") {
          return countryA.name.localeCompare(countryB.name);
        }
        return countryB.name.localeCompare(countryA.name);
      }

      // Sort by continents.
      if (sortOrder === "asc") {
        return countryA.continent.name.localeCompare(countryB.continent.name);
      }
      return countryB.continent.name.localeCompare(countryA.continent.name);
    });

    return filtered;
  }, [
    countries,
    selectedContinentCode,
    selectedLanguageCode,
    sortBy,
    sortOrder,
  ]);

  return [filteredCountries];
}

export default useFilteredCountries;
