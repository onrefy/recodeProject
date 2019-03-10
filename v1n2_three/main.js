var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.addEventListener('keypress', function (e) {
    testCube.level++;
});
var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0, );

var scene = new THREE.Scene();

var cubes = [];
var viewWindow = {
    x : 90,
    y : 90 * .618
}
var size = 3;
var x = Math.floor(viewWindow.x / size);
var y = Math.floor(viewWindow.y / size);
for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
        cubes.push(new Cube(4, i * size - viewWindow.x / 2, j * size - viewWindow.y / 2, size * .4));
    }
}

var animate = function () {
    requestAnimationFrame(animate);
    cubes.forEach((e) => {
        e.rotateXa(.05);
        e.rotateYa(.05);
        e.renderLine();
    })
    renderer.render(scene, camera);
}
animate();