import { FiGrid, FiList } from "react-icons/fi";

function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle__button ${
          viewMode === "card" ? "view-toggle__button--active" : ""
        }`}
        onClick={() => onViewChange("card")}
        aria-label="Card view"
      >
        <FiGrid />
      </button>
      <button
        className={`view-toggle__button ${
          viewMode === "table" ? "view-toggle__button--active" : ""
        }`}
        onClick={() => onViewChange("table")}
        aria-label="Table view"
      >
        <FiList />
      </button>
    </div>
  );
}

export default ViewToggle;
