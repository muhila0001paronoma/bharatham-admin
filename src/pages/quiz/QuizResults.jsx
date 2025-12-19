import React, { useState, useEffect } from 'react';
import './QuizResults.css';
import { getQuizResults } from '../../data/data.js';

const QuizResults = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadQuizResults = async () => {
      const resultsData = await getQuizResults();
      setRows(resultsData);
    };
    loadQuizResults();
  }, []);
  return (
    <div className="quiz-results-page">
      <div className="quiz-results-header">
        <h2>Quiz Results</h2>
      </div>

      <div className="quiz-results-card">
        <div className="quiz-results-card-header">
          <div className="card-title">Quiz Results</div>
          <div className="card-actions">
            <button className="outline-btn">
              <span className="icon">☰</span>
            </button>
            <div className="search-box">
              <span className="icon">🔍</span>
              <input placeholder="Search..." />
            </div>
            <button className="primary-btn">Add Workout Video</button>
          </div>
        </div>

        <div className="quiz-results-table">
          <div className="table-head">
            <span>#</span>
            <span>#</span>
            <span>TOPIC</span>
            <span>TYPE</span>
            <span>USER EMAIL</span>
            <span>TOTAL QUESTIONS</span>
            <span>CORRECT ANSWERS</span>
            <span>RESULT</span>
            <span>GRADE</span>
            <span>ATTEMPT NO</span>
            <span>DATE TIME</span>
            <span>ACTIVE</span>
            <span>ACTIONS</span>
          </div>

          {rows.map((row) => (
            <div key={row.id} className="table-row">
              <span className="checkbox">
                <input type="checkbox" />
              </span>
              <span>{row.id}</span>
              <span>{row.topic}</span>
              <span>{row.type}</span>
              <span>{row.email}</span>
              <span>{row.total}</span>
              <span>{row.correct}</span>
              <span>{row.result}</span>
              <span>{row.grade}</span>
              <span>{row.attempt}</span>
              <span>{row.date}</span>
              <span>
                <span className={`status-pill ${row.active ? 'active' : ''}`}>
                  {row.active ? 'Active' : 'Inactive'}
                </span>
              </span>
              <span className="actions">
                <button className="action-btn edit" aria-label="edit">✎</button>
                <button className="action-btn delete" aria-label="delete">🗑</button>
              </span>
            </div>
          ))}
        </div>

        <div className="quiz-results-footer">
          <span>1-10 of 97</span>
          <div className="pagination">
            <button className="outline-btn">◀</button>
            <button className="outline-btn">▶</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;

