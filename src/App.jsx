import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function generateAnswer() {
    if (!questions?.trim()) {
      setAnswer("Please enter a question first.");
      return;
    }

    setIsLoading(true);
    setShowAnswer(false);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: questions }] }] }
      );

      const generatedText = response.data.candidates[0]?.content?.parts[0]?.text;
      setAnswer(generatedText || "No response generated. Please try again.");
    } catch (error) {
      console.error("API Error:", error);
      setAnswer(`Error: ${error.response?.data?.error || 'Failed to generate response'}`);
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