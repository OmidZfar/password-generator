const result = document.getElementById("generator");
const length = document.getElementById("numberofcharacters");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const specialchar = document.getElementById("special-characters");
const generator = document.getElementById("pswgen");

// Creating character codes for the program from the ASCII-table.
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

// Code generating function
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

// Password generating function
function generatePass(characterAmount, includeUppercase, includeSymbols, includeNumbers) {
    let charCodes = LOWERCASE_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode =
            charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
}

//Rutan som innehåller siffran
let numberofchar = document.querySelector(".numberofcharacters")

function rangechanged(rangeElement) {
    const number = (rangeElement.value)
    numberofchar.value = number
    meterScore()
}

function buttonClicked() {
    const characterAmount = numberofchar.value
    const includeUppercase = document.getElementById("uppercase").checked
    const includeSymbols = document.getElementById("special-characters").checked
    const includeNumbers = document.getElementById("numbers").checked
    const generate = generatePass(characterAmount, includeUppercase, includeSymbols, includeNumbers)
    document.querySelector(".generator").innerHTML = generate
    meterScore()
}

let meter = document.querySelector("meter")
const scoreText = document.querySelector(".result-hidden")

function meterScore(rangeElement) {
    let score = 0
    const includeUppercase = document.getElementById("uppercase").checked
    const includeSymbols = document.getElementById("special-characters").checked
    const includeNumbers = document.getElementById("numbers").checked
    if (includeUppercase) {
        score += 20
    }
    if (includeSymbols) {
        score += 20
    }
    if (includeNumbers) {
        score += 20
    }
    if (numberofchar.value >= 8) {
        score += 10
    }
    if (numberofchar.value >= 16) {
        score += 10
    }
    if (numberofchar.value >= 24) {
        score += 10
    }
    if (numberofchar.value >= 32) {
        score += 10
    }
    if (meter.value >= 70) {
        scoreText.classList.remove("result-hidden")
        scoreText.innerText = "Very good"
        scoreText.classList.remove("yellow-text")
        scoreText.classList.remove("red-text")
        scoreText.classList.add("green-text")
    } else if (meter.value > 31 && meter.value < 70) {
        scoreText.classList.remove("result-hidden")
        scoreText.innerText = "Good"
        scoreText.classList.remove("green-text")
        scoreText.classList.remove("red-text")
        scoreText.classList.add("yellow-text")
    } else {
        scoreText.classList.remove("result-hidden")
        scoreText.innerText = "Bad"
        scoreText.classList.remove("green-text")
        scoreText.classList.remove("yellow-text")
        scoreText.classList.add("red-text")
    }
    meter.value = score
}
