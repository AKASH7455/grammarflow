import { FiArrowLeft } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";

function TopicHeader() {
  return (
    <header className="topic-header">

      {/* Back Button */}
      <Link
        to="/learning/beginner"
        className="topic-header__back-btn"
      >
        <FiArrowLeft />
      </Link>

      {/* Topic Info */}
      <div className="topic-header__top">

        <h1 className="topic-header__title">
          Nouns
        </h1>

        <span className="topic-header__level">
          <PiStudent />
          Beginner
        </span>

      </div>

    </header>
  );
}

export default TopicHeader;