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
        a = a.concat(e.link.map((e1) => [e1, e]));
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
    threeLines = [];
    indexNodeMap = [];
    level = 0;
    threePoints = [];
    material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 10
    });
    constructor(level, x, y, size = 100) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.level = level;
        this.initPoints();
        this.initThreePoints();
        this.initNodeMap();
        this.initLine();
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
                        x: pt.x * this.size,
                        y: pt.y * this.size,
                        z: pt.z * this.size
                    });
                }
            }
        }
        this.move(this.x, this.y);
    }
    initThreePoints() {
        this.threePoints = this.points.map((e) => new THREE.Vector3(e.x, e.y, e.z));
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
    initLine() {
        this.threeLines = [];
        var allLink = searchAllLinkOFNodes(this.indexNodeMap);
        this.threeLines = allLink.map((e) => {
            let tline = new THREE.Geometry();
            tline.vertices.push(this.threePoints[e[0].value]);
            tline.vertices.push(this.threePoints[e[1].value]);
            tline.verticesNeedUpdate = true;
            let tf = new THREE.Line(tline, this.material);
            scene.add(tf);
            return tline;
        });
    }
    renderLine() {
        this.threeLines.forEach((e) => e.verticesNeedUpdate = true);
    }
    updateThreePoints() {
        this.points.forEach((e, i) => {
            this.threePoints[i].x = e.x;
            this.threePoints[i].y = e.y;
            this.threePoints[i].z = e.z;
        })
    }

    move(x, y) {
        this.points.forEach((e) => {
            e.x += x;
            e.y += y;
        })
    }
    rotateZa(angle) {
        this.move(-this.x, -this.y);
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
        this.move(this.x, this.y);
        this.updateThreePoints();
    }
    rotateYa(angle) {
        this.move(-this.x, -this.y);
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
        this.move(this.x, this.y);
        this.updateThreePoints();
    }
    rotateXa(angle) {
        this.move(-this.x, -this.y);
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
        this.move(this.x, this.y);
        this.updateThreePoints();
    }
}