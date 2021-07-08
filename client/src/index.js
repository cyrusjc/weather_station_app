import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SketchPad from './SketchPad';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

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

ReactDOM.render(
  <React.StrictMode>
    <SketchPad />
  </React.StrictMode>,
  document.getElementById('root')
);

drawGrid();