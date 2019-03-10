var bgColor = '#000000';
var lineColor = `rgb(255, 0, 0)`;
var lineWidth = 10;
var viewWindow = {
    width: window.innerWidth * .618,
    height: window.innerWidth * .618 * .618
}
var xNum = 30,
    yNum = 20,
    xScl = Math.floor(viewWindow.width / xNum),
    yScl = Math.floor(viewWindow.height / yNum);
var cellScl = .4;

function init() {
    createCanvas(window.innerWidth, window.innerHeight);
    gridRender();
}

function gridRender() {

}

var cubes = [];
var number = 3;
var direction = ['r', 'd', 'l', 'u'];
direction.turnRight = function (index) {
    return index < direction.length - 1 ? ++index : 0;
}
direction.turnLeft = function (index) {
    return index > 0 ? --index : direction.length - 1;
}
var totalTime = 15;
perfectCube(0,
    0,
    window.innerWidth * .5,
    window.innerWidth * .5 * .618,
    0,
    totalTime);

function perfectCube(sx, sy, w, l, d, times) {
    if (times > 10){
        lineColor = '#000055';
    } else {
        lineColor = '#cc0000';
    }
    if (times == 0) {

    } else {
        let cx;
        let cy;
        let nx, ny;
        let len = Math.min(w, l);

        switch (d) {
            case 0:
                cx = sx + len / 2;
                cy = sy + len / 2;
                nx = sx + w;
                ny = sy;
                break;
            case 1:
                cx = sx - len / 2;
                cy = sy + len / 2;
                nx = sx;
                ny = sy + w;
                break;
            case 2:
                cx = sx - len / 2;
                cy = sy - len / 2;
                nx = sx - w;
                ny = sy;
                break;
            case 3:
                cx = sx + len / 2;
                cy = sy - len / 2;
                nx = sx;
                ny = sy - w;

        }

        cubes.push(new Cube(1, cx, cy, len * .9, lineColor));
        perfectCube(nx, ny, len, Math.max(w, l) - len, direction.turnRight(d), --times);
    }
}

document.addEventListener('keypress', function (e) {
    if (e.key == 'w') {
        cubes.forEach((e) => e.level++);
    } else {
        if (e.key == 's') {
            cubes.forEach((e) => e.level--);
        }
    }
    cubes.forEach((e) => e.initNodeMap());
})

function setup() {
    init();
}

function draw() {
    background(bgColor)
    let scl = .0004;
    translate(window.innerWidth / 2 - window.innerWidth * .5 /2, window.innerHeight / 2 - window.innerWidth * .5 * .618 / 2);
    cubes.forEach((e) => e.rotateYa(abs(mouseX - cubes[cubes.length - 1].x - (window.innerWidth / 2 - window.innerWidth * .5 /2)) * scl));
    cubes.forEach((e) => e.rotateXa(abs(mouseY - cubes[cubes.length - 1].y - (window.innerHeight / 2 - window.innerWidth * .5 * .618 / 2)) * scl));
    cubes.forEach((e) => e.lineRender());
    
}

function windowResized() {
    init();
}

