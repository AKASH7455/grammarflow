import { useMemo } from "react";
import {
  FaTrophy,
  FaFire,
  FaStar,
  FaGraduationCap,
  FaBook,
  FaCheckCircle,
} from "react-icons/fa";


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
  const { data } = useProgress();

  const currentStreak = data?.user?.streak || 0;
  const longestStreak = data?.user?.longestStreak || currentStreak;
  const progressData = {
    overallProgress: data.progress.overallProgress,
    topicsCompleted: data.progress.completedTopics.length,
    notesRead: data.progress.completedTopics.length,
    mcqSolved: data.progress.completedQuizzes.length,
    practiceCompleted: data.progress.completedPractice.length,
    weeklyActivity: data.user.completedDates,
    currentXP: data.user.xp,
    xpToNextLevel: 500 - (data.user.xp % 500),
  };

  const {
    overallProgress = 0,
    topicsCompleted = 0,
    notesRead = 0,
    mcqSolved = 0,
    practiceCompleted = 0,
    weeklyActivity = [],
    currentXP = 0,
    xpToNextLevel = 500,
  } = progressData;

  const achievements = useMemo(
    () => [
      {
        icon: <FaTrophy />,
        title: "Consistent Learner",
        unlocked: currentStreak >= 7,
        category: "streak",
        xp: 100,
      },
      {
        icon: <FaFire />,
        title: "7 Day Streak",
        unlocked: currentStreak >= 7,
        category: "streak",
        xp: 150,
      },
      {
        icon: <FaStar />,
        title: "Completed 50 Lessons",
        unlocked: mcqSolved >= 50,
        category: "learning",
        xp: 200,
      },
      {
        icon: <FaGraduationCap />,
        title: "Grammar Master",
        unlocked: overallProgress >= 100,
        category: "master",
        xp: 500,
      },
      {
        icon: <FaBook />,
        title: "Bookworm",
        unlocked: notesRead >= 20,
        category: "learning",
        xp: 150,
      },
      {
        icon: <FaCheckCircle />,
        title: "Perfect Score",
        unlocked: practiceCompleted >= 10,
        category: "quiz",
        xp: 300,
      },
    ],
    [
      currentStreak,
      mcqSolved,
      overallProgress,
      notesRead,
      practiceCompleted,
    ]
  );

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
      />

      <StatsRow stats={stats} />

      <StreakCard
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      <LevelJourney
        currentProgress={overallProgress}
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



