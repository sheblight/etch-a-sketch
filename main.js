let mouseDown = false;

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
}

function createCanvas(row, col, canvasWidth) {
    let board = document.querySelector("div.board");
    board.style.width = canvasWidth.toString()+"px";
    board.addEventListener("mousedown", notifyMouseDown);
    board.addEventListener("mouseup", notifyMouseUp);

    // generate pixels within the box
    for (let i=0; i<row*col; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("board-pixel");
        pixel.style.width = (canvasWidth/row).toString() + "px";
        pixel.style.height = (canvasWidth/row).toString() + "px";
        pixel.addEventListener("mouseenter", tryPaint);
        pixel.addEventListener("click", paintPixel);
        board.appendChild(pixel);
    }
}


createCanvas(12, 12, 400);