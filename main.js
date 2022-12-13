const canvasWidth = 400;
let mouseDown = false;
let currentColumns = 20;
let currentRows = 20;
let currentBrush = "classic";

function notifyMouseDown() {
    mouseDown = true;
    console.log("mousedown");
}

function notifyMouseUp() {
    mouseDown = false;
    console.log("mouseup");
}

function getColorByBrush(backgroundColor) {
    switch (currentBrush) {
        case "random":
            // Source: css-tricks
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            return "#"+randomColor;
        default: 
            return "white";
    }
}

function paintPixel() {
    this.style.backgroundColor = getColorByBrush(this.style.backgroundColor);
}

function tryPaint() {
    if (!mouseDown) return;
    this.style.backgroundColor = getColorByBrush(this.style.backgroundColor);
}

function createCanvas(col, row) {
    let board = document.querySelector("div.board");
    board.style.width = canvasWidth.toString()+"px";

    // generate pixels within the box
    for (let i=0; i<col*row; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("board-pixel");
        pixel.style.width = (canvasWidth/col).toString() + "px";
        pixel.style.height = (canvasWidth/col).toString() + "px";
        pixel.addEventListener("mouseenter", tryPaint);
        pixel.addEventListener("click", paintPixel);
        board.appendChild(pixel);
    }
}

function resetCanvas() {
    let pixels = document.querySelectorAll("div.board-pixel");
    pixels.forEach(pixel =>{
        pixel.style.backgroundColor = "black";
    });
}

function resizeCanvas(columnInput, rowInput) {
    let pixels = document.querySelectorAll("div.board-pixel");
    pixels.forEach(pixel=>{
        pixel.remove();
    });
    createCanvas(columnInput, rowInput);
}

function toggleApplyOrClear() {
    let applyButton = document.querySelector("button.apply");
    const columnInput = document.getElementById("col-count").value;
    const rowInput = document.getElementById("row-count").value;
    const toggleApply = columnInput != currentColumns || rowInput != currentRows;
    applyButton.textContent = toggleApply ? "Apply and Clear" : "Clear Board";
}

function applySettings() {
    const columnInput = document.getElementById("col-count").value;
    const rowInput = document.getElementById("row-count").value;
    if (currentColumns === columnInput && currentRows === rowInput) {
        resetCanvas();
    }
    else {
        currentColumns = columnInput;
        currentRows = rowInput;
        toggleApplyOrClear();
        resizeCanvas(columnInput, rowInput);
    }
}

function swapBrush() {
    currentBrush = this.value;
}

let body = document.querySelector("body");
let applyButton = document.querySelector("button.apply");
let radioButtons = document.querySelectorAll("input[type=\"radio\"]");
const columnInput = document.getElementById("col-count");
const rowInput = document.getElementById("row-count");

columnInput.value = 20;
rowInput.value = 20;
body.addEventListener("mousedown", notifyMouseDown);
body.addEventListener("mouseup", notifyMouseUp);
columnInput.addEventListener("input", toggleApplyOrClear);
rowInput.addEventListener("input", toggleApplyOrClear);
applyButton.addEventListener("click", applySettings);
radioButtons.forEach(btn => {
    btn.addEventListener("click", swapBrush);
});

createCanvas(currentColumns, currentRows, canvasWidth);
