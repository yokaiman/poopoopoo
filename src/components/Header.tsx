import React from 'react';
import { Link } from 'react-router-dom';
import { Rss, Brain, PenTool, Cog, Settings, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <Rss className="mr-2" size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/rss-feeds" className="flex items-center text-gray-700 hover:text-blue-600">
              <Rss className="mr-2" size={20} />
              RSS Feeds
            </Link>
          </li>
          <li>
            <Link to="/llm-integration" className="flex items-center text-gray-700 hover:text-blue-600">
              <Brain className="mr-2" size={20} />
              LLM Integration
            </Link>
          </li>
          <li>
            <Link to="/generate-post" className="flex items-center text-gray-700 hover:text-blue-600">
              <PenTool className="mr-2" size={20} />
              Generate Post
            </Link>
          </li>
          <li>
            <Link to="/automations" className="flex items-center text-gray-700 hover:text-blue-600">
              <Cog className="mr-2" size={20} />
              Automations
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center text-gray-700 hover:text-blue-600">
              <Settings className="mr-2" size={20} />
              Settings
            </Link>
          </li>
          <li>
            <Link to="/logs" className="flex items-center text-gray-700 hover:text-blue-600">
              <FileText className="mr-2" size={20} />
              Logs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;