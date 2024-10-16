const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-=_+[]{}|;:,.<>?/';

class PasswordSpecs {
    constructor() {
        this.caseVariant = document.querySelector('input[name="case"]:checked').value;
        this.passwordLength = document.getElementById("range__length").value;
        this.includeNumbers = document.getElementById("checkbox__numbers").checked;
        this.includeSymbols = document.getElementById("checkbox__symbols").checked;
        this.includeLetters = document.getElementById("checkbox__letters").checked;
    }
}

function changeRangeValue() {
    let value = document.getElementById("range__length").value;
    document.getElementById("range__value").innerText = value
}

function switchCaseDisplay() {
    if (document.getElementById("checkbox__letters").checked) {
        document.getElementsByClassName("main-section_case")[0].style.display = "flex";
    } else {
        document.getElementsByClassName("main-section_case")[0].style.display = "none";
    }
}

function showActiveButton() {
    document.getElementById("button").classList.add("main-section__button_active");
    document.getElementById("button").innerHTML = "Скопировано!"
    setTimeout(function() {
        document.getElementById("button").classList.remove("main-section__button_active");
        document.getElementById("button").innerHTML = "Сгенерировать";
    }, 1000);
}

function generatePassword() {
    showActiveButton()

    const passwordSpecs = new PasswordSpecs;

    let len = passwordSpecs.passwordLength;
    let caseVariant = passwordSpecs.caseVariant;
    let includeLetters = passwordSpecs.includeLetters;
    let includeNumbers = passwordSpecs.includeNumbers;
    let includeSymbols = passwordSpecs.includeSymbols;
    
    let chars = '';
    let password = '';

    if (includeLetters) {
        switch (caseVariant) {
            case "mixed":
                chars += uppercase;
                chars += lowercase;
                break;
            
            case "lowercase":
                chars += lowercase;
                break;

            case "uppercase":
                chars += uppercase;
                break;

            default:
                break;
        }
    }
    if (includeNumbers) {
        chars += numbers;
    }
    if (includeSymbols) {
        chars += symbols;
    }

    const allCharsLen = chars.length;

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * allCharsLen);
        password += chars.charAt(randomIndex);
    }

    document.getElementById("output").value = password;

    navigator.clipboard.writeText(password);
}

if (!window.crypto && !window.crypto.getRandomValues) {
    alert("Упс! Кажется ваш браузер не поддерживает Crypto API. Пароль не может быть сгенерирован.")
}