import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Learning from "../pages/Learning";
import LevelSubjects from "../pages/LevelSubjects";
import LevelTopics from "../pages/LevelTopics";
import TopicDetails from "../pages/TopicDetails";

import Notes from "../pages/Notes";
import Practice from "../pages/Practice";
import Quiz from "../pages/Quiz";
import FillBlanks from "../pages/FillBlanks";
import Translation from "../pages/Translation";
import VerbPractice from "../pages/VerbPractice";
import SentenceCorrection from "../pages/SentenceCorrection";
import AiPractice from "../pages/AiPractice";
import Progress from "../pages/Progress";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Learning Module */}
      <Route path="/learning" element={<Learning />} />

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

      {/* Practice Pages */}
      <Route path="/practice" element={<Practice />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/fill-blanks" element={<FillBlanks />} />
      <Route path="/translation" element={<Translation />} />
      <Route path="/verbs" element={<VerbPractice />} />
      <Route
        path="/sentence-correction"
        element={<SentenceCorrection />}
      />
      <Route path="/ai-practice" element={<AiPractice />} />

      {/* Other Pages */}
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
