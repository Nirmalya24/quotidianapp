import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardSidebarNew from "./partials/DashboardSidebar";
import DashboardMain from "./partials/DashboardMain";
import NewsDashboard from "./partials/NewsDashboard";
import ProductivityDashboard from "./partials/ProductivityDashboard";
import ScheduleDashboard from "./partials/ScheduleDashboard";
import Settings from "./partials/Settings";
import Timer from "./partials/Timer";
import WeatherWidget from "./partials/WeatherWidget";

import "./css/widget-css/global.css";
import "./css/widget-css/weather.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<DashboardMain />} />
          <Route path="news" element={<NewsDashboard />} />
          <Route path="productivity" element={<ProductivityDashboard />} />
          <Route path="schedule" element={<ScheduleDashboard />} />
          <Route path="weather" element={<WeatherWidget />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/test" element={<Timer />} />
      </Routes>
    </>
  );
}

export default App;
