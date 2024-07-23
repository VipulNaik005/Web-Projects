console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("GameOver.wav");
let turn = "X";
let isgameover = false;

//Function to change turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

//Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxText");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            gameover.play();
            isgameover = true;
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px" ;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

//Game Logic
let boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    let boxText = box.children[0];
    box.addEventListener("click", () => {
        if (boxText.innerText == "") {
            boxText.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

//reset button
let rstBtn = document.querySelector("#reset");
rstBtn.addEventListener("click",()=>{
    let boxTexts = document.querySelectorAll(".boxText");
    boxTexts.forEach((boxText)=>{
        boxText.innerText = "";
    })
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
})
