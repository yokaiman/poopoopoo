import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [llmType, setLLMType] = useState('local');
  const [proxyUrl, setProxyUrl] = useState('');

  const saveSettings = () => {
    // Implement API call to save settings
    console.log('Saving settings:', { llmType, proxyUrl });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">LLM Type</label>
          <select
            value={llmType}
            onChange={(e) => setLLMType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="local">Local</option>
            <option value="api">API</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Proxy URL</label>
          <input
            type="text"
            value={proxyUrl}
            onChange={(e) => setProxyUrl(e.target.value)}
            placeholder="Enter proxy URL"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={saveSettings}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="mr-2" size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;