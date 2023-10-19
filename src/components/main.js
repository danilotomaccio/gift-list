const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let touchX = 0;
let touchY = 0;
let frequency = 0;

let lastTime = 0;
let blinkState = true;

function draw(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Decidi se mostrare o nascondere il cerchio basato sulla frequenza di lampeggio
    if (now - lastTime >= (1000 / frequency)) {
        blinkState = !blinkState;
        lastTime = now;
    }
    
    if (blinkState) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.fill();
    }
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
