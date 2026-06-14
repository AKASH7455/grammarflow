import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";

function TopicHeader() {
  return (
    <header className="topic-header">

      <Link
        to="/learning/beginner"
        className="topic-header__back-btn"
      >
        Back
      </Link>

      <div className="topic-header__info">
        <div className="topic-header__top">

          <h1 className="topic-header__title">
            Nouns
          </h1>

          <span className="topic-header__level">
            <PiStudent />
            Beginner
          </span>

        </div>
      </div>

    </header>
  );
}

export default TopicHeader;