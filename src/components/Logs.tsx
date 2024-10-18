import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw } from 'lucide-react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Logs</h1>
      <div className="mb-4">
        <button
          onClick={fetchLogs}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="mr-2" size={20} />
          Refresh Logs
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <pre className="whitespace-pre-wrap">
          {logs.join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default Logs;