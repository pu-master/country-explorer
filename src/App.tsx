import { useState } from "react";
import Searcher from "./components/Searcher";
import { Country } from "./types";
import CountryTable from "./components/CountryTable";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4 p-4 flex flex-col gap-y-4">
      <Searcher onSearch={setCountries} />
      <CountryTable countries={countries} />
    </div>
  );
}

export default App;
