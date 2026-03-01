const ifCondition = (cond) => { 
    condArray = cond.split(" ")
    let thingNo = parseInt(condArray[0].slice(1))
    if (cond[0].toUpperCase() === "V") {
        compareNo = parseInt(condArray[2])
        if (condArray[1] === ">") { return currentVars[thingNo] > compareNo }
        else if (condArray[1][0]=== "=") { return currentVars[thingNo] === compareNo }
        else if (condArray[1] === "<") { return currentVars[thingNo] < compareNo }
    }

    if (cond[0].toUpperCase() === "I") { 
        if (cond.split(" ")[1] === "Owned") { return currentInventory.indexOf(thingNo) != -1 }
        else if (cond.split(" ")[1] === "Unowned") { return currentInventory.indexOf(thingNo) == -1 }
    }
}


const commandHandler = {
    "Give Item": (commands) => { 
        if (commands[0] === "Give Item") { 
            currentInventory.push(commands[1]) 
        }
    },

    "Remove Item": (commands) => { 
        let pl = currentInventory.indexOf(commands[1])
        if(pl !== -1) { currentInventory.splice(pl, 1) }
    },

    "Checkpoint": (commands, currentLabel) => { 
        checkpointLabel = currentLabel
        console.log(currentLabel)
        checkpointInventory = [...currentInventory] 
        checkpointVars = [...currentVars] 
        showInventory()
    },

    "Game Over": (commands, currentLabel) => { 
        hideInventory()
        currentButtons = ["Return to Checkpoint"]
        currentLabel = checkpointLabel
        currentInventory = [...checkpointInventory] 
        currentVars = [...checkpointVars] 
    },

    "Change Variable": (commands) => { 
        currentVars[commands[1]] = commands[2]
    },

    "Play Audio": (commands) => { 
        if (currentMusic != commands[1]) {
            currentMusic = commands[1]
            music.src = "./sound/" + commands[1]
            music.play()
        }
    },

    "Stop Audio": () => { 
        music.pause()
    },

    "Add Label If": (commands) => {  
        if(ifCondition(commands[1])) { 
            currentButtons.push(commands[2])
            currentLabels.push(commands[3])
         }
    } 



}


const runCommands = (commands, currentLabel) => { 

    const handler = commandHandler[commands[0]]
    if (handler) { handler(commands, currentLabel) }

}
