const ifCondition = (cond) => { 
    condArray = cond.split(" ")
    let thingNo = parseInt(condArray[0].slice(1))
    if (cond[0].toUpperCase() === "V") {
        compareNo = parseInt(condArray[2])
        if (condArray[1] === ">") { return currentVars[thingNo] > compareNo }
        if (condArray[1][0]=== "=") { return currentVars[thingNo] === compareNo }
        if (condArray[1] === "<") { return currentVars[thingNo] < compareNo }
    }
    if (cond[0].toUpperCase() === "I") { 
        if (cond.split(" ")[1] === "Owned") { return currentInventory.indexOf(thingNo) != -1 }
        else if (cond.split(" ")[1] === "Unowned") { return currentInventory.indexOf(thingNo) == -1 }
    }
}



const runCommands = (commands) => { 
    if (commands[0] === "Give Item") { 
        currentInventory.push(commands[1]) 
    }
    
    if (commands[0] === "Remove Item") { 
        let pl = currentInventory.indexOf(commands[1])
        if(pl !== -1) { currentInventory.splice(pl, 1) }
    }
    
    if (commands[0] === "Checkpoint") { 
        checkpointInventory = [...currentInventory] 
        checkpointVars = [...currentVars] 
        showInventory()
    }
    
    if (commands[0] === "Game Over") { 
        hideInventory()
        currentInventory = [...checkpointInventory] 
        currentVars = [...checkpointVars] 
    }

    if (commands[0] === "Change Variable") { 
        currentVars[commands[1]] = commands[2]
    }

    if (commands[0] === "Play Audio") { 
        if (currentMusic != commands[1]) {
            currentMusic = commands[1]
            music.src = "./sound/" + commands[1]
            music.play()
        }
    }

    if (commands[0] === "Stop Audio") { 
        music.pause()
    }

    ["Add Label If", "V2 > 0", "Cheat", "500"]
   if (commands[0] === "Add Label If") {  
        if(ifCondition(commands[1])) { 
            currentButtons.push(commands[2])
            currentLabels.push(commands[3])
         }
    } 


}
