import React, { useState } from "react";

function QuestionForm({ fetchQuestions }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        setPrompt("");
        setAnswers(["", "", ""]);
        setCorrectIndex(0);
        fetchQuestions();
      } else {
        console.error("Failed to add new question.");
      }
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt">Prompt:</label>
      <input
        type="text"
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <label htmlFor="answer1">Answer 1:</label>
      <input
        type="text"
        id="answer1"
        value={answers[0]}
        onChange={(e) => setAnswers([e.target.value, answers[1], answers[2]])}
      />
      <label htmlFor="answer2">Answer 2:</label>
      <input
        type="text"
        id="answer2"
        value={answers[1]}
        onChange={(e) => setAnswers([answers[0], e.target.value, answers[2]])}
      />
      <label htmlFor="answer3">Answer 3:</label>
      <input
        type="text"
        id="answer3"
        value={answers[2]}
        onChange={(e) => setAnswers([answers[0], answers[1], e.target.value])}
      />
      <label htmlFor="correctAnswer">Correct Answer:</label>
      <select
        id="correctAnswer"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(Number(e.target.value))}
      >
        <option value={0}>Answer 1</option>
        <option value={1}>Answer 2</option>
        <option value={2}>Answer 3</option>
      </select>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
