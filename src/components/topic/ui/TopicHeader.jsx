import { PiStudent } from "react-icons/pi";
import { FiArrowLeft } from "react-icons/fi";
import {
  Link,
  useParams,
} from "react-router-dom";

function TopicHeader() {
  const {
    levelSlug,
    subjectSlug,
    topicSlug,
  } = useParams();

  const topicName = topicSlug
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  const levelName = levelSlug
    ?.charAt(0)
    .toUpperCase() +
    levelSlug?.slice(1);

  return (
    <header className="topic-header">
      <Link
        to={`/learning/${levelSlug}/${subjectSlug}`}
        className="topic-header__back-btn"
      >
        <FiArrowLeft />
      </Link>

      <div className="topic-header__info">
        <div className="topic-header__top">
          <h1 className="topic-header__title">
            {topicName}
          </h1>

          <span className="topic-header__level">
            <PiStudent />
            {levelName}
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopicHeader;