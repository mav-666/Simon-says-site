buttons = {
    0 : {color : "#74b807"},
    1 : {color : "#057fd0"},
    2 : {color : "#ffab23"},
    3 : {color : "#d83526"}
}

let startButton;
let resetButton;

let loseMessage;
let winMessage;

let startLoop;

let sequenceCount = 5;
let sequence = [];
let next;

let inGame;

window.addEventListener("load", () => {
   
    buttons[0].button = document.getElementById("green");
    buttons[1].button = document.getElementById("blue");
    buttons[2].button = document.getElementById("yellow");
    buttons[3].button = document.getElementById("red");

    buttons[0].button.addEventListener("click", () => checkClick(0));
    buttons[1].button.addEventListener("click", () => checkClick(1));
    buttons[2].button.addEventListener("click", () => checkClick(2));
    buttons[3].button.addEventListener("click", () => checkClick(3));

    startButton = document.getElementsByClassName("startButton")[0];
    startButton.addEventListener("click", startGame);

    resetButton = document.getElementsByClassName("resetButton")[0];
    resetButton.addEventListener("click", resetGame);

    loseMessage = document.getElementById("loseMessage");
    winMessage = document.getElementById("winMessage");

    resetGame();
});

function glowSpiral() {
    setTimeout(() => glow(buttons[0]), 100);
    setTimeout(() => glow(buttons[1]), 200);
    setTimeout(() => glow(buttons[3]), 300);
    setTimeout(() => glow(buttons[2]), 400);
}

function glow(buttonWrap) {
    let button = buttonWrap.button;
    let color = buttonWrap.color;

    button.style.boxShadow = `0px 0px 20px ${color}`;
    setTimeout(() => {
         button.style.boxShadow = `0px 0px 1px ${color}`
    }, 300);
}

function hide(item) {
    item.style.display = "none";
}

function show(item) {
    item.style.display = "block";
}

function toggleButtons(enable) {
    for(i = 0; i < 4; i++)
        buttons[i].button.disabled = !enable;
}

function startGame() {
    inGame = true;

    hide(startButton);
    show(resetButton);

    clearInterval(startLoop);

    setTimeout(createSequence, 1000, sequenceCount);
}

function createSequence(repeats) {
    if (repeats == 0) {
        toggleButtons(true);
        return;
    }
        
    addItemInSequence();
    setTimeout(() => createSequence(repeats - 1), 500)   
}

function addItemInSequence() {
    let i = randomRange(4)
    console.log(i);

    glow(buttons[i]);

    sequence.push(i);
}

function randomRange(max) {
    return Math.floor(Math.random() * max);
}

function checkClick(buttonID) {
    if(!inGame)
        return;

    if(buttonID != sequence[next++]) {
        lose();
        return;
    }
        
    if(next == sequenceCount)
        win();
}

function lose() {
    toggleButtons(false);
    show(loseMessage);
}

function win() {
    toggleButtons(false);
    show(winMessage);
}

function resetGame() {
    hide(loseMessage);
    hide(winMessage);

    hide(resetButton);

    show(startButton);

    inGame = false;
    sequence = [];
    next = 0;

    toggleButtons(false)

    startLoop = setInterval(glowSpiral, 1000);
}