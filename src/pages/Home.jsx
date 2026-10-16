import WelcomeCard from "../components/home/WelcomeCard";
import QuickActions from "../components/home/QuickActions";
import ActivityCalendar from "../components/home/ActivityCalendar";
import BasicProgress from "../components/home/BasicProgress";

function Home() {
  return (
    <>
      <WelcomeCard />
      <ActivityCalendar />
      <BasicProgress />
      <QuickActions />
    </>
  );
}

export default Home;