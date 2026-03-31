let angle = 0;
let currentSpeed = 0; 
let direction = 1;

const detectionDistance = 200; 
const escapeSpeed = 0.18;      
const normalSpeed = 0.02;      
const radius = 229;
const centerX = 230;
const centerY = 260;

const img = document.getElementById("myimg");
const cursor = document.querySelector('.custom-cursor');

const container = document.querySelector('.container');

let mouseX = 0;
let mouseY = 0;
let relativeX = 0;
let relativeY = 0;

function handleInput(e) {
    if (e.type === 'touchstart' || e.type === 'touchmove') {
        if (e.cancelable) e.preventDefault(); 
        mouseX = e.touches[0].pageX;
        mouseY = e.touches[0].pageY;
    } else {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }
    
    // 1. Calculate relative position inside the centered container
    const rect = container.getBoundingClientRect();
    relativeX = mouseX - (rect.left + window.scrollX);
    relativeY = mouseY - (rect.top + window.scrollY);

    if(cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.display = "block"; 
    }
}

document.addEventListener('mousemove', handleInput);
document.addEventListener('touchstart', handleInput, { passive: false });
document.addEventListener('touchmove', handleInput, { passive: false });

function update() {
    let runnerX = centerX + radius * Math.cos(angle);
    let runnerY = centerY + radius * Math.sin(angle);

    // 2. Use relativeX and relativeY for distance math
    const dx = runnerX - relativeX;
    const dy = runnerY - relativeY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < detectionDistance) {
        currentSpeed = escapeSpeed;
    } else {
        currentSpeed = normalSpeed;
    }

    angle += (currentSpeed * direction);

    if (distance < 35) {
        alert("Caught! Restarting...Again");
        location.reload();
        return;
    }

    img.style.left = (centerX + radius * Math.cos(angle)) + "px";
    img.style.top = (centerY + radius * Math.sin(angle)) + "px";

    requestAnimationFrame(update);
}

update();