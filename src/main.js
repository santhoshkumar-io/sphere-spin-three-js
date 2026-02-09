import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
//Scene
const scene = new THREE.Scene();

//sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({  color: "#00ff83", roughness: 0.5 });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//sizes
const sizes ={
  height: window.innerHeight,
  width: window.innerWidth,
} 
//light
const light = new THREE.PointLight(0xffffff,8, 100,0.2);
light.position.set(10, 10, 10);
scene.add(light);


//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/ sizes.height,0.1,1000);

camera.position.z =20;
scene.add(camera);

//renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio( 3);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan=  false;
controls.enableZoom= false;
controls.autoRotate= true;
controls.autoRotateSpeed= 5;
//resize

window.addEventListener('resize', () => {
  //update resize
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

//timeline
const tl = gsap.timeline({defaults:{duration: 1}});
tl.fromTo(mesh.scale, {x: 0, y: 0, z: 0},{x: 1, y: 1, z: 1});
tl.fromTo("nav",{y: "-100%", opacity: 0},{y: 0, opacity: 1});
tl.fromTo(".title",{ opacity: 0},{ opacity: 1});

//Mouse animation color

let mouseDown = false;
let rgb=[]
addEventListener("mousedown", () => { mouseDown = true; });
addEventListener("mouseup", () => { mouseDown = false; });

addEventListener("mousemove", (e) => {
  if (mouseDown){
    rgb = [
    Math.round(e.pageX / sizes.width * 255),
    Math.round(e.pageY / sizes.height * 255),
    155,
    ]
    //Animate the color
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(material.color, {
      r:newColor.r,
      b:newColor.b,
      g:newColor.g,
      
    })
  }
});