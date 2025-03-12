import './style.css';
// import Module from '/physics/output.js';
import * as THREE from 'three';
console.log('Module object:', Module);

let addFunction, updatePosition

// Wait for the WebAssembly module to initialize
Module().then((instance) => {
  console.log('Emscripten module initialized');

  // Wrap C++ functions using cwrap
  const Vector3_create = instance.cwrap('Vector3_create', 'number', ['number', 'number', 'number']);
  const Vector3_delete = instance.cwrap('Vector3_delete', null, ['number']);
  const Vector3_magnitude = instance.cwrap('Vector3_magnitude', 'number', ['number']);
  const Vector3_normalize = instance.cwrap('Vector3_normalize', null, ['number']);
  const Vector3_add = instance.cwrap('Vector3_add', null, ['number', 'number']);
  const Vector3_dotProduct = instance.cwrap('Vector3_dotProduct', 'number', ['number', 'number']);
  const Vector3_crossProduct = instance.cwrap('Vector3_crossProduct', 'number', ['number', 'number']);

  // Test Vector3 functions
  const vec1 = Vector3_create(1.0, 2.0, 3.0);
  const vec2 = Vector3_create(4.0, 5.0, 6.0);

  console.log('Magnitude of vec1:', Vector3_magnitude(vec1)); // Should log the magnitude
  Vector3_normalize(vec1);
  console.log('Normalized magnitude of vec1:', Vector3_magnitude(vec1)); // Should log 1.0

  Vector3_add(vec1, vec2);
  console.log('Dot product of vec1 and vec2:', Vector3_dotProduct(vec1, vec2)); // Should log the dot product

  const crossProduct = Vector3_crossProduct(vec1, vec2);
  console.log('Cross product of vec1 and vec2:', crossProduct); // Should log the cross product

  // Clean up
  Vector3_delete(vec1);
  Vector3_delete(vec2);
  Vector3_delete(crossProduct);

  animate();
}).catch((error) => {
  console.error('Failed to initialize Emscripten module:', error);
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