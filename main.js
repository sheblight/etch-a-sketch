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
    // TODO: advanced: add 10% black each entrance + down or click
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


createCanvas(30, 30, 400);

/*
TODOs:
- etch a sketch model aesthetic
-- swap out font for deluxe 1800s aesthetic
- do a slideout tab at the bottom with the settings:
-- row, height customization
-- radio buttons to toggle between classic, wild, and layered modes
-- apply button to apply
-- reset button

*/