import React from 'react';

function TestPage() {
  const question = "What is a linked list?";
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your answer: ${answer}`);
    // Later, this will go to the backend for evaluation
  };

  return (
    <div>
      <h2>Test Page</h2>
      <p>Question: {question}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default TestPage;