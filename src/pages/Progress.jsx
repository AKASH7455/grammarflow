import { useMemo } from "react";
import { useProgress } from "../hooks/useProgress";
import ProgressHero from "../components/progress/ProgressHero";
import StatsRow from "../components/progress/StatsRow";
import StreakCard from "../components/progress/StreakCard";
import LevelJourney from "../components/progress/LevelJourney";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import AchievementSection from "../components/progress/AchievementSection";
import RecentActivity from "../components/progress/RecentActivity";
import "../styles/progresspage.css";

function Progress() {
  const { data, getAchievements, getLevelInfo } = useProgress();

  const currentStreak = data?.user?.streak || 0;
  const longestStreak = data?.user?.longestStreak || currentStreak;
  const currentXP = data?.user?.xp || 0;
  
  // Get level information from new level engine
  const levelInfo = useMemo(() => getLevelInfo(), [getLevelInfo]);
  
  // Get achievements from new achievement engine
  const achievements = useMemo(() => getAchievements(), [getAchievements]);
  
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
    levelProgress = 0,
  } = progressData;

  const recentActivities = data.activityLogs;

  const stats = useMemo(
    () => ({
      topicsCompleted,
      notesRead,
      mcqSolved,
      practiceCompleted,
    }),
    [
      topicsCompleted,
      notesRead,
      mcqSolved,
      practiceCompleted,
    ]
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

      <ActivityHeatmap
        activityData={weeklyActivity}
      />

      <AchievementSection
        achievements={achievements}
      />

      <RecentActivity
        activities={recentActivities}
      />
    </main>
  );
}

export default Progress;



