let logoAlura = document.getElementById("logo-alura");
let btnEncrypt = document.getElementById("encrypt");
let btnDecrypt = document.getElementById("decrypt");
let showResultTimeout;

//encrypt decrypt
function getMessage() {
    return document.getElementById("msg-input").value;
}

function encryptAlura(initialMessage) {
    let finalMessage = "";
    for (let char of initialMessage) {
        switch (char) {
            case "a":
                finalMessage += "ai";
                break;

            case "ã":
                finalMessage += "ai";
                break;

            case "á":
                finalMessage += "ai";
                break;

            case "à":
                finalMessage += "ai";
                break;

            case "e":
                finalMessage += "enter";
                break;

            case "é":
                finalMessage += "enter";
                break;

            case "i":
                finalMessage += "imes";
                break;

            case "í":
                finalMessage += "imes";
                break;

            case "o":
                finalMessage += "ober";
                break;

            case "õ":
                finalMessage += "ober";
                break;

            case "ó":
                finalMessage += "ober";
                break;

            case "u":
                finalMessage += "ufat";
                break;

            case "ú":
                finalMessage += "ufat";
                break;

            default:
                finalMessage += char;
                break;
        }
    }
    return finalMessage;
}

function decryptAlura(encryptedMessage) {
    encryptedMessage = encryptedMessage.replaceAll("ai", "a");
    encryptedMessage = encryptedMessage.replaceAll("enter", "e");
    encryptedMessage = encryptedMessage.replaceAll("imes", "i");
    encryptedMessage = encryptedMessage.replaceAll("ober", "o");
    encryptedMessage = encryptedMessage.replaceAll("ufat", "u");
    return encryptedMessage;
}

//Mostrar Resultado e botão de copy
function showResult(outputMsg) {
    let outputSection = document.getElementById("output");

    outputSection.innerHTML = `
    <div class="msg-output fade-in">
        <p id="msgOutput">${outputMsg}</p>
        <button id="copy" class="btn copy">Copiar</button>
    </div>
    `;
    let btnCopy = document.getElementById("copy");
    btnCopy.onclick = copyToClipboard;
}

function copyToClipboard() {
    let msgOutput = document.getElementById("msgOutput").innerText;
    navigator.clipboard.writeText(msgOutput);

    let resultSection = document.getElementById("output");
    let height =
        resultSection.getElementsByClassName("msg-output")[0].clientHeight;

    resultSection.innerHTML = `
    <div class="msg-copied fade-in" style="min-height: ${height}px">
        <h3>Mensagem copiada</h3>
    </div>
    `;
    showResultTimeout = setTimeout(function () {
        showResult(msgOutput);
    }, 1500);
}

function warnNoMessageFound() {
    let resultSection = document.getElementById("output");

    resultSection.innerHTML = `
    <div class="msgNotFound fade-in">
        <img id="imgMsgNotFound" src="images/no-message-found-blue.svg" alt="Message not Found">
        <h3>Nenhuma mensagem encontrada</h3>
        <p>Digite um texto que você deseja criptografar ou descriptografar.</p>
    </div>
    `;
}

//Implementando Métodos para criptografia
function encrypt() {
    clearTimeout(showResultTimeout);

    let initialMessage = getMessage();

    if (initialMessage == "") {
        warnNoMessageFound();
        return;
    }

    let finalMessage = "";
    finalMessage = encryptAlura(initialMessage);

    showResult(finalMessage);
}

function decrypt() {
    clearTimeout(showResultTimeout);
    let encryptedMessage = getMessage();
    let finalMessage = encryptedMessage;

    let encryptRegexAlura = new RegExp("^.*(ai|enter|imes|ober|ufat).*$");
    let encryptedMessageAlura = encryptRegexAlura.test(finalMessage);

    if (finalMessage == "") {
        warnNoMessageFound();
        return;
    }

    if (!encryptedMessageAlura) {
        warnNoMessageFound();
        return;
    }

    finalMessage = decryptAlura(encryptedMessage);

    showResult(finalMessage);
}

//Ação para mudar a logo ao Click
var change = true;
function changeLogo() {
    let logo = document.getElementById("logo-alura");

    if (change) {
        logo.src = "images/logo-frm.svg";
        change = false;
    } else {
        logo.src = "images/logo-alura.svg";
        change = true;
    }
}

//Aplicando os Métodos
logoAlura.onclick = changeLogo;
btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
