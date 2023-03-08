import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Create a WebSocket connection to the Flask backend
    socketRef.current = new WebSocket('ws://localhost:5000/stream');

    // Handle incoming WebSocket messages
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setNews((oldNews) => [...oldNews, message]);
    };

    // Clean up the WebSocket connection on unmount
    return () => socketRef.current.close();
  }, []);

  return (
    <div>
      <h1> Market News </h1>
      {news.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

export default App;






