class Cube {
    points = [];
    lines = [];
    constructor() {
        this.initPoints();
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
                    this.points.push({x:pt.x, y:pt.y, z:pt.z});
                }
            }
        }
    }
    lineRender() {
        this.lines.forEach((e, i, a) => {
            stroke(lineColor);
            strokeWeight(lineWidth);
            line(e.s.x, e.s.y, e.s.z, e.e.x, e.e.y, e.e.z);
        })
    }
    
    ptRender(){
        this.points.forEach((e) => {
            e.z = 0;
            stroke('#ffffff');
            point(e.x * 100, e.y * 100);
        });
    }
}