
// CLASSES

class resourceDeposit {
    constructor(x,y, amount) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.depleted = false;
        if(this.amount<0) {
            this.depleted = true;
        }
    }
    display() {
        drawLabel(this.x,this.y,"RS["+this.amount+"]");
    }
    takeResource() {
        this.amount = this.amount - 1;
        if(this.amount < 1) {
            //make resource invalid
        }
    }
}




class hostile {
    constructor(iX,iY) {
        this.speed = 0.3;
        this.x = iX * 1.0; // float value, but is rounded for display/ game purposes
        this.y = iY * 1.0;
        this.health = 100;
        this.attackRange = 10;
    }
    display() { 
        drawHeatSignature(this.x,this.y,3);
    }

    actions() {
        var indexOfMinDist = 0;
        for(var i = 0; i < drones.length; i++) { // detect the nearest drone >:D
            var droneDist = Math.hypot(drones[i].x-this.x,drones[i].y-this.y);
            var minDist = Math.hypot(drones[indexOfMinDist].x-this.x,drones[indexOfMinDist].y-this.y);
            if(droneDist < minDist) {
                indexOfMinDist = i;
            }
        }
        if(Math.hypot(drones[indexOfMinDist].x-this.x,drones[indexOfMinDist].y-this.y) < this.attackRange) {
            if(Math.random() < 0.01666) {
                drones[indexOfMinDist].health = drones[indexOfMinDist].health - 1;
            }
        }
        else {
            this.move(drones[indexOfMinDist].x,drones[indexOfMinDist].y);
        }
    }

    move(targetX,targetY) { // moves towards current target location
        var displacementX = targetX - this.x*1.0;
        var displacementY = targetY - this.y*1.0;
        var distanceToTarget = 0;
        if((displacementX == 0 && displacementY == 0) == false) {
            distanceToTarget = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY,2));
            if(distanceToTarget <= this.speed) {
                this.x = targetX;
                this.y = targetY;
            }
            else {
                this.x = this.x + (displacementX/distanceToTarget*this.speed);
                this.y = this.y + (displacementY/distanceToTarget*this.speed);
            }
        }
    }
}