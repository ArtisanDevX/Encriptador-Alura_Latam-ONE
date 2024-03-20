let btnEncrypt = document.getElementById("btnEncrypt");
let btnDecrypt = document.getElementById("btnDecrypt");
let sourceText = document.getElementById("sourceText");
let output = document.getElementById("output");
let h3 = output.querySelector("h3");
let h2 = output.querySelector("h2");
let p = output.querySelector("p");
let button = output.querySelector("button");

let rules = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };  

function encryptText(text) {
  let encryptedText = text;
  for (let letter in rules) {
    let regex = new RegExp(letter, "g");
    encryptedText = encryptedText.replace(regex, rules[letter]);
  }
  return encryptedText;
}

let inverseRules = {};
for (let letter in rules) {
  inverseRules[rules[letter]] = letter;
}

function decryptText(encryptedText) {
  let decryptedText = encryptedText;
  for (let code in inverseRules) {
    let regex = new RegExp(code, "g");
    decryptedText = decryptedText.replace(regex, inverseRules[code]);
  }
  return decryptedText;
}

function updateDisplay(showResult, resultText = "") {
    h3.innerText = resultText;
    h3.style.display = showResult ? "block" : "none";
    button.style.display = showResult ? "block" : "none";
    h2.style.display = showResult ? "none" : "block";
    p.style.display = showResult ? "none" : "block";
}

btnEncrypt.onclick = () => {
    let txt = sourceText.value;
    if (txt !== "") {
        let encrypted = encryptText(txt);
        console.log(encrypted);
        updateDisplay(encrypted !== "", encrypted);
    } else {
        updateDisplay(false);
    }
};

btnDecrypt.onclick = () => {
    let txt = sourceText.value;
    if (txt !== "") {
        let decrypted = decryptText(txt);
        updateDisplay(decrypted !== "", decrypted);
    } else {
        updateDisplay(false);
    }
};

document.getElementById("btnCopy").onclick = () => {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(
        document.getElementById("output").querySelector("h3").innerText
      );
    }
  });
};
