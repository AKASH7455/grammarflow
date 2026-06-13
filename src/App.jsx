import "./styles/layout.css";

import BottomNav from "./components/layout/BottomNav";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <AppRoutes />
      </main>

      <BottomNav />
    </div>
  );
}

export default App;