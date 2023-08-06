import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();

        if (isMounted) {
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Quiz App</h1>
      <button>View Questions</button>
      {/* Other components and routes go here */}
    </div>
  );
}

export default App;
