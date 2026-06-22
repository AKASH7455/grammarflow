import { FiSearch } from "react-icons/fi";

function VerbSearch({ onSearch, placeholder }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="verb-search">
      <div className="verb-search__icon">
        <FiSearch />
      </div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder={placeholder || "Search verbs..."}
        className="verb-search__input"
      />
    </div>
  );
}

export default VerbSearch;
