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


const showMenu = () => {  console.log("jh")
        const mainMenu = {
            "text": inventoryText(),
            "options": ["Save", "Load", "Back"],
            "labels": ["Save", "Load", currentLabel]
        }

        prepareTextAndOptions(mainMenu)
        changeButtons(currentButtons, currentLabels)
}


const saveGame = () => {



    localStorage.setItem("saveData", JSON.stringify(gameState));
}

const loadGame = () => {
    
}

const inventoryText = () => {

    if (currentInventory.length < 1) { return "Inventory Empty"}
    let ret = "Inventory: "
    for(let i = 0; i < currentInventory.length; i++){
        ret += fullInventory[currentInventory[i]] + " "
        if (i < currentInventory.length - 1 ) ret += " || "
    }
    return ret
}

const prepareTextAndOptions = (data) => {
    gameText.innerText = data.text
    if (data.options) { 
        currentButtons = [...data.options]
    }
    if (data.labels) { currentLabels = [...data.labels] }
}

const newLabel = (label) => {
    sfx.pause()
    let currentData = { ...getData(label) }
    currentLabel = label

    prepareTextAndOptions(currentData)

    if (currentData.labels) { currentLabels = [...currentData.labels] }
    picdiv.style.backgroundImage = "url('./images/"+ label + ".png')";
    if (currentData.commands) {  
        if (typeof(currentData.commands[0]) === "object") {  
            for (let command of currentData.commands) {
                runCommands(command, label)
            }
        }
        else {
            runCommands(currentData.commands) 
        }
    }
    changeButtons(currentButtons, currentLabels)
    




}

const init = () => {
    document.title = gameData.metadata.title
    menuBarTitle.innerText = gameData.metadata.title
    fullInventory = gameData.mainData.inventory

    menuButton.onclick = () => { showMenu() }

    newLabel("0")
}




//global variables
const menuBarTitle = document.querySelector("#titleLabel")
const gameText = document.querySelector("#textLabel")
const menuButton = document.querySelector("#menuButton") //change when make save and load
const buttons = Array.from(document.querySelectorAll(".optionButton"))
const picdiv = document.querySelector("#imagediv")
const music = document.querySelector("#music")
const sfx = document.querySelector("#audio")
let fullInventory
let currentInventory = []
let checkpointInventory = []
let currentVars = []
let checkpointVars = []
let currentButtons = []
let currentLabels = []
let currentMusic = ""
let checkpointLabel = ""
let currentLabel = ""

let currentState = {
    "label": "", //currentLabel,
    "inventory": [], //[...currentInventory],
    "vars": [], //[...currentVars],
    "music": "" //currentMusic
}

let checkpointState = {
    "label": "", //checkpointLabel,
    "inventory": [], //[...checkpointInventory],
    "vars": [], //[...checkpointLabel],
    "music": "" //checkpointMusic
}



init()



