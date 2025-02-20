import './style.css';
// import Module from '/physics/output.js';
import * as THREE from 'three';
console.log('Module object:', Module);

let addFunction, updatePosition

// Wait for the WebAssembly module to initialize
Module().then((instance) => {
  console.log('Emscripten module initialized');
  addFunction = instance.cwrap('add', 'number', ['number', 'number']);
  updatePosition = instance.cwrap('updatePosition', 'number', ['number']);
  let testFunction = instance.cwrap('testConstant', 'number', []);
  const multiplyFunction = instance.cwrap('multiply', 'number', ['number', 'number']);
  console.log(addFunction(2, 3)); // Should log 5
  console.log(multiplyFunction(5,5));
  console.log(testFunction());

  animate();
});

// Settings
const settings = {
  colors: {
    blue: "#3182bd",
    red: "#FF0000"
  }
};

// Set up scene
const scene = new THREE.Scene();

// Get aspect ratio
const aspect = window.innerWidth / window.innerHeight;

// Set up an orthographic camera
const camera = new THREE.OrthographicCamera(
  -aspect, aspect, 1, -1, 0.1, 10
);
camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);

// Create renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a simple dot
const dotGeometry = new THREE.CircleGeometry(0.02, 32); // Small dot
const dotMaterialBlue = new THREE.MeshBasicMaterial({ color: new THREE.Color(settings.colors.blue) });
const dotMaterialRed = new THREE.MeshBasicMaterial({ color: new THREE.Color(settings.colors.red) });
const blueDot = new THREE.Mesh(dotGeometry, dotMaterialBlue);
const redDot = new THREE.Mesh(dotGeometry, dotMaterialRed);
blueDot.position.set(1, 0, 0)
redDot.position.set(-1, 0, 0)
scene.add(blueDot, redDot);


function updateXPositionToCenter(dot) {
  let currentXposition = dot.position.x;
  let newXPosition;
  // console.log(dot)
  if (Math.sign(currentXposition) == 1) {
    newXPosition = currentXposition - 0.01;
  } else {
    console.log("here")
    newXPosition = currentXposition + 0.01;
  }
  dot.position.set(newXPosition, 0, 0)
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  
  updateXPositionToCenter(blueDot)
  updateXPositionToCenter(redDot)

  // console.log(`Dot position: ${currentYposition}`);
  // console.log(`hwhw; ${Math.sign(-3)}`);



  // let currentYposition = dot.position.y;
  // const newYPosition = updatePosition(currentYposition);
  // dot.position.set(0, newYPosition, 0);

}


// animate(); // Start animation loop