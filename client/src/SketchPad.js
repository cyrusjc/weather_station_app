import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './SketchPad.css'


const ENDPOINT = "http://localhost:4001";

function SketchPad() {
  const id = '1';
  const name = 'sketchLine';
  const color = 'black';
  const graphDiameter = 1000;
  const [graphDataPoints, setGraphDataPoints] = useState([]);
  const [dataPoints, setDataPoints] = useState([0,0])

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
    });
    socket.on("FromAPI", data => {
      processJoystickData(data);
    });
  }, []);

  function calculateNewCoordinates(oldCoordinates, newInput){};

  function processJoystickData(data){
    const dataJson = JSON.parse(data);
    if(dataJson.x_data < 72){
      setDataPoints([dataPoints[0]-1, dataPoints[1]]);
    } 
    else if(dataJson.x_data > 76){
      setDataPoints([dataPoints[0]+1, dataPoints[1]]);
    } 
    if(dataJson.y_data < 72){
      setDataPoints([dataPoints[0], dataPoints[1]-1]);
    } 
    else if(dataJson.y_data> 76){
      setDataPoints([dataPoints[0], dataPoints[1]+1]);
    }
    setGraphDataPoints(graphDataPoints.concat(dataPoints));
  };

  return (
    <div className="SketchPad">
      <h3>Not Weather Station</h3>
      <LineChart width={graphDiameter} height={graphDiameter} data={graphDataPoints}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default SketchPad