import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai/+esm";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCBNpWYoohJThmAUoVoyueGAU29QraxkCY" });

const send = document.querySelector(".send")
send.addEventListener("click", pushReq)

const textArea = document.getElementById("prompt")

const header = document.getElementById("header")
const main = document.getElementById("main")
const footer = document.getElementById("footer")


function pushReq(){
  const text = textArea.value;
  textArea.value = ""
  let reqDiv = document.createElement("div")
  reqDiv.className = "req"
  
  let reqP = document.createElement("p")
  reqP.innerHTML = text
  
  reqDiv.appendChild(reqP)
  main.appendChild(reqDiv)
   fetch(text)
}

async function fetch(prompt) {
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  let res = response.text
  pushRes(res)
}

function pushRes(response){
  let resDiv = document.createElement("div")
  resDiv.className = "res"
  
  let resP = document.createElement("p")
  const md = marked.parse(response)
  resP.innerHTML = md
  
  resDiv.appendChild(resP)
  main.appendChild(resDiv)
}







//await fetch();


