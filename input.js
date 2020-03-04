
// MAIN GAME SYSTEMS FUNCTIONS

var acceptingInput = false;


function onEnterClick(ele) {
    if((event.key==='Enter' || event.keyCode == 13) && acceptingInput==true){
        console.log("onEnterClick has started");
        acceptingInput = false; // blocks further input (to prevent user from interrupting the scene run cycle)
        runScene(ele.value);
        acceptingInput = true; // stops blocking input so the user can enter their next response
    }
}

function runScene(userInput) {
    console.log("runScene has started with userInput [" + userInput + "].");
    addLine(">> " + userInput); // displays what the user just typed
    //processInput(userInput);
    //addLine("display output here");
    parseCommand(userInput);
    //displayCurrentScene(); //fetches text (and scripts?) of current scene and displays them
    inputBox.value = ''; // erases the contents of the input box
    scrollToBottom("mainConsole");
}

function parseCommand(str) { //splits input by spaces and sends the resulting array of strings to executeCommands
    console.log("parseCommand has started with string " + str);
    var words = str.split(" ");
    if(words.length<=1){
        console.log("parseCommand finished with str.length==0");
        addLine("ERROR: no target and/or action specified");
    }
    else {
        executeCommand(words); //this is in main.js
    }
    // console.log("words.length = " + words.length);
    // for(var i = 0; i < words.length; i = i + 1) {
    //     console.log("words [" + i + "] is " + words[i]);
    //     addLine("" + words[i]);
    // }
}





// UTILITY FUNCTIONS - small functions that make my life easier

function addLine(text) { //adds a new line to the mainConsole
    mainConsole.innerHTML = mainConsole.innerHTML + "<br>" + text;
}

function delayLine(text,delay) { //prints a line after a delay
    setTimeout(function() {addLine(text)},delay);
}

function disableInput(delay) { //used to prevent the user from interrupting timed events
    console.log("disableInput started");
    acceptingInput = false;
    setTimeout(function() {acceptingInput = true; console.log("disableInput ended");}, delay);
}

function scrollToBottom(elementId){  //scrolls the given element to the bottom
    var element = document.getElementById(elementId);
    element.scrollTop = element.scrollHeight - element.clientHeight;
    element.scrollIntoView({behavior:"smooth", block: "end", inline: "nearest"});
}