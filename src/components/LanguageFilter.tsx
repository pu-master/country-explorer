import { gql, useQuery } from "@apollo/client";
import { Language } from "../types";

const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      code
      name
    }
  }
`;

interface Props {
  languageCode: string;
  onSelect: (languageCode: string) => void;
}

function LanguageFilter({ languageCode, onSelect }: Props) {
  const { loading, data } = useQuery<{
    languages: Language[];
  }>(GET_LANGUAGES);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={languageCode}
      onChange={handleSelect}
    >
      {loading ? (
        <option disabled>Loading...</option>
      ) : (
        <option value="">- All -</option>
      )}
      {data &&
        data.languages.length > 0 &&
        data.languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
    </select>
  );
}

export default LanguageFilter;
