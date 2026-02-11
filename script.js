


let angle = 0;
let interval = null;

let img = document.getElementById("myimg");

let centerX = 290;
let centerY = 260;
let centerZ = 260;

let radius = 229;

function startMove() {

  if (interval) return;

  interval = setInterval(function() {

    angle += 8;

    let x = centerX + radius * Math.cos(angle * Math.PI / 190);
    let y = centerY + radius * Math.sin(angle * Math.PI / 190);
    let z = centerZ + radius * Math.sin(angle * Math.PI / 190);

    img.style.left = x + "px";
    img.style.top  = y + "px";
    img.style.top  = z + "px";

  }, 50);
}

function stopMove() {
  clearInterval(interval);
  interval = null;
}

