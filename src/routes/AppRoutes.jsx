import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Learning from "../pages/Learning";
import LevelSubjects from "../pages/LevelSubjects";
import LevelTopics from "../pages/LevelTopics";
import TopicDetails from "../pages/TopicDetails";

import Practice from "../pages/Practice";
import Progress from "../pages/Progress";
import Profile from "../pages/Profile";
import VerbDashboard from "../pages/VerbDashboard";
import VerbSetDetail from "../pages/VerbSetDetail";
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
        path="/practice"
        element={<Practice />}
      />

      <Route
        path="/progress"
        element={<Progress />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Verb Forms */}
      <Route
        path="/verbs"
        element={<VerbDashboard />}
      />
      <Route
        path="/verbs/:setName"
        element={<VerbSetDetail />}
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