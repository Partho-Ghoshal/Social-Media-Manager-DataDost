import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import Youtube from "./pages/Youtube";
import Instagram from "./pages/Instagram";
import Facebook from "./pages/Facebook";

const App = () => (
  <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/instagram/data" element={<Facebook />} />
      </Routes>
    </main>
  </div>
);

export default App;
