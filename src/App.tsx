import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RSSFeedManager from './components/RSSFeedManager';
import LLMIntegration from './components/LLMIntegration';
import BlogPostGenerator from './components/BlogPostGenerator';
import AutomationManager from './components/AutomationManager';
import Settings from './components/Settings';
import Logs from './components/Logs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rss-feeds" element={<RSSFeedManager />} />
            <Route path="/llm-integration" element={<LLMIntegration />} />
            <Route path="/generate-post" element={<BlogPostGenerator />} />
            <Route path="/automations" element={<AutomationManager />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;