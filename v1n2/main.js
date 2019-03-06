var bgColor = '#000000';
var lineColor = '#000000';
var lineWidth = 3;
function init() {
    createCanvas(window.innerWidth, window.innerHeight);
    gridRender();
}
function gridRender(){

}


console.log(math.multiply(c, d));   
function setup() {
    init();
}

function draw() {
    background(bgColor)
    translate(width/2, height/2);
    testCube.ptRender();
}

function windowResized(){
    init();
}