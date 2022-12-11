let mouseDown = false;
let currentColumns = 20;
let currentRows = 20;
const canvasWidth = 400;

function notifyMouseDown() {
    mouseDown = true;
}

function notifyMouseUp() {
    mouseDown = false;
}

function paintPixel() {
    this.style.backgroundColor = "white";
}

function tryPaint() {
    if (!mouseDown) return;
    this.style.backgroundColor = "white";
    // TODO: advanced: add 10% black each entrance + down or click
}

function createCanvas(col, row) {
    let board = document.querySelector("div.board");
    board.style.width = canvasWidth.toString()+"px";
    board.addEventListener("mousedown", notifyMouseDown);
    board.addEventListener("mouseup", notifyMouseUp);

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




let applyButton = document.querySelector("button.apply");
const columnInput = document.getElementById("col-count");
const rowInput = document.getElementById("row-count");

columnInput.value = 20;
rowInput.value = 20;
columnInput.addEventListener("input", toggleApplyOrClear);
rowInput.addEventListener("input", toggleApplyOrClear);
applyButton.addEventListener("click", applySettings);

createCanvas(currentColumns, currentRows, canvasWidth);

/*
TODOs:
- etch a sketch model aesthetic
-- swap out font for deluxe 1800s aesthetic
- do a slideout tab at the bottom with the settings:
-- radio buttons to toggle between classic, wild, and layered modes

*/