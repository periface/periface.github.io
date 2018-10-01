﻿var camera, scene, renderer, geometry, material, mesh;

// init();
// animate();
smoothScroll();
//startSlider();
startSpy();

//https://codepen.io/teolitto/pen/KwOVvL
function init() {
  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1000;
  scene.add(camera);

  geometry = new THREE.CubeGeometry(200, 200, 200);
  material = new THREE.MeshLambertMaterial({
    color: 0xaa6666,
    wireframe: false
  });
  mesh = new THREE.Mesh(geometry, material);
  //scene.add( mesh );
  cubeSineDriver = 0;
  THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  scene.add(light);

  smokeTexture = THREE.ImageUtils.loadTexture(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png'
  );
  smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: smokeTexture,
    transparent: true
  });
  smokeGeo = new THREE.PlaneGeometry(300, 300);
  smokeParticles = [];

  for (p = 0; p < 150; p++) {
    var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100
    );
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }

  var container = document.getElementById('canvas-container');
  container.appendChild(renderer.domElement);
}

function animate() {
  // note: three.js includes requestAnimationFrame shim
  delta = clock.getDelta();
  requestAnimationFrame(animate);
  evolveSmoke();
  render();
}

function evolveSmoke() {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2;
  }
}

function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  cubeSineDriver += 0.01;
  mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;
  renderer.render(scene, camera);
}
function smoothScroll() {
  var scroll = new SmoothScroll('a[href*="#"]');
}
var activatedElement;
function startSpy() {
  $('#anita').click(() => {
    activatedElement = '#anitaModal';
    startVideo($(activatedElement));
    $('#anitaModal').addClass('show-modal');
  });
  $('#pichon').click(() => {
    activatedElement = '#pichonModal';
    startVideo($(activatedElement));
    $('#pichonModal').addClass('show-modal');
  });

  $('#marco').click(() => {
    activatedElement = '#marcoModal';
    startVideo($(activatedElement));
    $('#marcoModal').addClass('show-modal');
  });
  $('#victor').click(() => {
    activatedElement = '#victorModal';
    startVideo($(activatedElement));
    $('#victorModal').addClass('show-modal');
  });
  $('.btn-close').click(() => {
    $(activatedElement).removeClass('show-modal');
    endVideos();
  });
}
//Inicia el video cuando se carga el modal
function startVideo($elm) {
  setTimeout(() => {
    var elm = $elm.find('video')[0];
    elm.play();
  }, 500);
}
//Reinicia los videos
function endVideos() {
  $('video').each((i, elm) => {
    elm.load();
  });
}
function startSlider() {
  var bgs = ['/images/bg/bg1.jpg', '/images/bg/bg2.jpg', '/images/bg/bg3.jpg'];
  setInterval(() => {
    var image = bgs[Math.floor(Math.random() * bgs.length)];
    var element = $('.hero-container');
    element.css('background-image', 'url(' + image + ')');
  }, 5000);
}

/**
 *
 */
const times = [];
let fps;

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    if (fps <= 40) {
    }
    refreshLoop();
  });
}

refreshLoop();
