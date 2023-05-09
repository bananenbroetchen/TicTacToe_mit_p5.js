let canvasSize = 300;
let matrix = [];
let kästchenXY;
let kästchenXYhälfte;
let activePlayer;
let winner;
let winnerNR;
let gameEnded;

function startGame () {
    matrix = [];
    gameEnded = false;
    let matrixTemp = [];
    for (let zeile = 0; zeile < 3; zeile++) {
        for (let spalte = 0; spalte < 3; spalte++) {
            matrixTemp.push(0)
        }
        matrix.push(matrixTemp);
        matrixTemp = [];
    }
    kästchenXY = canvasSize / matrix.length;
    kästchenXYhälfte = kästchenXY / 2;
    kästchenXYviertel = kästchenXY / 4;
    activePlayer = 1;
}

function drawPlayer1 (zeile, spalte) {
    stroke("#FF5733")
    ellipse((spalte*kästchenXY)+kästchenXYhälfte, (zeile*kästchenXY)+kästchenXYhälfte, kästchenXY*0.75, kästchenXY*0.75)
}

function drawPlayer2 (zeile, spalte) {
    stroke("#33C1FF")
    line((spalte*kästchenXY)+kästchenXYviertel, (zeile*kästchenXY)+kästchenXYviertel, (spalte*kästchenXY)+kästchenXYhälfte+kästchenXYviertel, (zeile*kästchenXY)+kästchenXYhälfte+kästchenXYviertel)
    line((spalte*kästchenXY)+kästchenXYviertel, (zeile*kästchenXY)+kästchenXYhälfte+kästchenXYviertel, (spalte * kästchenXY)+kästchenXYhälfte+kästchenXYviertel, (zeile*kästchenXY)+kästchenXYviertel)
}

function zeichneSpielfeld(){
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix.length; spalte++) {
            element = matrix[zeile][spalte];
            if (element === 0) {
                fill("gray")
                stroke("black")
                rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
            } else if (element === 1){
                fill("gray")
                stroke("black")
                rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
                drawPlayer1(zeile, spalte)
            } else if (element === 2) {
                fill("gray")
                stroke("black")
                rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
                drawPlayer2(zeile, spalte)
            } else {
                console.error("Irgendwas ist mit dem Array nicht okay.")
            }
        }
        
    }
}

function defineWinner () {
    if (winnerNR === 1) {
        winner = "Rot"
    } else if (winnerNR === 2) {
        winner = "Blau"
    }
    gameEnded = true;
}

function alertEnd() {
    defineWinner()
    zeichneSpielfeld()
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    console.log("Spieler " + winner + " hat gewonnen!")
}

function checkForWin () {
    if (gameEnded === false) {
            for (let i1 = 0; i1 < 3; i1++) {
            //VERTIKAL
            if(matrix[0][i1] !== 0 && matrix[0][i1] === matrix[1][i1] && matrix[1][i1] === matrix[2][i1] && matrix[0][i1] === matrix[2][i1]) {
                winnerNR = matrix[0][i1]
                alertEnd()
            }
            //HORIZONTAL
            if(matrix[i1][0] !== 0 && matrix[i1][0] === matrix[i1][1] && matrix[i1][1] === matrix[i1][2] && matrix[i1][0] === matrix[i1][2]) {
                winnerNR = matrix[i1][0]
                alertEnd()
            }
        }
        //DIAGONAL
        //LO nach RU
        if (matrix[0][0] !== 0 && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[2][2] === matrix[0][0])  {
            winnerNR = matrix[0][0]
            alertEnd()
        }
        //LU nach RO
        if (matrix[0][2] !== 0 && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[2][0] === matrix[0][2]) {
            winnerNR = matrix[0][2]
            alertEnd()
        }
    }

}

function modifyGame(zeile, spalte) {
    if (matrix[spalte][zeile] === 0) {
        matrix[spalte][zeile] = activePlayer;
        if (activePlayer === 1) {
            activePlayer = 2;
        } else if (activePlayer === 2) {
            activePlayer = 1;
        } else{console.error("player error")}
    }
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    strokeWeight(canvasSize/75);
    startGame()
    frameRate(10);
}

function draw() {
    zeichneSpielfeld()
    checkForWin()
}

function keyTyped() {
    if (key === '1') {
        modifyGame(0, 2)
    } else if (key === '2') {
        modifyGame(1, 2)
    } else if (key === '3') {
        modifyGame(2, 2)
    } else if (key === '4') {
        modifyGame(0, 1)
    } else if (key === '5') {
        modifyGame(1, 1)
    } else if (key === '6') {
        modifyGame(2, 1)
    } else if (key === '7') {
        modifyGame(0, 0)
    } else if (key === '8') {
        modifyGame(1, 0)
    } else if (key === '9') {
        modifyGame(2, 0)
    } else if (key === 'r') {
        startGame()
    }
}


