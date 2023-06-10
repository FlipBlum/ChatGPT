// create a react component that inputs a textarea message and then performs a fetch request to localhost:3001 gets back a response as a data.message and displays that message in a box below

import React, { Component } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message})
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message))
    .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message} 
          onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;
