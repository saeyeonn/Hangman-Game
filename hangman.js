const words = ['cherry', 'blueberry', 'melon', 'peach', 'watermelon'];

let answer = words[Math.floor(Math.random() * words.length)];
let selectedLetters = [];
let count = 0;

function setup() {
    document.getElementById('word').innerHTML = "<p>Guess this word: " + "_ ".repeat(answer.length) + "</p>";
    for (let char of "abcdefghijklmnopqrstuvwxyz") {
        let btn = document.createElement("button");
        btn.innerHTML = char;
        btn.classList.add("button");
        btn.onclick = function() { guess(char, btn); };
        document.getElementById("letters").appendChild(btn);
    }
    draw();
}

function guess(char, button) {
    if (selectedLetters.includes(char)) { // already selected letter
        return;
    }
    selectedLetters.push(char);

    if (answer.includes(char)) { // correct -> green button
        button.style.backgroundColor = "green";
        document.getElementById('word').innerHTML = "<p>Guess this word: " + getGuessedWord() + "</p>";
    } else { // wrong -> red button
        button.style.backgroundColor = "red";
        count++;
        draw();
    }

    checkEnd();
}


function getGuessedWord() {
    return answer.split('').map(letter => (selectedLetters.includes(letter) ? letter : "_ ")).join('');
}

function draw() {
    const canvas = document.getElementById('hangman_canvas');
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 250;
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        
        if (count >= 0) { // basic 
            context.moveTo(10, 230);
            context.lineTo(140, 230);
            context.moveTo(40, 230);
            context.lineTo(40, 20);
            context.lineTo(100, 20);
            context.lineTo(100, 50);
            context.stroke();
        }

        if (count >= 1) { // head
            context.beginPath();
            context.arc(100, 70, 20, 0, Math.PI * 2, true); 
            context.closePath();
            context.stroke();
        }
        
        if (count >= 2) { // body
            context.moveTo(100, 90);
            context.lineTo(100, 150);
            context.stroke();
        }

        if (count >= 3) { // left arm
            context.moveTo(100, 110);
            context.lineTo(60, 100);
            context.stroke();
        }

        if (count >= 4) { // right arm
            context.moveTo(100, 110);
            context.lineTo(140, 100);
            context.stroke();
        }

        if (count >= 5) { // left leg
            context.moveTo(100, 150);
            context.lineTo(80, 190);
            context.stroke();
        }

        if (count >= 6) { // right leg
            context.moveTo(100, 150);
            context.lineTo(120, 190);
            context.stroke();
        }
    }
}

function checkEnd() {
    if (count >= 7) {
        alert("You lost!");
    } else if (!getGuessedWord().includes("_")) {
        alert("You won!");
    }
}

window.onload = setup;
