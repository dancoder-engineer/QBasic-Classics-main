# The QBasic Classics Engine

All the data for the game itself lives in gamedata.js, where it's an object called `const gameData = { }`


##Metadata

Immediately below this is a metadata object

```
    "metadata": {
        "title": "Game Title",
        "inventory": true
    },
```

Tht title is the title of your game, while the inventory tells the game whether or not you want to show the player their inventory. Technically it'll be there under the hood regardless, but if your game doesn't use an inventory, why bother taking up space with it?


###Main Data

Under the metadata object goes the main data object

```

"mainData": {

            "inventory": ["pencil", "phone", "book", "tv"],

            ...labels
        },

```

The inventory is an array of the names of strings representing the inventory items the player can have.

##Labels

Because this system is emulating QBasic text adventures where the entire gameplay is choosing an option and going to a different choice based on what the player chose,
this engine runs on labels, just like you would GOTO in QBasic. These live in the mainData, right under the inventory, an example is as follows.

```
"20": {
            "text": "You are at your friend's house. What do you do?",
            "options": ["Go to the store.", "Go home"],
            "labels": ["50", "100"],
            "commands": ["Stop Audio"]
    }
```
Each label is its own object, named as what you would call it. The label is a string, and can obviously be numbers or letters, the game in this example used all numbers but it didn't have to.

The "text" is what you want the text in the text box to say. What would you PRINT in QBasic?

"options" is an array of what options the player can choose from in that label. This would be PRINTed in QBasic such as
1. Go to the store
2. Go Home

"labels" is where you send the player if they choose each option, in QBasic this might look like
IF choice = 1 THEN GOTO 50
IF choice = 2 THEN GOTO 100

##Commands

"commands" is either an array as seen above or an array of arrays, such as

```
     "commands": [
        ["Game Over"],
        ["Play Audio", "gameover.wav"]
        ]
```

Available commands are:

`["Checkpoint"]` saves the player's inventory and current variables for when they die. It also saves the current label so the player can be sent back when they get a game over.


//"commands": ["Game Over"]
//"commands": ["Change Variable", 0, 5]
//"commands": ["Play Audio", "Title"]
//"commands": ["Stop Audio"]
// for next can use < = >

//"commands": ["Add Label If", "V2 > 0", "Cheat", "500"]
//"commands": ["Add Label If", "I2 Owned", "Cheat", "500"]
//"commands": ["Add Label If", "I2 Unowned", "Cheat", "500"]



Do:
Junction
2 sounds?
menu inventory/save/load