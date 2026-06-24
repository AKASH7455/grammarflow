import { FiSearch, FiGrid, FiList } from "react-icons/fi";

function VerbSearch({
  value,
  onSearch,
  viewMode,
  onViewChange,
  placeholder = "Search verbs...",
  children,
}) {
  return (
    <div className="verb-search">

      <FiSearch className="verb-search__icon" />

      <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="verb-search__input"
      />

      <div className="verb-search__actions">

        {children}

        <div className="view-toggle">

          <button
            type="button"
            className={`view-toggle__button ${
              viewMode === "card"
                ? "view-toggle__button--active"
                : ""
            }`}
            onClick={() => onViewChange("card")}
            aria-label="Card View"
          >
            <FiGrid />
          </button>

          <button
            type="button"
            className={`view-toggle__button ${
              viewMode === "table"
                ? "view-toggle__button--active"
                : ""
            }`}
            onClick={() => onViewChange("table")}
            aria-label="Table View"
          >
            <FiList />
          </button>

        </div>

      </div>

    </div>
  );
}

export default VerbSearch;