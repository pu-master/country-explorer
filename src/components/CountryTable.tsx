import { useState } from "react";
import { parseEmojiU } from "../helpers";
import { Country } from "../types";
import ContinentFilter from "./ContinentFilter";
import LanguageFilter from "./LanguageFilter";
import useFilteredCountries from "../hooks/useFilteredCountries";
import CountryDetailsView from "./CountryDetailsView";

const columns: {
  name: string;
  sortBy?: "name" | "continent";
}[] = [
  {
    name: "Country",
    sortBy: "name",
  },
  {
    name: "Capital",
  },
  {
    name: "Continent",
    sortBy: "continent",
  },
];

interface Props {
  countries: Country[];
}

function CountryTable({ countries }: Props) {
  const [selectedContinentCode, setSelectedContinentCode] =
    useState<string>("");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "continent">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  const [filteredCountries] = useFilteredCountries({
    countries,
    selectedContinentCode,
    selectedLanguageCode,
    sortBy,
    sortOrder,
  });

  const handleSort = (newSortBy?: "name" | "continent") => {
    if (!newSortBy) {
      return;
    }

    if (sortBy !== newSortBy) {
      setSortBy(newSortBy);
      setSortOrder("asc");
    } else {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
    }
  };

  if (!countries.length) {
    return null;
  }

  return (
    <>
      <div className="flex gap-x-2">
        <ContinentFilter
          continentCode={selectedContinentCode}
          onSelect={setSelectedContinentCode}
        />
        <LanguageFilter
          languageCode={selectedLanguageCode}
          onSelect={setSelectedLanguageCode}
        />
      </div>
      <p className="text-sm text-gray-700">
        Click on a country to view details.
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.name}
                  scope="col"
                  className={`px-6 py-3 ${
                    column.sortBy ? "cursor-pointer" : ""
                  }`}
                  onClick={handleSort.bind(null, column.sortBy)}
                >
                  {column.name}
                  {column.sortBy === sortBy &&
                    (sortOrder === "asc" ? <>&#9650;</> : <>&#9660;</>)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country) => (
              <tr
                key={country.code}
                className="border-b cursor-pointer"
                onClick={setSelectedCountry.bind(null, country)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-x-1"
                >
                  {country.name}
                  <span>{parseEmojiU(country.emojiU)}</span>
                </th>
                <td className="px-6 py-4">{country.capital}</td>
                <td className="px-6 py-4">{country.continent.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CountryDetailsView
        country={selectedCountry}
        onClose={setSelectedCountry.bind(null, undefined)}
      />
    </>
  );
}

export default CountryTable;
