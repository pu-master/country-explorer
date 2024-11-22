import { gql, useQuery } from "@apollo/client";
import { Continent } from "../types";

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

interface Props {
  continentCode: string;
  onSelect: (continentCode: string) => void;
}

function ContinentFilter({ continentCode, onSelect }: Props) {
  const { loading, data } = useQuery<{
    continents: Continent[];
  }>(GET_CONTINENTS);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={continentCode}
      onChange={handleSelect}
    >
      {loading ? (
        <option disabled>Loading...</option>
      ) : (
        <option value="">- All -</option>
      )}
      {data &&
        data.continents.length > 0 &&
        data.continents.map((continent) => (
          <option key={continent.code} value={continent.code}>
            {continent.name}
          </option>
        ))}
    </select>
  );
}

export default ContinentFilter;
