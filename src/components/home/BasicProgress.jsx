import { getProgress } from "../../services/grammarFlowStorage";
import { getCourseProgress } from "../../utils/learningProgress";
import {
  FiBookOpen,
  FiTarget,
  FiEdit3,
} from "react-icons/fi";

import "../../styles/basicprogress.css";

function BasicProgress() {
  const data = getProgress();
  const courseProgress = getCourseProgress(data.topicProgress);

  const overallProgress = courseProgress.percentage;
  const lessonsCompleted = courseProgress.completed;
  const quizzesCompleted = data.progress.completedQuizzes.length;
  const practiceCompleted = data.progress.completedPractice.length;

  return (
    <section className="basic-progress">
      <div className="progress-header">
        <h3 className="progress-title">Overall Progress</h3>

        <div className="progress-percentage">
          {overallProgress}%
        </div>
      </div>

      <p className="progress-subtitle">
        {courseProgress.completed} of {courseProgress.total} Beginner topics completed
      </p>

      <div
        className="progress-bar-large"
        role="progressbar"
        aria-label="Course completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={overallProgress}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      <div className="progress-stats">
        <div className="progress-stat">
          <span className="stat-icon" aria-hidden="true">
            <FiBookOpen />
          </span>

          <div className="stat-info">
            <p className="stat-value">{lessonsCompleted}</p>
            <p className="stat-label">Lessons</p>
          </div>
        </div>

        <div className="progress-stat">
          <span className="stat-icon" aria-hidden="true">
            <FiTarget />
          </span>

          <div className="stat-info">
            <p className="stat-value">{quizzesCompleted}</p>
            <p className="stat-label">Quizzes</p>
          </div>
        </div>

        <div className="progress-stat">
          <span className="stat-icon" aria-hidden="true">
            <FiEdit3 />
          </span>

          <div className="stat-info">
            <p className="stat-value">{practiceCompleted}</p>
            <p className="stat-label">Practice</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BasicProgress;