import { FiBookOpen } from "react-icons/fi";

function EmptyState({ message }) {
  return (
    <div className="verb-empty-state">
      <div className="verb-empty-state__icon">
        <FiBookOpen />
      </div>
      <h3 className="verb-empty-state__title">No Verbs Found</h3>
      <p className="verb-empty-state__message">
        {message || "Try adjusting your search or filter"}
      </p>
    </div>
  );
}

export default EmptyState;
