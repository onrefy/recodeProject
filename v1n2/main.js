var bgColor = '#000000';
var lineColor = '#000000';
var lineWidth = 3;
function init() {
    createCanvas(window.innerWidth, window.innerHeight);
    gridRender();
}
function gridRender(){

}

var testCube = new Cube();
const c = [[1, 2], [4, 3]];
const d = [[1, 2, 3], [3, -4, 7]];

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