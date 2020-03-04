
// DRAWING UTILITY COMMANDS


function drawLabel(x,y,text) {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    //ctx.scale(2,2); //needed as part of increasing resolution of canvas
    var radius = 5;
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.save();
    // ctx.strokeRect(x-radius,y-radius,radius*2,radius*2);
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y-radius);
    ctx.moveTo(x+radius,y);
    ctx.lineTo(x-radius,y);
    ctx.closePath();
    ctx.stroke();
    ctx.font="20px monaco";
    ctx.lineWidth = 0.75;
    ctx.strokeText(text,x+radius+2,y-(radius+3));
    ctx.fillText(text,x+radius+2,y-(radius+3));
    ctx.restore();
}

 function drawCircle(x,y,radius) {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    //ctx.scale(2,2); //needed as part of increasing resolution of canvas
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 2;
    ctx.save();
    ctx.setLineDash([5,5]);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
 }

function drawLine(sx,sy,ex,ey) {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(ex,ey);
    ctx.closePath();
    ctx.stroke();
}

function drawLineDotted(sx,sy,ex,ey) {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 2;
    ctx.save();
    ctx.setLineDash([7,9]);
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(ex,ey);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawHeatSignature(x,y,intensity) { //intensity ranges from 0 to 3
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    var radius = 2;
    ctx.strokeStyle = "#333333";
    if(intensity == 1) {
        ctx.strokeStyle = "#777777";
    }
    else if(intensity == 2) {
        ctx.strokeStyle = "#BBBBBB";
    }
    else if(intensity == 3) {
        ctx.strokeStyle = "#FFFFFF";
    }
    ctx.lineWidth = 2;
    ctx.strokeRect(x-radius,y-radius,radius*2,radius*2);
}