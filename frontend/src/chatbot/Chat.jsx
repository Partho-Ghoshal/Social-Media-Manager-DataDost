import { useState } from 'react';
import { getLangchainResponse } from './api.js';

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Replace with your API call logic
      const apiResponse = await getLangchainResponse(inputValue);
      setResponse(apiResponse);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (!text) return "";
    const lines = text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith(":**")) {
        return (
          <h2 key={index} className="text-lg font-bold text-gray-800 my-2">
            {line.replace(/\*\*/g, "")}
          </h2>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {line}
          </p>
        );
      }
    });
    return lines;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Langchain Chatbot
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your message"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`py-2 px-4 rounded-lg font-semibold text-white transition-all ${loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        {error && (
          <p className="text-red-600 font-medium text-center">{error}</p>
        )}
        {response && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Response:
            </h2>
            <pre className="whitespace-pre-wrap leading-relaxed text-gray-700 font-mono bg-blue-200 p-4 rounded-lg overflow-auto">
              {formatResponse(response)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
