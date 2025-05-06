import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Student from "./components/Student";
import Faculty from "./components/Faculty";
import ResetPassword from "./components/ResetPassword";
import EventMaker from "./components/EventMaker";
import EventDashboard from "./components/EventDashboard";
import RegisterEvent from "./components/RegisterEvent";
import EventInfo from "./components/EventInfo";
import ViewFullEvents from "./components/ViewFullEvents";
import Admin from "./components/Admin";

import "./App.css";
import Dashboard from "./components/Dashboard";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ResetPassword />} />

          {[
            { path: "/student", component: <Student />, role: "student" },
            { path: "/faculty", component: <Faculty />, role: "faculty" },
            { path: "/eventManager", component: <EventMaker />, role: "eventManager" },
            { path: "/event/dashboard", component: <EventDashboard />, role: "eventManager" },
            { path: "/student/register/:eventId", component: <RegisterEvent />, role: "student" },
            { path: "/event/student/:eventId", component: <EventInfo />, role: "student" },
            { path: "/event/faculty/:eventId", component: <EventInfo />, role: "faculty" },
            { path: "/faculty/events", component: <ViewFullEvents role = "faculty" />, role: "faculty" },
            { path: "/student/events", component: <ViewFullEvents role = "student"/>, role: "student" },
            {path:"/faculty/dashboard", component:<Dashboard />,role:"faculty"},
            {path:"/student/dashboard", component:<Dashboard />,role:"student"},
            { path: "/admin", component: <Admin />, role: "admin" },
          ].map(({ path, component, role }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute allowedRoles={[role]}>
                  {component}
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </Router>
  );
};

export default App;