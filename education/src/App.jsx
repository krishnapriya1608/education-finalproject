import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Achievements from "./Pages/Achievements";
import Quiz from "./Pages/Quiz";
import Disscussion from "./Pages/Disscussion";
import Teacherdas from "./Pages/Teacherdas";
import Instructor from "./Pages/Instructor";
import Skills from "./Pages/Skills";
import Navbar from './Components.jsx/Navbar'
import Courses from "./Pages/Courses";
import Web from "./Pages/Web";
import Mentor from "./Pages/Mentor";
import LearningPage from "./Pages/Learningpage";
import Avatar from './Pages/Avatar'
import Mobile from "./Pages/Mobile";
import Certificate from "./Pages/Certificate";
import Grid1 from './Pages/Grid1'
import Footer from "./Components.jsx/Footer";
import List from "./Pages/List";
import Driverslist from "./Pages/Driverslist";
import Parents from './Pages/Parents'
import OtpVerification from "./Pages/OTPverification";
import Datascience from "./Pages/Datascience";
import Cardcourse from "./Components.jsx/Cardcourse";
import Webs from "./Pages/Webs";
import AdminAuth from "./Pages/AdminAuth";
import Admin from './Pages/Admin';

function App() {
  const location = useLocation();

  // Only show Navbar on the Dashboard route
  const showNavbar = location.pathname === "/dash";

  // Hide Footer on Teacherdas ("/") route
  const showFooter = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/achie" element={<Achievements />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/disc" element={<Disscussion />} />
        <Route path="/" element={<Teacherdas />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/insta" element={<Instructor />} />
        <Route path="/skill" element={<Skills />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/web" element={<Web />} />
        <Route path="/course/datascience" element={<Datascience />} />
        <Route path="/course/webdevelopment" element={<Webs />} />
        <Route path="/learn" element={<LearningPage />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/grid" element={<Grid1 />} />
        <Route path="/list" element={<List />} />
        <Route path="/driver" element={<Driverslist />} />
        <Route path="/parent" element={<Parents />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/data" element={<Datascience />} />
        <Route path="/webs" element={<Webs />} />
        <Route path="/card" element={<Cardcourse />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin1" element={<Admin />} />
        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<Teacherdas />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
