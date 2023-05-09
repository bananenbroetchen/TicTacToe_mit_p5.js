let canvasSize = 750;
let matrix = [];

function startGame () {
    let matrixTemp = [];
    for (let zeile = 0; zeile < 3; zeile++) {
        for (let spalte = 0; spalte < 3; spalte++) {
            matrixTemp.push(0)
        }
        matrix.push(matrixTemp);
        matrixTemp = [];
        
    }
}

function zeichneSpielfeld(){
    let kästchenXY = canvasSize / matrix.length // 750 / 3 = 250
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix.length; spalte++) {
            element = matrix[zeile][spalte];
            if (element === 0) {
                fill("gray")
                rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
            } else if (element === 1){
                drawPlayer1(zeile, spalte)
            } else if (element === 2) {
                drawPlayer2(zeile, spalte)
            } else {
                console.error("Irgendwas ist mit dem Array nicht okay.")
            }
        }
        
    }
}

function drawPlayer1 (zeile, spalte) {
    fill("red")

}

function drawPlayer2 (zeile, spalte) {
    fill("blue")
    ellipse()
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    startGame()
    frameRate(10);

}

function draw() {
    zeichneSpielfeld()
}