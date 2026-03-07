# The QBasic Classics Engine

All the data for the game itself lives in gamedata.js, where it's an object called `const gameData = { }`


##Metadata

Immediately below this is a metadata object

```
    "metadata": {
        "title": "Poop Adventure: The Shopping Center of Destiny",
        "images": true,
        "defaultImages": true,
        "inventory": true
    },
```

The title is the title of your game, while the inventory tells the game whether or not you want to show the player their inventory. Technically it'll be there under the hood regardless, but if your game doesn't use an inventory, why bother taking up space with it?

Images is whether or not your game uses images, and if defaultImages is true, the game will load a png named after the label you're on (such as 200.png) if there's no image defined.


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

The game always starts on the "0" label.

```
"20": {
            "image": "500.png",
            "text": "You are at your friend's house. What do you do?",
            "options": ["Go to the store.", "Go home"],
            "labels": ["50", "100"],
            "commands": ["Stop Audio"]
    }
```
Each label is its own object, named as what you would call it. The label is a string, and can obviously be numbers or letters, the game in this example used all numbers but it didn't have to.

"image" is the image you want to load for this label. If there's nothing there, it'll load the name of the label + .png, for example for this label it would load 20.png (if the metadata is set to do this.) All images go in the ./images/ folder.

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

`["Game Over"]` signifies a game over. This loads the player's state and puts a button on the right taking them back to the last checkpoint they were at.

`["Set Variable", 0, 5]` changes an internal variable, which are numbered, to whatever you want. In this case, it changes variable number 0 to 5

`["Add to Variable", 0, 5]`

`["Subtract from Variable", 0, 5]`

`["Play Music", "Title.wav"]` plays a music track, Music tracks loop. All audio files go in the ./audio/ folder.

`["Play SFX", "Voice.wav"]` plays a sound effect. Sound effects do not loop. All audio files go in the ./audio/ folder.

`["Stop Music"]` stops the music. Since no audio files can be played at the title screen because audio files can't be played until a user interacts with a program, it's a good idea to put one of these in the "0" label.


##Conditionals
Sometimes you only want to give the player an option if a certain condition is met. In that case, you can use the `Add Label If` command, like so:
```
["Add Label If", "V2 > 0", "Cheat", "500"]
["Add Label If", "V2 > 0", "Cheat", "500"]
["Add Label If", "I2 Owned", "Cheat", "500"]
["Add Label If", "I2 Unowned", "Cheat", "500"]
```

After the initial command, the first array entry is the condition that has to be met in order for it to run, the second is what it should say, and the last is the label for it to send the player to. Conditions work like this:

For a variable you start with V. V2 would be variable number 2.
For the operator you can use <, =, or >
And then the number you want to compare it to.

I is inventory item, followed by the number. It can be Owned or Unowned.

##Junction

`
    "25": {
        "Junction": ["V2 > 10", "50", "150"]
    },
`

Sometimes in QBasic, you want to send the player somewhere based on a condition when they make a choice, for this interpreter, that's a junction label.
Junction labels only have one item in them, "Junction," which works the same as a ternary operator in a modern programming language. First is the condition.
If it's fulfilled, the player goes to the first label, if not it goes to the second one.
If there's a junction in a label, everything else gets ignored.

Junction can be an array, as above or an array of arrays, like so:

```
//"Junction":[ 
//     ["V2 > 30", "50"],
//     ["V2 > 20", "150"],
//     ["V2 > 10", "200", "400"]
// ]
```



O  Make the save function save checkpoint and current
O  Need a 6th button
O  No default image/no change if there's no image in a label
   All the variable maths are one function
O  Make the text in a label an array of strings
