import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import PublicRoute from "./routes/PublicRoute";
import Wrapper from "./components/wrapper/Wrapper";
import PrivateRoute from "./routes/PrivateRoute";
import AccountManagement from "./pages/AccountManagement";
import BiddingManagement from "./pages/BiddingManagement";
import Analytics from "./pages/Analytics";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="w-full ">
      <Router>
        <Routes>
          <Route path="/auth" element={<PublicRoute />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Wrapper />}>
              <Route
                path="/account-management"
                element={<AccountManagement />}
              />
              <Route
                path="/biding-management"
                element={<BiddingManagement />}
              />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Route>
        </Routes>
        <Toaster/>
      </Router>
    </main>
  );
}

export default App;
