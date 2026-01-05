// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import CategoryForm from './components/CategoryForm';
import BudgetSummary from './components/BudgetSummary';
import * as api from './services/api';
import './App.css'; 

function App() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchBudgetSummary = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getBudgetSummary();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching budget summary:", error);
      setSummary([]); 
    } finally {
      setIsLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchBudgetSummary();
  }, [fetchBudgetSummary]);

  const handleCategoryAdded = () => {
    fetchBudgetSummary(); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Budget Tracker</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <section className="form-section">
            <div className="daily-spending-organizer-card">
              <CategoryForm onCategoryAdded={handleCategoryAdded} />
            </div>
          </section>
          
          <section className="summary-section">
            {isLoading && <p>Loading budget summary...</p>}
            {!isLoading && summary && (
              <BudgetSummary 
                summary={summary} 
                refreshCategories={fetchBudgetSummary} 
              />
            )}
            {!isLoading && summary === null && <p>Failed to load budget data.</p>}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
