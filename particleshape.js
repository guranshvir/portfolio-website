import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

export function particleshape(element) {
  if (!element) {
    console.error('Element not found');
    return;
  }

  const width = element.clientWidth ;
  const height = element.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(36,36,36)');

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, -5.7, 15);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    const newWidth = element.clientWidth;
    const newHeight = element.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  const light = new THREE.DirectionalLight('white', 3);
  light.position.copy(camera.position);
  scene.add(light);

  const N = 1000; // number of particles
  const particles = []; // array of particles

  const geometry = new THREE.OctahedronGeometry(0.04);
  const material = new THREE.MeshPhongMaterial({ shininess: 100 } );
  material.wireframe = true;

  // Initializing particles with spherical coordinates
  for (let i = 0; i < N; i++) {
    const particle = new THREE.Mesh(geometry, material);
    particle.rnd1 = Math.random();
    particle.rnd2 = Math.random();
    particles.push(particle);
  }

  scene.add(...particles);

  const Back_N = 2000
  const Back_Particles = []; // array of particles

  const geometry_back = new THREE.SphereGeometry(0.013);
  const material_back = new THREE.MeshPhongMaterial({ shininess: 60 } );
  material.wireframe = true;

  // Initializing particles with spherical coordinate
  for (let i = 0; i < Back_N; i++) {
    const particle_back = new THREE.Mesh(geometry_back, material_back);
    particle_back.rnd1b = Math.random();
    particle_back.rnd2b = Math.random();
    Back_Particles.push(particle_back);
  }
  scene.add(...Back_Particles)

  const v = new THREE.Vector3();
  let u = new THREE.Vector3();
  const torusVector = new THREE.Vector3();

  const b = new THREE.Vector3();
  const color1 = new THREE.Color('crimson');
  const color2 = new THREE.Color('royalblue');
  const color3 = new THREE.Color('gold');

  let scrollProgress = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = scrollTop / docHeight;
  });




  function updateParticlePositions(t, elapsed) {

    Back_Particles.forEach((particle, i) => {
      // Store the initial position (if not already stored)
      if (!particle.initialPosition) {
        const minDepth = 10; // Minimum depth
        const maxDepth = 40;  // Maximum depth
    
        particle.initialPosition = {
          x: (Math.random() - 0.5) * 40,   // Scale random position across the canvas width
          y: (Math.random() - 0.5) * 80,   // Scale random position across the canvas height
          z: Math.random() * (maxDepth - minDepth) - 40 // Random position within the depth range
        };
        
        // Assign a random color to the particle's material
      }
    
      // Set the particle's position based on its initial position
      particle.position.set(
        particle.initialPosition.x,
        particle.initialPosition.y,
        particle.initialPosition.z
      );
    });
    
    
    

    particles.forEach((particle, i) => {
      particle.rotation.x = elapsed + i;
      particle.rotation.y = 4 * elapsed - i;


      v.setFromSphericalCoords(4, 0.2 * t + 6.3 * particle.rnd1, t + 6.3 * particle.rnd2);

      const s = 1.25 / Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
      const x = v.x * Math.cos(t / 4) + v.y * Math.sin(t / 4);
      const y = -v.x * Math.sin(t / 4) + v.y * Math.cos(t / 4);
      const z = -v.z * Math.sin(t / 4) - v.z   * Math.cos(t / 4);

      
      if (i < N / 2) {
        u = new THREE.Vector3(s * x - 3, s * y - 6.1, s * z + 1); // First square
      } else {
        u = new THREE.Vector3(s * x + 2.5, s * y - 6.1, s * z + 1); // Second square
      }

      const R = 1.8; // Major radius of the torus
      const r = 0.7; // Minor radius of the torus
      const angle = Math.PI * 2 * particle.rnd1;
      const tubeAngle = Math.PI * 2 * particle.rnd2;
      torusVector.set(
        (R + r * Math.cos(tubeAngle)) * Math.cos(angle),
        (R + r * Math.cos(tubeAngle)) * Math.sin(angle) - 11.6,
        r * Math.sin(tubeAngle)
      );

      const k1 = THREE.MathUtils.clamp(scrollProgress, 0, 1);

      if (k1 < 0.5) {
        particle.position.lerpVectors(v, u, k1 * 2);
        particle.material.color.lerpColors(color1, color2, k1 * 2);
      } else {
        particle.position.lerpVectors(u, torusVector, (k1 - 0.5) * 2);
        particle.material.color.lerpColors(color2, color3, (k1 - 0.5) * 2);
      }
    });
  }

  function animationLoop() {
    const t = scrollProgress * 10;
    const elapsed = performance.now() / 1000;

    updateParticlePositions(t, elapsed);

    renderer.render(scene, camera);
    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);
}
