import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './SketchPad.css'



const scale = 3;
const ENDPOINT = "http://localhost:4001";

function SketchPad() {
  const id = '1';
  const name = 'sketchLine';
  const color = 'black';
  const graphDiameter = 250;
  var [graphDataPoints, setGraphDataPoints] = useState([{ x: graphDiameter, y: graphDiameter }]);
  var [dataPoints, setDataPoints] = useState([graphDiameter, graphDiameter])

  const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
  });

  useEffect(() => {

    socket.on("FromAPI", data => {
      
      //console.log(data);
      //test();
      processJoystickData(data);

    });
  }, [graphDataPoints]);

  const test = ()=> {

    var c = document.getElementById("sketchCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(dataPoints[0],dataPoints[1]);
    var dataArray = graphDataPoints;
    var dataPoint = dataPoints;

    dataPoint[0] = dataPoint[0] - 1;

    dataArray.push([dataPoint[0], dataPoint[1]]);
    setGraphDataPoints(dataArray);
    ctx.lineTo(dataPoint[0],dataPoint[1]);
    ctx.stroke();
    
    // setDataPoints([dataPoints[0] - 1, dataPoints[1]]);
    // graphDataPoints.push({x:dataPoints[0],y:dataPoints[1]})
    // setGraphDataPoints(graphDataPoints);
    console.log(graphDataPoints);
  }


  function saveData(){
    console.log();
    socket.emit("saveDB", graphDataPoints);
  }

  function processJoystickData(data) {

    //get canvas starting point
    var c = document.getElementById("sketchCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(dataPoints[0],dataPoints[1]);

    var dataArray = graphDataPoints;
    var dataPoint = dataPoints;

    let changed = false;

    if (data.x_data < 50) {
      dataPoint[0] = dataPoint[0] - scale;
      changed = true;
    }
    else if (data.x_data > 90) {
      dataPoint[0] = dataPoint[0] + scale;
      changed = true;
    }
    if (data.y_data < 50) {
      dataPoint[1] = dataPoint[1] - scale;
      changed = true;
    }
    else if (data.y_data > 90) {
      dataPoint[1] = dataPoint[1] + scale;
      changed = true;
    }
    if(changed){
      dataArray.push({x:dataPoint[0],y:dataPoint[1]});
      setGraphDataPoints(dataArray);
      ctx.lineTo(dataPoint[0],dataPoint[1]);
      ctx.stroke();
    }
  }
  
  return (
    <div className="SketchPad">
      <div>
        <h3>Online Etch-a-sketch</h3>
        <canvas id="sketchCanvas" width={graphDiameter*2} height={graphDiameter*2}>
          Your browser does not support the HTML canvas tag.</canvas>
      </div>
      <button onClick={() => saveData()}>
        Send Data
      </button>
    </div>
  );
}

export default SketchPad