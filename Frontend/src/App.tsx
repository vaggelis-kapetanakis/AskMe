import { Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Loading from "./ui/Loading";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import { AuthContext } from "./contexts/AuthContext";
import QuestionOverview from "./Dashboard/components/QuestionOverview/QuestionOverview";
import TagOverview from "./Dashboard/components/Tag/TagOverview";
import NewQuestion from "./Dashboard/NewQuestion/NewQuestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Dashboard/Profile/Profile";
import Chart from "./Dashboard/Charts/Chart";
import BrowseSection from "./LandingPage/BrowseSection/BrowseSection";
/* import RouteLogger from "./ui/RouteLogger"; */

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;

  return (
    <>
      <Suspense
        fallback={
          <div className="center">
            <Loading />
          </div>
        }
      >
        <Routes>
          {state.isAuthenticated ? (
            <>
              <Route path="/signedin" element={<Dashboard />} />
              <Route
                path="/signedin/questions/:qid"
                element={<QuestionOverview />}
              />
              <Route path="/signedin/tags/:tagid" element={<TagOverview />} />
              <Route path="/signedin/askquestion" element={<NewQuestion />} />
              <Route path="/signedin/profile" element={<Profile />} />
              <Route path="/signedin/charts" element={<Chart />} />

              <Route path="*" element={<Navigate to="/signedin" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/browse" element={<BrowseSection />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
