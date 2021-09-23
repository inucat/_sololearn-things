"use strict"
function subRoutine () {
    // document.write("WRITING...");
    // console.log("LOG TEST");
    // var i=0;
    // while (i < 10) {
    //     document.write(i + "<br />");
    //     i++;
    // }
    // var arr = [ "blue", "Red", "yallow" ];
    // for (var item in arr) {
    //     document.write(arr[item] + "<br />");
    // }
    // for (var item of arr) {
    //     document.write(item + "<br />");
    // }
    // var list = {
    //     prop1: "mac", 
    //     prop2: 222
    // };
    // with(document) {
    //     write("OTANKO NASU<br />")
    //     if (null == (str = prompt("WTF", null))) {
    //         write("null == " + str);
    //     } else {
    //         write("null != \"" + str + "\"");
    //     }
    // }
    // console.log(list);

    let eTimeDisplay = document.getElementById("timeDisplay");
    let eHandsInfo = document.getElementById("handsRotInfoDisp");
    let eCanvas = document.getElementById("cv");
    // document.getElementById
    let iCanvasSize = (window.innerHeight > window.innerWidth) 
        ? window.innerHeight 
        : window.innerWidth;
    console.log(Object.entries(eCanvas));
    const [cx, cy] = [eCanvas.clientWidth/2, eCanvas.clientHeight/2];
    const radius = Math.min(cx, cy) * 0.9;
    console.log(cx, cy);
    if (!eCanvas) { 
        colsole.log("Canvas was not found!");
        return;
    }
    setInterval(function() {
        let dtDate = new Date();
        let [iSec, iMin, iHour] = [
            dtDate.getSeconds(),
            dtDate.getMinutes(),
            dtDate.getHours()
        ]
        eTimeDisplay.innerHTML =  `${iHour}:${iMin}:${iSec}`;

        let [handSec, handMin, handHour] = [
            iSec/60,
            iMin/60,
            ((iHour%12) * 60 + iMin)/720
        ];
        let [sx, sy, mx, my, hx, hy] = [
            cx + radius * Math.cos(Math.PI * 2 * handSec-Math.PI/2),
            cy + radius * Math.sin(Math.PI * 2 * handSec-Math.PI/2),
            cx + radius * Math.cos(Math.PI * 2 * handMin-Math.PI/2),
            cy + radius * Math.sin(Math.PI * 2 * handMin-Math.PI/2),
            cx + radius * Math.cos(Math.PI * 2 * handHour-Math.PI/2) * 0.5,
            cy + radius * Math.sin(Math.PI * 2 * handHour-Math.PI/2) * 0.5,
        ];
        eHandsInfo.innerHTML = `Hands arg: Hours = ${handHour}, Minutes == ${handMin}, Seconds == ${handSec}`;

        // eCanvas.height = eCanvas.width = `${iCanvasSize}px`;
        let cc = eCanvas.getContext("2d");
        // if (!cc) { return; }
        cc.lineWidth = 1;
        cc.lineCap = "round";
        cc.fillStyle = "#ffcccc";
        cc.fillRect(0, 0, iCanvasSize, iCanvasSize);
        cc.beginPath();
        cc.moveTo(cx, cy);
        cc.lineTo(sx, sy);
        cc.stroke();

        cc.lineWidth = 8;
        cc.beginPath();
        cc.moveTo(cx, cy);
        cc.lineTo(mx, my);
        cc.stroke();
        cc.beginPath();
        cc.moveTo(cx, cy);
        cc.lineTo(hx, hy);
        cc.stroke();

        cc.fillStyle = "#000000";
        cc.beginPath();
        cc.ellipse(cx, cy, radius*0.1, radius*0.1, 0, 0, Math.PI*2);
        cc.fill();

        // cc.rotate();

    }, 1000);
}

window.onload = subRoutine();