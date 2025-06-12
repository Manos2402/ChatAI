import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai/+esm";

const ai = new GoogleGenAI({ apiKey: "" });

const send = document.querySelector(".send")
send.addEventListener("click", pushReq)

const textArea = document.getElementById("prompt")

const header = document.getElementById("header")
const main = document.getElementById("main")
const footer = document.getElementById("footer")

let chat = "";


async function pushReq(){
  const loader = document.createElement("div")
  loader.className = "loader"
  send.disabled = true;
  const text = textArea.value;
  textArea.value = ""
  let reqDiv = document.createElement("div")
  reqDiv.className = "req"
  
  let reqP = document.createElement("p")
  reqP.innerHTML = text
  
  reqDiv.appendChild(reqP)
  main.appendChild(reqDiv)
  main.appendChild(loader)
   fetch(text)
   createChat(text,null)
}

async function fetch(prompt) {
  console.log(`${chat}
    
    Now my question is - ${prompt}`)
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${chat}
    
    Now my question is - ${prompt}`,
  });
  
  let res = response.text;
  createChat(null, res)
  pushRes(res)
}

function pushRes(response){
  const loader = document.querySelector(".loader")
  let resDiv = document.createElement("div")
  resDiv.className = "res"
  
  let resP = document.createElement("p")
  const md = marked.parse(response)
  resP.innerHTML = md
  
  resDiv.appendChild(resP)
  loader.remove()
  main.appendChild(resDiv)
  send.disabled = false;
}

function createChat(req, res){
  
  const ele = document.querySelectorAll(".req")
  
    if (ele.length == 1 && req) {
      chat = `I previously asked you the following qouestions and you answered these-
  
  `}
  if(ele.length == 1){
    if (req) {
      chat += `My Question-${req}
      
      `
        
    }else if(res){
      chat += `Your Answer-${res}
      
      `
        
     }
   }else if(ele.length > 1){
      if (req) {
      chat += `My Question-${req}
      
      `
        
  }else if(res){
    chat += `Your Answer-${res}
    
    `
      
  }
    }
 
 
// console.log(chat)
}

console.log(chat)

//setInterval(function() {console.log(chat)}, 3000);





//await fetch();


