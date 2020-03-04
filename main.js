
// MAIN GAME LOOP (updated in realtime)


var drones = []; // create the drone

var hostiles = [];

var resources = [];

var time = 0;

function introNarrative() {
    requestAnimationFrame(mainLoop);
    disableInput(8500);
    delayLine("recovery mode loaded!",2000);
    delayLine("<br> Prospector OS V3.7.1",3500);
    delayLine("(c) 2113, Green Horizons Firmware Corp.",4000); // 2157
    delayLine("deploying drones, please stand by",4500);
    setTimeout(function() { drones.push(new drone("drone1",630,430)); }, 6000);
    setTimeout(function() { drones.push(new drone("drone2",630,370)); }, 7000);
    setTimeout(function() { drones.push(new drone("drone3",570,370)); }, 8000);
}

function executeCommand(parameters) { //executes input commands
    var target = parameters[0];
    var action = parameters[1];
    var param1 = parameters[2];
    var param2 = parameters[3];
    var param3 = parameters[4];
    console.log("executeCommand started with target = [" + target + "], action = [" + action + "]");
    //send to target, if it exists
    //if not, print error
    for(var i = 0; i < drones.length; i++) {
        if(target == drones[i].name) {
            drones[i].executeInput(action, param1, param2, param3);
            return;
        }
    }
    if(target == "dev") {
        if(action == "spawnHostile") {
            for(var i = 0; i < param1; i++) {
                hostiles.push(new hostile(Math.trunc(Math.random()*1200),Math.trunc(Math.random()*800)));
                // ^ this adds a new hostile with random position anywhere on the map-- super lazy!
                // I should make sure they don't spawn on top of any of the drones, since that could cause a really bad NaN glitch, but no time for that
            }
            return;
        }
        else if(action == "spawnDrone") {
            drones.push(new drone(param1, param2, param3));
            return;
        }
    }
    addLine("ERROR: invalid target")
}


function mainLoop() {
    time = time + 1;
    updateCanvas();
    updateRightDiv();
    requestAnimationFrame(mainLoop);
}


function updateCanvas() {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateDrones();
    updateHostiles();
    //drawLabel(100,100,time);
    drawLabel(600,400,"BASE");
}



function updateHostiles() {
    for(var i = 0; i < hostiles.length; i++) {
        hostiles[i].actions();
        hostiles[i].display();
    }
    for (var i = 0; i < hostiles.length; i++) {  // deletes any hostiles with health <= 0
        if(hostiles[i].health <= 0) {
            hostiles.splice(i,1);
            i = i - 1;
        }
    }
}



function updateDrones() {
    var indexesToDelete = [];
    for (var i = 0; i < drones.length; i++) { 
        drones[i].actions();
        drones[i].display();
    }
    for (var i = 0; i < drones.length; i++) {  // deletes any drones with health <= 0
        if(drones[i].health <= 0) {
            drones.splice(i,1);
            i = i - 1;
        }
    }
}


function updateRightDiv() {
    updateStatusBar();
    updateDroneDashboard();
}

function updateStatusBar() {
    // update clock
    var hours = Math.trunc(time/6000);
    var minutes = Math.trunc((time%6000)/60);
    var seconds = Math.trunc((time%60));
    var innerParagraph = document.getElementById("time");
    innerParagraph.innerHTML = "SYSTEM TIME: " + hours + ":" + minutes + ":" + seconds;
    //update resources (fuel and minerals)
}

function updateDroneDashboard() {
    var dashboard = document.getElementById("droneDashboard");
    dashboard.innerHTML = "<h1> Drone Manager </h1>";
    for(i = 0; i < drones.length; i++) {
        var droneDiv = document.createElement("div");
        droneDiv.innerHTML = droneDiv.innerHTML + "<h1>" + drones[i].name + "</h1>";
        droneDiv.innerHTML = droneDiv.innerHTML + "<p> location: [" + Math.trunc(drones[i].x) + "," + Math.trunc(drones[i].y) + "] <br> status: " + drones[i].getStatus() + " <br> health : " + drones[i].health + "% </p>";
        dashboard.appendChild(droneDiv);
    }
}