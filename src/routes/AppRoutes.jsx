import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Learning from "../pages/Learning";
import LevelSubjects from "../pages/LevelSubjects";
import LevelTopics from "../pages/LevelTopics";
import TopicDetails from "../pages/TopicDetails";

import Progress from "../pages/Progress";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Learning Flow */}
      <Route
        path="/learning"
        element={<Learning />}
      />

      <Route
        path="/learning/:levelSlug"
        element={<LevelSubjects />}
      />

      <Route
        path="/learning/:levelSlug/:subjectSlug"
        element={<LevelTopics />}
      />

      <Route
        path="/learning/:levelSlug/:subjectSlug/:topicSlug"
        element={<TopicDetails />}
      />

      {/* User */}
      <Route
        path="/progress"
        element={<Progress />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;