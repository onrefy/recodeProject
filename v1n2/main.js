var bgColor = '#000000';
var lineColor = '#000000';
var lineWidth = 3;

function init() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    gridRender();
}
function gridRender(){

}

var testCube = new Cube();

function setup() {
    init();
}

function draw() {
    background(bgColor)
    testCube.render();
}

function windowResized(){
    init();
}