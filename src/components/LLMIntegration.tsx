import React, { useState } from 'react';
import { Brain, Plus, Trash2 } from 'lucide-react';

const LLMIntegration: React.FC = () => {
  const [llms, setLLMs] = useState<{ name: string; type: string }[]>([]);
  const [newLLM, setNewLLM] = useState({ name: '', type: 'local' });

  const addLLM = () => {
    if (newLLM.name && !llms.some(llm => llm.name === newLLM.name)) {
      setLLMs([...llms, newLLM]);
      setNewLLM({ name: '', type: 'local' });
    }
  };

  const removeLLM = (name: string) => {
    setLLMs(llms.filter(llm => llm.name !== name));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">LLM Integration</h1>
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newLLM.name}
            onChange={(e) => setNewLLM({ ...newLLM, name: e.target.value })}
            placeholder="Enter LLM name"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newLLM.type}
            onChange={(e) => setNewLLM({ ...newLLM, type: e.target.value })}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="local">Local</option>
            <option value="api">API</option>
          </select>
          <button
            onClick={addLLM}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {llms.map((llm, index) => (
          <li key={index} className="flex items-center justify-between bg-white p-4 rounded-md shadow">
            <div className="flex items-center">
              <Brain className="text-purple-500 mr-3" size={20} />
              <span>{llm.name} ({llm.type})</span>
            </div>
            <button
              onClick={() => removeLLM(llm.name)}
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

export default LLMIntegration;