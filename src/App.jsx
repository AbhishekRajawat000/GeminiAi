import { useState } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [previousQuestion, setPreviousQuestion] = useState('');

  async function generateAnswer() {
    setAnswer('Loading...');
    setPreviousQuestion(questions);
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
    setQuestions('');
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
        ASR Chat Bot
      </h3>
      {previousQuestion && ( // Display the previous question if it exists
        <p className="border-2 border-black dark:border-gray-600 rounded-lg p-2 mt-4 text-black dark:text-white bg-gray-50 dark:bg-gray-800 w-full max-w-md transition-colors duration-300">
          Your Question: {previousQuestion}
        </p>
      )}
      <textarea
        className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 w-full max-w-md mb-4 resize-none transition-colors duration-300"
        cols={50}
        rows={10}
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
      ></textarea>
      <button
        onClick={generateAnswer}
        className="bg-blue-500 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200"
      >
        Generate
      </button>
      <p className="border-2 border-black dark:border-gray-600 rounded-lg p-2 mt-4 text-red-700 dark:text-red-400 bg-gray-50 dark:bg-gray-800 w-full max-w-md transition-colors duration-300">
        {answer}
      </p>
    </div>
  );
}

export default App;
