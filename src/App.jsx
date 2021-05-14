import React from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import SearchEmptyState from "./components/SearchEmptyState";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
  const [pokemonData, setPokemonData] = React.useState();
  const [filteredData, setFilteredData] = React.useState();
  const [filterValue, setFilterValue] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [useMaxcp, setUseMaxcp] = React.useState(false);

  React.useEffect(() => {
    const fetchUrl = async () => {
      const request = await fetch(URL_PATH);
      const data = await request.json();
      setPokemonData(data);
      setLoading(false);
    };

    fetchUrl();
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    if (value === "") return setFilteredData(null);

    let data = [...pokemonData];
    if (useMaxcp) data = data.sort((a, b) => b.MaxCP - a.MaxCP);

    let nameFilter = data.filter((pkmn) =>
      pkmn.Name.toLowerCase().includes(value)
    );

    let typeFilter = data.filter((pkmn) =>
      pkmn.Types.join("").toLowerCase().includes(value)
    );

    let filter = nameFilter.concat(typeFilter);

    setFilteredData(filter.slice(0, 4));
    setFilterValue(value);
  };

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input
          type="checkbox"
          id="maxCP"
          value={useMaxcp}
          onChange={() => setUseMaxcp(!useMaxcp)}
        />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onChange={handleSearch}
      />
      {loading && <div className="loader" />}
      <ul className="suggestions">
        {filteredData &&
          filteredData.map((item) => (
            <PokemonCard item={item} filterValue={filterValue} />
          ))}

        {filteredData && filteredData.length === 0 && <SearchEmptyState />}
      </ul>
    </>
  );
};

export default App;
