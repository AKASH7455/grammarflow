import { useMemo } from "react";
import { FiBarChart2, FiBookOpen, FiClock, FiTarget } from "react-icons/fi";
import { useProgress } from "../hooks/useProgress";
import learningData from "../data/learning";
import ProgressHero from "../components/progress/ProgressHero";
import StatsRow from "../components/progress/StatsRow";
import StreakCard from "../components/progress/StreakCard";
import LevelJourney from "../components/progress/LevelJourney";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import RecentActivity from "../components/progress/RecentActivity";
import "../styles/progresspage.css";

function Progress() {
  const { data, getLevelInfo } = useProgress();

  const currentStreak = data?.user?.streak || 0;
  const longestStreak = data?.user?.longestStreak || currentStreak;
  const currentXP = data?.user?.xp || 0;

  const levelInfo = useMemo(() => getLevelInfo(), [getLevelInfo]);

  const catalog = useMemo(() => {
    const topics = [];
    const subjects = [];

    learningData.forEach((level) => {
      level.subjects.forEach((subject) => {
        const subjectId = `${level.slug}/${subject.slug}`;
        subjects.push({
          id: subjectId,
          name: subject.title,
          level: level.title,
          totalTopics: subject.topics.length,
        });

        subject.topics.forEach((topic) => {
          topics.push({
            id: `${subjectId}/${topic.slug}`,
            name: topic.title,
            subject: subject.title,
          });
        });
      });
    });

    return { topics, subjects };
  }, []);

  const progressData = {
    overallProgress: data.progress.overallProgress,
    topicsCompleted: data.progress.completedTopics.length,
    notesRead: data.topicProgress.filter((t) => t.completed).length,
    mcqSolved: data.quizResults.length,
    practiceCompleted: [
      ...data.fillBlankProgress.filter((f) => f.completed),
      ...data.translationProgress.filter((t) => t.completed),
      ...data.sentenceCorrectionProgress.filter((s) => s.completed),
      ...data.verbProgress.filter((v) => v.completed),
    ].length,
    weeklyActivity: data.user.completedDates,
    currentXP,
    xpToNextLevel: levelInfo.xpNeeded || 0,
    levelProgress: levelInfo.percentage || 0,
  };

  const {
    overallProgress = 0,
    topicsCompleted = 0,
    notesRead = 0,
    mcqSolved = 0,
    practiceCompleted = 0,
    weeklyActivity = [],
    xpToNextLevel = 0,
  } = progressData;

  const recentActivities = data.activityLogs;

  const progressInsights = useMemo(() => {
    const completedTopicIds = new Set(data.progress.completedTopics);
    const completedSubjectIds = new Set(data.progress.completedSubjects);
    const totalTopics = catalog.topics.length || 1;
    const totalSubjects = catalog.subjects.length || 1;

    const topicItems = catalog.topics.slice(0, 6).map((topic) => ({
      ...topic,
      progress: completedTopicIds.has(topic.id) ? 100 : 0,
    }));

    const subjectItems = catalog.subjects.map((subject) => {
      const completedInSubject = catalog.topics.filter(
        (topic) => topic.id.startsWith(`${subject.id}/`) && completedTopicIds.has(topic.id)
      ).length;

      return {
        ...subject,
        progress: subject.totalTopics
          ? Math.round((completedInSubject / subject.totalTopics) * 100)
          : 0,
        completedTopics: completedInSubject,
      };
    });

    const quizTotals = data.quizResults.reduce(
      (totals, quiz) => ({
        correct: totals.correct + Number(quiz.correctAnswers ?? quiz.score ?? 0),
        total: totals.total + Number(quiz.totalQuestions ?? 0),
      }),
      { correct: 0, total: 0 }
    );

    const accuracy = quizTotals.total
      ? Math.round((quizTotals.correct / quizTotals.total) * 100)
      : 0;

    const studyMinutes = topicsCompleted * 8 + mcqSolved * 4 + practiceCompleted * 5;
    const monthlyActivity = recentActivities.filter((activity) => {
      const date = new Date(activity.timestamp);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      topicItems,
      subjectItems,
      topicProgress: Math.round((topicsCompleted / totalTopics) * 100),
      subjectProgress: Math.round((completedSubjectIds.size / totalSubjects) * 100),
      accuracy,
      studyMinutes,
      monthlyActivity,
      activeDays: weeklyActivity.length,
    };
  }, [
    catalog,
    data.progress.completedSubjects,
    data.progress.completedTopics,
    data.quizResults,
    mcqSolved,
    practiceCompleted,
    recentActivities,
    topicsCompleted,
    weeklyActivity.length,
  ]);

  const stats = useMemo(
    () => ({
      topicsCompleted,
      notesRead,
      mcqSolved,
      practiceCompleted,
    }),
    [topicsCompleted, notesRead, mcqSolved, practiceCompleted]
  );

  return (
    <main className="progress-page">
      <ProgressHero
        progress={overallProgress}
        currentXP={currentXP}
        xpToNextLevel={xpToNextLevel}
        levelInfo={levelInfo}
      />

      <StatsRow stats={stats} />

      <StreakCard
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      <LevelJourney
        currentProgress={overallProgress}
        levelInfo={levelInfo}
      />

      <section className="progress-section progress-section--topics">
        <div className="progress-section__header">
          <div>
            <span className="progress-section__eyebrow">Topic Progress</span>
            <h2 className="progress-section__title">Learning roadmap</h2>
          </div>
          <span className="progress-section__metric">
            {progressInsights.topicProgress}%
          </span>
        </div>

        <div className="progress-list">
          {progressInsights.topicItems.map((topic) => (
            <article className="progress-list__item" key={topic.id}>
              <div className="progress-list__content">
                <span className="progress-list__title">{topic.name}</span>
                <span className="progress-list__meta">{topic.subject}</span>
              </div>
              <div className="progress-list__track" aria-hidden="true">
                <span style={{ width: `${topic.progress}%` }} />
              </div>
              <span className="progress-list__value">{topic.progress}%</span>
            </article>
          ))}
        </div>
      </section>

      <section className="progress-section progress-section--subjects">
        <div className="progress-section__header">
          <div>
            <span className="progress-section__eyebrow">Subject Progress</span>
            <h2 className="progress-section__title">Subject mastery</h2>
          </div>
          <span className="progress-section__metric">
            {progressInsights.subjectProgress}%
          </span>
        </div>

        <div className="subject-progress-grid">
          {progressInsights.subjectItems.map((subject) => (
            <article className="subject-progress-card" key={subject.id}>
              <div className="subject-progress-card__top">
                <FiBookOpen aria-hidden="true" />
                <span>{subject.level}</span>
              </div>
              <h3>{subject.name}</h3>
              <div className="subject-progress-card__bar" aria-hidden="true">
                <span style={{ width: `${subject.progress}%` }} />
              </div>
              <p>
                {subject.completedTopics}/{subject.totalTopics} topics
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="progress-section progress-section--analytics">
        <div className="progress-section__header">
          <div>
            <span className="progress-section__eyebrow">Learning Analytics</span>
            <h2 className="progress-section__title">Performance snapshot</h2>
          </div>
        </div>

        <div className="analytics-grid">
          <article className="analytics-card">
            <FiTarget aria-hidden="true" />
            <span className="analytics-card__value">{progressInsights.accuracy}%</span>
            <span className="analytics-card__label">Accuracy</span>
          </article>

          <article className="analytics-card">
            <FiClock aria-hidden="true" />
            <span className="analytics-card__value">{progressInsights.studyMinutes}m</span>
            <span className="analytics-card__label">Study Time</span>
          </article>

          <article className="analytics-card">
            <FiBarChart2 aria-hidden="true" />
            <span className="analytics-card__value">{currentXP}</span>
            <span className="analytics-card__label">XP Progress</span>
          </article>

          <article className="analytics-card">
            <FiBookOpen aria-hidden="true" />
            <span className="analytics-card__value">{progressInsights.monthlyActivity}</span>
            <span className="analytics-card__label">Monthly Statistics</span>
          </article>
        </div>
      </section>

      <ActivityHeatmap activityData={recentActivities} />

      <RecentActivity activities={recentActivities} />
    </main>
  );
}

export default Progress;
