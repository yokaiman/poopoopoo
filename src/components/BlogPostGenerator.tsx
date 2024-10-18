import React, { useState } from 'react';
import { PenTool, Send } from 'lucide-react';

const BlogPostGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const generatePost = () => {
    // Here you would integrate with your LLM to generate content
    setGeneratedContent(`Generated content based on prompt: ${prompt}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Post Generator</h1>
      <div className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your blog post prompt here..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      <button
        onClick={generatePost}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 flex items-center"
      >
        <PenTool className="mr-2" size={20} />
        Generate Post
      </button>
      {generatedContent && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Content:</h2>
          <div className="bg-white p-4 rounded-md shadow">
            <p>{generatedContent}</p>
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 flex items-center"
          >
            <Send className="mr-2" size={20} />
            Publish Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPostGenerator;