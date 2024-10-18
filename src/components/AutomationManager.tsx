import React, { useState } from 'react';
import { Cog, Plus, Trash2 } from 'lucide-react';

const AutomationManager: React.FC = () => {
  const [automations, setAutomations] = useState<{ name: string; schedule: string }[]>([]);
  const [newAutomation, setNewAutomation] = useState({ name: '', schedule: '' });

  const addAutomation = () => {
    if (newAutomation.name && newAutomation.schedule) {
      setAutomations([...automations, newAutomation]);
      setNewAutomation({ name: '', schedule: '' });
    }
  };

  const removeAutomation = (name: string) => {
    setAutomations(automations.filter(auto => auto.name !== name));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Automation Manager</h1>
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newAutomation.name}
            onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
            placeholder="Automation name"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newAutomation.schedule}
            onChange={(e) => setNewAutomation({ ...newAutomation, schedule: e.target.value })}
            placeholder="Schedule (e.g., daily, weekly)"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addAutomation}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {automations.map((auto, index) => (
          <li key={index} className="flex items-center justify-between bg-white p-4 rounded-md shadow">
            <div className="flex items-center">
              <Cog className="text-gray-500 mr-3" size={20} />
              <span>{auto.name} - {auto.schedule}</span>
            </div>
            <button
              onClick={() => removeAutomation(auto.name)}
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

export default AutomationManager;