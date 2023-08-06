import React from "react";

function QuestionList({ questions, setQuestions }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      } else {
        console.error("Failed to delete question.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectAnswerChange = async (id, newCorrectIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });

      if (response.ok) {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id
              ? { ...question, correctIndex: newCorrectIndex }
              : question
          )
        );
      } else {
        console.error("Failed to update correct answer.");
      }
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  return (
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>
                  {answer}
                  {question.correctIndex === index && " (Correct Answer)"}
                </li>
              ))}
            </ul>
            <select
              value={question.correctIndex}
              onChange={(e) =>
                handleCorrectAnswerChange(question.id, Number(e.target.value))
              }
            >
              <option value={0}>Answer 1</option>
              <option value={1}>Answer 2</option>
              <option value={2}>Answer 3</option>
            </select>
            <button onClick={() => handleDelete(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
