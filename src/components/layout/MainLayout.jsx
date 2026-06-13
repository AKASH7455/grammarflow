import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <BottomNav />
    </>
  );
}

export default MainLayout;