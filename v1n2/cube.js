class Node {
    link = [];
    value = null;
    visited = false;
    constructor(value = null) {
        this.value = value;
    }
    linkNode(node) {
        this.link.push(node);
        node.link.push(this);
    }
    unlinkNode(node) {
        let index = this.link.indexOf(node);
        this.link.splice(index, 1);
        index = node.link.indexOf(this);
        node.link.splice(index, 1);
    }
}

function searchAllLinkOFNodes(tnodes) {
    var a = [];
    tnodes.forEach((e) => {
        a = a.concat(e.link.map((e1) => [e1,e]));
    });
    a = [...new Set(a)];
    return a;
}
class Line {
    constructor(s, e) {
        this.s = s;
        this.e = e;
    }
}
class Cube {
    points = [];
    lines = [];
    indexNodeMap = [];
    level = 0;
    constructor(level, x, y, size = 100, lineColor = '#0000ff') {
        this.initPoints();
        
        this.level = level;
        this.initNodeMap();
        this.x = x;
        this.y = y;
        this.size = size;
        this.lineColor = lineColor;
    }
    initPoints() {
        let pt = {
            x: 0,
            y: 0,
            z: 0
        };
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    pt.x = .5 * ((i % 2) - .5) * 2;
                    pt.y = .5 * ((j % 2) - .5) * 2;
                    pt.z = .5 * ((k % 2) - .5) * 2;
                    this.points.push({
                        x: pt.x,
                        y: pt.y,
                        z: pt.z
                    });
                }
            }
        }
    }
    initNodeMap() {
        this.indexNodeMap = [];
        for (let i = 0; i < this.points.length; i++) {
            this.indexNodeMap.push(new Node(i));
        }
        for (let k = 0; k < this.level; k++) {
            let s = randomInt(this.points.length);
            let e = randomInt(this.points.length);
            let i = 0;
            while (e == s || this.indexNodeMap[s].link.includes(this.indexNodeMap[e]) && i < 15) {
                e = randomInt(this.points.length);
                i++;
            }
            this.indexNodeMap[s].linkNode(this.indexNodeMap[e]);
        }

        function randomInt(n) {
            return Math.floor(Math.random() * n);
        }
    }
    rotateZa(angle) {
        var rotateMatrix = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ];
        var newPoints = [];
        for (let i = 0; i < this.points.length; i++) {
            let tPtBuffer = [
                [this.points[i].x],
                [this.points[i].y],
                [this.points[i].z]
            ];
            tPtBuffer = math.multiply(rotateMatrix, tPtBuffer);
            newPoints.push({
                x: tPtBuffer[0][0],
                y: tPtBuffer[1][0],
                z: tPtBuffer[2][0]
            });
        }
        this.points = newPoints;
    }
    rotateYa(angle) {
        var rotateMatrix = [
            [Math.cos(angle), 0, Math.sin(angle)],
            [0, 1, 0],
            [-Math.sin(angle), 0, Math.cos(angle)]
        ];
        var newPoints = [];
        for (let i = 0; i < this.points.length; i++) {
            let tPtBuffer = [
                [this.points[i].x],
                [this.points[i].y],
                [this.points[i].z]
            ];
            tPtBuffer = math.multiply(rotateMatrix, tPtBuffer);
            newPoints.push({
                x: tPtBuffer[0][0],
                y: tPtBuffer[1][0],
                z: tPtBuffer[2][0]
            });
        }
        this.points = newPoints;
    }
    rotateXa(angle) {
        var rotateMatrix = [
            [1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]
        ];
        var newPoints = [];
        for (let i = 0; i < this.points.length; i++) {
            let tPtBuffer = [
                [this.points[i].x],
                [this.points[i].y],
                [this.points[i].z]
            ];
            tPtBuffer = math.multiply(rotateMatrix, tPtBuffer);
            newPoints.push({
                x: tPtBuffer[0][0],
                y: tPtBuffer[1][0],
                z: tPtBuffer[2][0]
            });
        }
        this.points = newPoints;
    }



    lineRender() {
        this.lines = [];
        var allLink = searchAllLinkOFNodes(this.indexNodeMap);
        this.lines = allLink.map((e) => new Line(this.points[e[0].value], this.points[e[1].value]));
        push();
        translate(this.x, this.y);
        this.lines.forEach((e, i, a) => {
            stroke(this.lineColor);
            strokeWeight(lineWidth);
            strokeCap(ROUND);
            line(e.s.x * this.size, e.s.y * this.size, e.e.x * this.size, e.e.y * this.size);
        });
        pop();
    }

    ptRender() {
        this.points.forEach((e) => {
            stroke('#ffffff');
            point(e.x * 100, e.y * 100);
        });
    }
}

function structuralClone(obj) {
    return new Promise(resolve => {
        const {
            port1,
            port2
        } = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    });
}