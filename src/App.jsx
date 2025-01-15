// App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  async function generateAnswer() {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!questions?.trim()) {
      setAnswer("Please enter a question first.");
      return;
    }

    setIsLoading(true);
    setShowAnswer(false);

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`;
      
      const response = await axios({
        url: apiUrl,
        method: 'post',
        params: {
          key: apiKey
        },
        headers: {
          'Content-Type': 'application/json'
        },
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

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer("No response generated. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer(`Error: ${error.response?.data?.error?.message || error.message}`);
    } finally {
      setIsLoading(false);
      setShowAnswer(true);
    }
  }

  return (
    <div className="container">
      <h1>Ask Gemini AI</h1>
      
      <div className="question-box">
        <label htmlFor="question">Your Question:</label>
        <textarea
          id="question"
          rows="4"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="Enter your question here..."
        />
      </div>

      <button
        onClick={generateAnswer}
        disabled={isLoading}
        className={isLoading ? 'button disabled' : 'button'}
      >
        {isLoading ? 'Generating...' : 'Get Answer'}
      </button>

      {showAnswer && (
        <div className="answer-box">
          <h2>Answer:</h2>
          <div className="answer-content">
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;