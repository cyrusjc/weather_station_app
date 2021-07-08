import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Button from 'react-bootstrap/Button';
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
  var heart = [
    {x:250,y:250},{x:260,y:240},{x:270,y:230},{x:280,y:230},{x:290,y:240},{x:300,y:250},{x:300,y:260},
    {x:290,y:270},{x:280,y:280},{x:270,y:290},{x:260,y:300},{x:250,y:310},
    {x:240,y:300},{x:230,y:290},{x:220,y:280},{x:210,y:270},
    {x:200,y:260},{x:200,y:250},{x:210,y:240},{x:220,y:230},{x:230,y:230},{x:240,y:240},{x:250,y:250}]

  const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
  });

  useEffect(() => {

    socket.on("FromAPI", data => {
      processJoystickData(data);
    });
  }, [graphDataPoints]);

  function clearCanvas(){
    var canvas = document.getElementById("sketchCanvas");
    const context = canvas.getContext('2d');
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
  }

  function drawGrid(){      
    var c = document.getElementById("sketchCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle="rgb(230, 255, 255)"
    for(let i = 1; i< 250*2/5;i++){
      ctx.moveTo(i*5, 0);
      ctx.lineTo(i*5, i*250*2);
      ctx.stroke();      
      ctx.moveTo(0, i*5);
      ctx.lineTo(i*250*2, i*5);
      ctx.stroke();
    }
  }
  

  function drawHeart(){
    drawFromArray(heart);
  }

  function drawFromArray(data){
    for(let i =0;i<data.length-1; i++){
      (function(index) {
        setTimeout(function() {
          var c = document.getElementById("sketchCanvas");
          var ctx = c.getContext("2d");
          ctx.beginPath();
          ctx.strokeStyle="black"
          ctx.moveTo(data[i].x,data[i].y);
          ctx.lineTo(data[i+1].x,data[i+1].y);
          ctx.stroke();
         }, i * 100);      
      })(i);
    }
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
      dataPoint[1] = dataPoint[1] + scale;
      changed = true;
    }
    else if (data.y_data > 90) {
      dataPoint[1] = dataPoint[1] - scale;
      changed = true;
    }
    if(changed){
      dataArray.push([dataPoint[0], dataPoint[1]]);

      setGraphDataPoints(dataArray);
      ctx.lineTo(dataPoint[0],dataPoint[1]);
      ctx.stroke();
    }
  }
  
  return (
    <div className="SketchPad">
      <div>
        <h3 className = "sketchTitlte">Online Etch-a-sketch</h3>
        <canvas id="sketchCanvas" width={graphDiameter*2} height={graphDiameter*2}>
          Your browser does not support the HTML canvas tag.</canvas>
      </div>
      <Button variant="primary" onClick={() => drawHeart()}>
        Draw Heart
      </Button>{' '}
      <button onClick={() => saveData()}>
        Send Data
      </button>
      <Button variant="danger" onClick={() => clearCanvas()}>
        Clear
      </Button>{' '}
      <footer class="text-muted text-center text-small">
        <p class="mb-1">© 2021-2021 Cyrus Cheung & Michael Liu</p>
      </footer>
    </div>
  );
}

export default SketchPad