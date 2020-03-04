var maxDroneRange = 1000000000;

class drone {
    constructor(iName,iX,iY) {
        this.name = iName;
        this.speed = 0.3;
        this.carrying = false;
        this.x = 600; // float value, but is rounded for display/ game purposes
        this.y = 400;
        this.moveCoordX = iX * 1.0;
        this.moveCoordY = iY * 1.0;
        this.currBehavior = 0;
        this.health = 100;
        this.weaponActive = true;
        this.weaponCooldown = 0;
        this.weaponCdCap = 5;
        this.status = "idle";
        this.weaponRange = 100;
        this.weaponDamage = 7;
    }
    display() {
        drawCircle(this.x,this.y,this.weaponRange); // weapon range circle
        drawLabel(this.x,this.y,this.name);
        drawLineDotted(this.x,this.y,this.moveCoordX,this.moveCoordY); // move target line
    }
    executeInput(action,param1,param2,param3) {
        if(action == "move") {
            this.setCoords(param1,param2,true);
        }
        else if(action == "harvest") {
            //
        }
        else if(action == "stop") {
            this.stop();
            addLine("["+this.name+"] stopped at ["+this.x+","+this.y+"]")
            this.setStatus("idle");
        }
        else if(action == "rename") {
            this.name = param1;
        }
        else {
            addLine("ERROR: invalid action");
        }
    }

    setCoords(x,y,isMessage) { // sets target coordinates. This ensures that the drone has a consistent movement target
        if(Math.sqrt((x^2)+(y^2)) <= maxDroneRange && (x > 0 && x < 1200 && y > 0 && y < 800)) {
            this.moveCoordX = parseInt(x, 10);
            this.moveCoordY = parseInt(y, 10);
            if(isMessage == true) { 
                addLine("destination of ["+this.name+"] set to ["+x+","+y+"]");
            }
        }
        else if (x != "") {  // some hacky code that allows param1 to be the drone whose coordinates we want to move to. all other params are ignored
            for (var i = 0; i < drones.length; i++) { 
                if(x == drones[i].name) {
                    this.moveCoordX = parseInt(drones[i].x, 10);
                    this.moveCoordY = parseInt(drones[i].y, 10);
                    if(isMessage == true) {
                        addLine("destination of ["+this.name+"] set to ["+this.moveCoordX+","+this.moveCoordY+"] (" + drones[i].name + ")");
                    }
                    return;
                }
            }
            addLine("ERROR: target coordinates outside current drone control range");
        }
        else if(isMessage == true) {
            addLine("ERROR: target coordinates outside current drone control range");
        }
    }

    actions() {
        this.tryShoot();
        if((this.moveCoordX == this.x && this.moveCoordY == this.y) == false){
            this.move();
        }
    }

    move() { // moves towards current target location
        var displacementX = this.moveCoordX - this.x*1.0;
        var displacementY = this.moveCoordY - this.y*1.0;
        var distanceToTarget = 0;
        if((displacementX == 0 && displacementY == 0) == false) { //is always true because displacementX and displacementY are permanently = 0.0000XXXX something
            //distanceToTarget = Math.hypot(Math.abs(displacementX),Math.abs(displacementY));
            //distanceToTarget = Math.sqrt((displacementX^2) + (displacementY^2));
            distanceToTarget = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY,2));
            if(distanceToTarget <= this.speed) {
                this.x = Math.trunc(this.moveCoordX); 
                this.y = Math.trunc(this.moveCoordY);
                this.setStatus("idle");
            }
            else {
                this.x = this.x + (displacementX/distanceToTarget*this.speed);
                this.y = this.y + (displacementY/distanceToTarget*this.speed);
                this.setStatus("moving to [" + this.moveCoordX + "," + this.moveCoordY + "]  (" + Math.trunc(distanceToTarget) + "m)");
            }
        }
    }

    stop() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.moveCoordX = this.x;
        this.moveCoordY = this.y;
    }

    getStatus() {
        return this.status;
    }

    setStatus(newStatus) {
        this.status = newStatus;
    }

    tryShoot() {
        if(hostiles.length > 0) {
            var indexOfClosest = 0;
            var distOfClosest = 100000;
            for(var i = 0; i < hostiles.length; i++) {
                if(Math.hypot(hostiles[i].x-this.x,hostiles[i].y-this.y) < distOfClosest) {
                    distOfClosest = Math.hypot(hostiles[i].x-this.x,hostiles[i].y-this.y);
                    indexOfClosest = i;
                }
            }
            if(distOfClosest <= this.weaponRange && this.weaponActive == true) {
                this.setStatus("engaging hostiles with [" + this.weaponCooldown + "]");
                if(this.weaponCooldown <= 0) {
                    hostiles[indexOfClosest].health =  hostiles[indexOfClosest].health - this.weaponDamage;
                    this.weaponCooldown = this.weaponCdCap;
                    drawLine(this.x,this.y,hostiles[indexOfClosest].x,hostiles[indexOfClosest].y);
                }
                else {
                    this.weaponCooldown = this.weaponCooldown - 1;
                }
            }
            else {
                this.weaponCooldown = 0;
            }
        }
    }
}