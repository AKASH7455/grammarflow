function VerbFilter({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="verb-filter">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`verb-filter__chip ${
            activeFilter === filter.value ? "verb-filter__chip--active" : ""
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default VerbFilter;
