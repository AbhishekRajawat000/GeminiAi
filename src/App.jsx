import { useState } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false); // New state for visibility
  const [isLoading, setIsLoading] = useState(false); // New loading state

  async function generateAnswer() {
    setIsLoading(true);
    setShowAnswer(false); // Hide answer before generating
    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDxkKZn14a6HBqF5txrFC32C2poTuy0QXM',
      method: 'post',
      data: {
        contents: [
          {
            parts: [
              {
                text: questions,
              },
            ],
          },
        ],
      },
    });
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    setIsLoading(false);
    setShowAnswer(true); // Show answer after generating
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans bg-gray-500 dark:bg-gray-900 transition-colors duration-300">
      <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
        ASR Chat Bot
      </h3>
      <textarea
        className="border-2 border-gray-600 bg-gray-800 text-white rounded-lg p-2 w-full max-w-md mb-4 resize-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        cols={50}
        rows={10}
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
      ></textarea>
      <button
        onClick={generateAnswer}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
      >
        Generate
      </button>
      {isLoading ? ( // Conditional rendering for loading state
      <p className="text-white mt-4">Loading...</p>
    ) : showAnswer && ( // Conditional rendering of the answer paragraph
      <p className="border-2 border-gray-600 bg-gray-800 text-white rounded-lg p-2 w-full max-w-md mt-4 transition-colors duration-300">
        {answer}
      </p>
    )}
  </div>
);
}

export default App;