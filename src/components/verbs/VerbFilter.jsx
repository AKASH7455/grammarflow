import { useState } from "react";
import { FiFilter } from "react-icons/fi";

function VerbFilter({
  filters,
  activeFilter,
  onFilterChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="verb-filter-wrapper">
      <button
        type="button"
        className="verb-filter-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Filters"
      >
        <FiFilter size={18} />
      </button>

      {isOpen && (
        <div className="verb-filter">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`verb-filter__chip ${
                activeFilter === filter.value
                  ? "verb-filter__chip--active"
                  : ""
              }`}
              onClick={() => {
                onFilterChange(filter.value);
                setIsOpen(false);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerbFilter;