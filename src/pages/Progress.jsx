import { useMemo, useState } from "react";
import { useStreak } from "../hooks/useStreak";
import { getProgressData } from "../services/progressService";

import ProgressHero from "../components/progress/ProgressHero";
import StatsRow from "../components/progress/StatsRow";
import StreakCard from "../components/progress/StreakCard";
import LevelJourney from "../components/progress/LevelJourney";
import ActivityHeatmap from "../components/progress/ActivityHeatmap";
import AchievementSection from "../components/progress/AchievementSection";
import RecentActivity from "../components/progress/RecentActivity";

import {
  FaTrophy,
  FaFire,
  FaStar,
  FaGraduationCap,
  FaBook,
  FaCheckCircle,
} from "react-icons/fa";

import "../styles/progresspage.css";

function Progress() {
  const { currentStreak, longestStreak } = useStreak();

  const progressData = useMemo(
    () => getProgressData(),
    []
  );

  const {
    overallProgress,
    topicsCompleted,
    notesRead,
    mcqSolved,
    practiceCompleted,
    weeklyActivity,
  } = progressData;

  const achievements = useMemo(() => [
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
  ], [currentStreak, mcqSolved, overallProgress, notesRead, practiceCompleted]);

  const sampleActivities = useMemo(() => [
    {
      id: 1,
      type: "quiz",
      text: "Completed Nouns Quiz",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      xp: 50,
    },
    {
      id: 2,
      type: "xp",
      text: "Earned 50 XP",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      xp: 50,
    },
    {
      id: 3,
      type: "achievement",
      text: "Unlocked Achievement",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      xp: 100,
    },
    {
      id: 4,
      type: "topic",
      text: "Completed Practice Session",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      xp: 30,
    },
  ], []);

  const stats = useMemo(() => ({
    topicsCompleted,
    notesRead,
    mcqSolved,
    practiceCompleted,
  }), [topicsCompleted, notesRead, mcqSolved, practiceCompleted]);

  return (
    <div className="progress-page">
      <ProgressHero
        progress={overallProgress}
        currentXP={1240}
        xpToNextLevel={260}
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

      <AchievementSection achievements={achievements} />

      <RecentActivity activities={sampleActivities} />
    </div>
  );
}

export default Progress;