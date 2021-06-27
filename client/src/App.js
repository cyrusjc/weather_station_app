import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://localhost:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT,{
      withCredentials: true,
    });
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      x:{JSON.stringify(response.x_data)} y:{JSON.stringify(response.y_data)} 
    </p>
  );

  
}

export default App