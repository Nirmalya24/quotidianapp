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
import HomeDashboard from "./partials/Dashboard/Pages/HomeDashboard";
import NewsDashboard from "./partials/Dashboard/Pages/NewsDashboard";
import ProductivityDashboard from "./partials/Dashboard/Pages/ProductivityDashboard";
import Settings from "./partials/Dashboard/Pages/SettingsDashboard";
import WeatherDashboard from "./partials/Dashboard/Pages/WeatherDashboard";
import MindmapDashboard from "./partials/Dashboard/Pages/MindmapDashboard";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./css/widget-css/global.css";
import "./css/widget-css/weather.css";
import "./css/widget-css/news.css";

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
      <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<HomeDashboard />} />
          <Route path="news" element={<NewsDashboard />} />
          <Route path="productivity" element={<ProductivityDashboard />} />
          <Route path="weather" element={<WeatherDashboard />} />
          <Route path="mindmap" element={<MindmapDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </DndProvider>
    </>
  );
}

export default App;
