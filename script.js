/*  
  Creative Commoms CC-BY
  (c) 2021 Shizuku (inucat) 
 */
"use strict"

var g_updateClock;
var [colorBg, colorFg] = ["#ffffff", "#333333"];

const FRAME_LINE_WIDTH = 8;
const [HAND_WIDTH_S, HAND_WIDTH_M, HAND_WIDTH_H] = [2, 10, 10];
const [HAND_LEN_S, HAND_LEN_M, HAND_LEN_H] = [0.8, 0.9, 0.5];
const [HOURMARK_INNER_POS, HOURMARK_OUTER_POS] = [0.8, 0.9];

function changeTheme() {
  document.getElementById("themeChanger").setAttribute("disabled", "");
  [colorBg, colorFg] = [colorFg, colorBg];
  document.getElementsByTagName("body")[0].style = `background-color: ${colorBg}`;
  g_updateClock();
}

function subRoutine () {
  // <button id="themeChanger" type="button" onclick="changeTheme()">Light/Dark</button>
  const htmlRoot = document.getElementsByTagName("html")[0];
  const bodyRoot = document.createElement("body");
  htmlRoot.appendChild(bodyRoot);

  let btn = document.createElement("button");
  btn.innerText = "Dark/Light";
  btn.setAttribute("id", "themeChanger");
  btn.setAttribute("type", "button");
  btn.onclick = changeTheme;
  bodyRoot.appendChild(btn);
  // Get canvas element
  let canv = document.getElementById("cv");
  canv = document.createElement("canvas");
  if (!canv) { 
    console.log("Canvas was not found!");
    return;
  }
  bodyRoot.appendChild(canv);

  

  let ctx = canv.getContext("2d");
  if (!ctx) { 
    console.log("Canvas Context could not be obtained!");
    return; 
  }
  
  // Prepare constants
  const CANVAS_SIZE = Math.min(window.innerHeight, window.innerWidth) * 0.9;
  const [CX, CY] = [CANVAS_SIZE / 2, CANVAS_SIZE / 2];
  const RADIUS = CANVAS_SIZE / 2 * 0.9;

  canv.setAttribute("width", `${CANVAS_SIZE}px`);
  canv.setAttribute("height", `${CANVAS_SIZE}px`);
  // console.log("Canvas size:", window.innerHeight, window.innerWidth, "-->", CANVAS_SIZE);
  // console.log("Center position:", CX, CY);

  const drawHandle = function(lineWidth, tipX, tipY) {
    ctx.save();

    ctx.fillStyle = ctx.strokeStyle = colorFg;
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    ctx.restore();
  };

  const drawFrame = function() {
    ctx.save();

    // Center
    ctx.fillStyle = ctx.strokeStyle = colorFg;
    ctx.lineWidth = FRAME_LINE_WIDTH;
    ctx.beginPath();
    ctx.ellipse(CX, CY, RADIUS*0.1, RADIUS*0.1, 0, 0, Math.PI*2);
    ctx.fill();

    // Outer frame
    ctx.beginPath();
    ctx.ellipse(CX, CY, RADIUS, RADIUS, 0, 0, Math.PI*2);
    ctx.stroke();

    // Hour marks
    for (let i=0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(
        CX + Math.cos(Math.PI * i/6) * RADIUS * HOURMARK_INNER_POS,
        CY + Math.sin(Math.PI * i/6) * RADIUS * HOURMARK_INNER_POS);
      ctx.lineTo(
        CX + Math.cos(Math.PI * i/6) * RADIUS * HOURMARK_OUTER_POS,
        CY + Math.sin(Math.PI * i/6) * RADIUS * HOURMARK_OUTER_POS);
        // CX + Math.cos(Math.PI * i/6) * (RADIUS - FRAME_LINE_WIDTH),
        // CY + Math.sin(Math.PI * i/6) * (RADIUS - FRAME_LINE_WIDTH));
      ctx.stroke();
    }
    ctx.restore();
  };

  const updateClock = function() {
    document.getElementById("themeChanger").removeAttribute("disabled");
    let date = new Date();
    let [iSec, iMin, iHour] = [
      date.getSeconds(),
      date.getMinutes(),
      date.getHours()]

    let [angleSec, angleMin, angleHour] = [
      Math.PI * iSec / 30 - Math.PI / 2,
      Math.PI * iMin / 30 - Math.PI / 2,
      Math.PI * ((60 * (iHour%12) + iMin) / 360) - Math.PI / 2
    ];

    // Calculate positions of tip of hands 
    // Simple math: x = cx + r * cos(angle), 
    //              y = cy + r * sin(angle)
    let [sx, sy, mx, my, hx, hy] = [
      CX + RADIUS * Math.cos(angleSec) * HAND_LEN_S,
      CY + RADIUS * Math.sin(angleSec) * HAND_LEN_S,
      CX + RADIUS * Math.cos(angleMin) * HAND_LEN_M,
      CY + RADIUS * Math.sin(angleMin) * HAND_LEN_M,
      CX + RADIUS * Math.cos(angleHour) * HAND_LEN_H,
      CY + RADIUS * Math.sin(angleHour) * HAND_LEN_H
    ];

    ctx.fillStyle = colorBg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawFrame();

    drawHandle(HAND_WIDTH_S, sx, sy);
    drawHandle(HAND_WIDTH_M, mx, my);
    drawHandle(HAND_WIDTH_H, hx, hy);
  };

  // To call the function by button (not so clever though)
  g_updateClock = updateClock;

  // Timer
  updateClock();
  setInterval(updateClock, 1000);
}

window.onload = subRoutine();