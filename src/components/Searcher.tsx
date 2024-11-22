import { useLazyQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { Country } from "../types";

const SEARCH_COUNTRIES = gql`
  query SearchCountries($name: String!) {
    countries(filter: { name: { regex: $name } }) {
      name
      code
      capital
      continent {
        code
        name
      }
      emojiU
      languages {
        code
        name
      }
      currencies
    }
  }
`;

interface Props {
  onSearch: (countries: Country[]) => void;
}

function Searcher({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCountries, { loading, error, data }] = useLazyQuery<{
    countries: Country[];
  }>(SEARCH_COUNTRIES, {
    onCompleted: (data) => {
      onSearch(data.countries);
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        void searchCountries({ variables: { name: searchTerm } });
      }
    }, 300); // Debounce for 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchCountries]);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const renderStatus = () => {
    if (loading) {
      return <p className="text-green-700 text-sm">Searching...</p>;
    }

    if (error) {
      return <p className="text-red-700 text-sm">{error.message}</p>;
    }

    if (data && !data.countries.length) {
      return <p className="text-gray-700 text-sm">No countries found.</p>;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-sm text-gray-700">
        <span className="font-bold">Note:</span> the search query is
        case-sensitive.
      </p>
      <input
        type="text"
        className="border border-gray-300 rounded w-full py-2 px-4 focus:ring-blue-500 focus:border-blue-500 block"
        placeholder="Search countries by name..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      {renderStatus()}
    </div>
  );
}

export default Searcher;
