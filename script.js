const getData = (label) => gameData["mainData"][label]

function changeButtons(buttonLabels, currentLabels) {
    for(let button of buttons){
        button.style.display = "none"
        button.onclick = null
    }

    if (!buttonLabels) { return 0 }

    for (let i = 0; i < buttonLabels.length; i++) {
      buttons[i].innerText = buttonLabels[i]
      buttons[i].style.display = "block"
      buttons[i].onclick = () => {
            newLabel(currentLabels[i])
        };
     }
}


const hideInventory = () => { inventoryButton.style.display = "none"}

const showInventory = () => { 
    if(gameData.metadata.inventory) { inventoryButton.style.display = "block" }
    inventoryButton.innerHTML = inventoryText()
}

const inventoryText = () => {

    if(!gameData.metadata.inventory) { 
        hideInventory()
        return "" 
    }

    if (currentInventory.length < 1) { return "Inventory Empty"}
    let ret = "Inventory: "
    for(let i = 0; i < currentInventory.length; i++){
        ret += fullInventory[currentInventory[i]] + " "
        if (i < currentInventory.length - 1 ) ret += " || "
    }
    return ret
}

const newLabel = (label) => {
    currentData = getData(label)
    gameText.innerText = currentData.text
    currentButtons = [...currentData.options]
    currentLabels = [...currentData.labels]
    picdiv.style.backgroundImage = "url('./images/"+ label + ".png')";
    if (currentData.commands) {  
        if (typeof(currentData.commands[0]) === "object") {  
            for (let command of currentData.commands) {
                runCommands(command)
            }
        }
        else {
            runCommands(currentData.commands) 
        }
    }
    changeButtons(currentButtons, currentLabels)
    if (label !== "0" && gameData.metadata.inventory) { showInventory() }




}

const init = () => {
    document.title = gameData.metadata.title
    fullInventory = gameData.mainData.inventory
    newLabel("0")
}



//global variables
const gameText = document.querySelector("#textLabel")
const inventoryButton = document.querySelector("#inventoryLabel")
const buttons = document.querySelectorAll("button")
const picdiv = document.querySelector("#imagediv")
const music = document.querySelector("#music")
let currentData
let fullInventory
let currentInventory = []
let checkpointInventory = []
let currentVars = []
let checkpointVars = []
let currentMusic = ""

init()



