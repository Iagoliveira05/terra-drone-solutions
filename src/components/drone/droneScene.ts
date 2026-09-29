import * as THREE from "three";
import { createDrone } from "./createDrone";

export type DroneScene = ReturnType<typeof mountDroneScene>;

export function mountDroneScene(host: HTMLDivElement, onError: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
  camera.position.set(3.1, 2.4, 4.6);
  camera.lookAt(0, .95, 0);
  scene.add(new THREE.HemisphereLight(0xf4f6ff, 0x687b45, 2.5));
  const sun = new THREE.DirectionalLight(0xfff2da, 3.5);
  sun.position.set(3, 7, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: .5, far: 18 });
  sun.shadow.bias = -.0005;
  sun.shadow.normalBias = .02;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xd7e5ff, 1.8);
  fill.position.set(-4, 3, -3);
  scene.add(fill);
  const { drone, arms, discMat } = createDrone();
  drone.position.y = .7;
  scene.add(drone);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(2.1, 80), new THREE.ShadowMaterial({ opacity: .2 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = .01;
  ground.receiveShadow = true;
  scene.add(ground);
  const field = new THREE.Group();
  for (let i = -6; i <= 6; i++) {
    const length = Math.sqrt(Math.max(0, 4 - (i * .28) ** 2)) * 2;
    const row = new THREE.Mesh(new THREE.PlaneGeometry(.025, length), new THREE.MeshBasicMaterial({ color: 0x77a44e, transparent: true, opacity: .12 }));
    row.rotation.x = -Math.PI / 2;
    row.position.set(i * .28, -.01, 0);
    field.add(row);
  }
  field.rotation.y = -.3;
  scene.add(field);
  const count = 1000;
  const positions = new Float32Array(count * 3);
  const lives = new Float32Array(count);
  const velocity = new Float32Array(count * 3);
  positions.fill(-100);
  const sprayGeometry = new THREE.BufferGeometry();
  sprayGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dropCanvas = document.createElement("canvas");
  dropCanvas.width = dropCanvas.height = 32;
  const brush = dropCanvas.getContext("2d");
  if (brush) {
    const gradient = brush.createRadialGradient(16, 16, 2, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(.45, "rgba(255,255,255,.85)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    brush.fillStyle = gradient;
    brush.fillRect(0, 0, 32, 32);
  }
  const dropTexture = new THREE.CanvasTexture(dropCanvas);
  const sprayMaterial = new THREE.PointsMaterial({ color: 0x247e78, size: .045, map: dropTexture, transparent: true, opacity: .85, depthWrite: false });
  const spray = new THREE.Points(sprayGeometry, sprayMaterial);
  spray.frustumCulled = false;
  scene.add(spray);
  const nozzlePositions = arms.map(() => new THREE.Vector3());
  const mistGeometry = new THREE.ConeGeometry(1, 1, 24, 1, true);
  mistGeometry.translate(0, -.5, 0);
  const mistMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: "varying vec2 vUv; void main() { float a = .16 * pow(vUv.y, .65) * (1.0 - smoothstep(.94, 1.0, vUv.y)); gl_FragColor = vec4(.24, .64, .57, a); }",
  });
  const mistFans = arms.map(() => {
    const fan = new THREE.Mesh(mistGeometry, mistMaterial);
    fan.visible = false;
    scene.add(fan);
    return fan;
  });
  let particleCursor = 0;
  let emission = 0;
  function updateSpray(dt: number, active: boolean) {
    drone.updateMatrixWorld(true);
    mistFans.forEach(fan => { fan.visible = active; });
    if (active) {
      arms.forEach((arm, i) => arm.nozzle.getWorldPosition(nozzlePositions[i]));
      mistFans.forEach((fan, i) => {
        const nozzle = nozzlePositions[i];
        const height = Math.max(.05, nozzle.y - .03);
        fan.position.copy(nozzle);
        fan.scale.set(height * .32, height, height * .32);
      });
      emission += dt * 700;
      while (emission >= 1) {
        emission--;
        const i = particleCursor++ % count;
        const k = i * 3;
        const nozzle = nozzlePositions[i % 4];
        positions[k] = nozzle.x;
        positions[k + 1] = nozzle.y;
        positions[k + 2] = nozzle.z;
        velocity[k] = (Math.random() - .5) * .65;
        velocity[k + 1] = -.55 - Math.random() * .35;
        velocity[k + 2] = (Math.random() - .5) * .65;
        lives[i] = 1.4;
      }
    }
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      if (lives[i] <= 0) { positions[k + 1] = -100; continue; }
      lives[i] -= dt;
      velocity[k + 1] -= dt * .7;
      for (let axis = 0; axis < 3; axis++) positions[k + axis] += velocity[k + axis] * dt;
      if (positions[k + 1] < .025) lives[i] = 0;
    }
    sprayGeometry.attributes.position.needsUpdate = true;
  }
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = host.closest<HTMLElement>("#topo");
  const intro = host.closest<HTMLElement>(".hero-flight-intro");
  let visible = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  let progress = 0;
  let targetProgress = 0;
  let pointerX = 0;
  let pointerTarget = 0;
  let spin = 0;
  function updateScroll() {
    if (hero) {
      const distance = Math.max(300, (intro?.offsetHeight ?? window.innerHeight) - window.innerHeight * .25);
      targetProgress = THREE.MathUtils.clamp(-hero.getBoundingClientRect().top / distance, 0, 1);
    }
    wake();
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = last ? Math.min((now - last) / 1000, .05) : 0;
    last = now;
    const reduced = preference.matches;
    if (!reduced) time += dt;
    progress = reduced ? 0 : THREE.MathUtils.damp(progress, targetProgress, 5, dt);
    pointerX = reduced ? 0 : THREE.MathUtils.damp(pointerX, pointerTarget, 3, dt);
    const lift = THREE.MathUtils.smoothstep(progress, 0, .65);
    const altitude = lift;
    spin = THREE.MathUtils.damp(spin, reduced ? 0 : altitude > .01 ? 1 : .04, 4, dt);
    drone.position.set(progress * .24, .7 + altitude * .95 + (reduced ? 0 : Math.sin(time * 1.8) * .018 * altitude), -progress * .18);
    drone.rotation.set(-progress * .13, -.28 + progress * .9 + pointerX * .12 + (reduced ? 0 : Math.sin(time * .18) * .14), -progress * .1);
    arms.forEach(arm => { arm.spinner.rotation.y += arm.dir * spin * 36 * dt; });
    discMat.opacity = spin * .13;
    ground.material.opacity = .22 - altitude * .10;
    spray.visible = !reduced;
    const spraying = !reduced && altitude > .08;
    updateSpray(dt, spraying);
    host.dataset.spraying = String(spraying);
    host.dataset.flight = reduced ? "static" : progress > .08 ? "flying" : "idle";
    renderer.render(scene, camera);
    if (!reduced) frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame && !disposed && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); }
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Leave space for the extended arms at every flight angle, including phones.
    camera.zoom = Math.min(1.18, camera.aspect * .95);
    camera.updateProjectionMatrix();
    updateScroll();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { updateScroll(); wake(); } else stop();
  }, { threshold: .05 });
  observer.observe(host);
  const onVisibility = () => { if (document.hidden) stop(); else { updateScroll(); wake(); } };
  const onPreference = () => { wake(); };
  const onContextLost = (event: Event) => { event.preventDefault(); stop(); onError(); };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && visible) pointerTarget = event.clientX / window.innerWidth * 2 - 1;
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  preference.addEventListener("change", onPreference);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  resize();
  return {
    dispose() {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointer);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      dropTexture.dispose();
      sun.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
