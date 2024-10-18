import React, { useState } from 'react';
import { Rss, Plus, Trash2 } from 'lucide-react';

const RSSFeedManager: React.FC = () => {
  const [feeds, setFeeds] = useState<string[]>([]);
  const [newFeed, setNewFeed] = useState('');

  const addFeed = () => {
    if (newFeed && !feeds.includes(newFeed)) {
      setFeeds([...feeds, newFeed]);
      setNewFeed('');
    }
  };

  const removeFeed = (feed: string) => {
    setFeeds(feeds.filter(f => f !== feed));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">RSS Feed Manager</h1>
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newFeed}
            onChange={(e) => setNewFeed(e.target.value)}
            placeholder="Enter RSS feed URL"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addFeed}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {feeds.map((feed, index) => (
          <li key={index} className="flex items-center justify-between bg-white p-4 rounded-md shadow">
            <div className="flex items-center">
              <Rss className="text-blue-500 mr-3" size={20} />
              <span>{feed}</span>
            </div>
            <button
              onClick={() => removeFeed(feed)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSSFeedManager;