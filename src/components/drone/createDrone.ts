import * as THREE from "three";

/** Geometry adapted from the user-supplied agricultural drone HTML. */
export function createDrone() {
  function mat(color: number, rough: number, metal = 0, extra: THREE.MeshStandardMaterialParameters = {}) {
    const o = { color, roughness: rough, metalness: metal, ...extra };
    return new THREE.MeshStandardMaterial(o);
  }
  const M = {
    shell: mat(0xdadcd7, 0.42, 0.05),
    shellHi: mat(0xeef0eb, 0.35, 0.05),
    grey: mat(0x8f9692, 0.5, 0.15),
    black: mat(0x1c1f21, 0.55, 0.2),
    graphite: mat(0x33383b, 0.5, 0.3),
    prop: mat(0xc8cbc6, 0.4, 0.05, { side: THREE.DoubleSide }),
    orange: mat(0xff6a1a, 0.45, 0, { emissive: 0x5a1d00 }),
    lens: mat(0x0b1620, 0.15, 0.6),
    tank: mat(0xe9ece6, 0.5, 0),
    window: mat(0x7fb0c4, 0.2, 0, { emissive: 0x16303a }),
    rubber: mat(0x101112, 0.9, 0)
  };

  /* ---------- Helpers de geometria ---------- */
  function rbox(w: number, h: number, d: number, r: number, material: THREE.Material) {
    const b = Math.min(0.02, h * 0.28, r * 0.6);
    const iw = w - 2 * b, id = d - 2 * b, ir = Math.max(r - b, 0.005);
    const x = -iw / 2, y = -id / 2, s = new THREE.Shape();
    s.moveTo(x + ir, y);
    s.lineTo(x + iw - ir, y); s.quadraticCurveTo(x + iw, y, x + iw, y + ir);
    s.lineTo(x + iw, y + id - ir); s.quadraticCurveTo(x + iw, y + id, x + iw - ir, y + id);
    s.lineTo(x + ir, y + id); s.quadraticCurveTo(x, y + id, x, y + id - ir);
    s.lineTo(x, y + ir); s.quadraticCurveTo(x, y, x + ir, y);
    const depth = h - 2 * b;
    const g = new THREE.ExtrudeGeometry(s, { depth: depth, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelOffset: 0, bevelSegments: 3, curveSegments: 6 });
    g.rotateX(-Math.PI / 2);
    g.translate(0, -depth / 2, 0);
    return new THREE.Mesh(g, material);
  }
  function limb(a: THREE.Vector3, b: THREE.Vector3, r: number, material: THREE.Material) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 14), material);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return m;
  }
  function put<T extends THREE.Object3D>(obj: T, x: number, y: number, z: number, parent: THREE.Object3D = drone) {
    obj.position.set(x, y, z);
    (parent || drone).add(obj);
    return obj;
  }
  function anchor(x: number, y: number, z: number, parent: THREE.Object3D = drone) { return put(new THREE.Object3D(), x, y, z, parent); }
  function bladeGeo() {
    const s = new THREE.Shape();
    s.moveTo(0.03, -0.028);
    s.bezierCurveTo(0.18, -0.06, 0.40, -0.055, 0.56, -0.03);
    s.quadraticCurveTo(0.585, 0, 0.56, 0.03);
    s.bezierCurveTo(0.40, 0.045, 0.20, 0.04, 0.03, 0.025);
    s.lineTo(0.03, -0.028);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.008, bevelEnabled: false, curveSegments: 14 });
    g.rotateX(Math.PI / 2);
    g.translate(0, 0.004, 0);
    return g;
  }
  const BLADE = bladeGeo();
  function makeProp() {
    const spin = new THREE.Group();
    const a = new THREE.Mesh(BLADE, M.prop);
    a.rotation.x = 0.22;
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.055), M.orange);
    tip.position.set(0.535, 0, 0);
    a.add(tip);
    spin.add(a);
    const wrapB = new THREE.Group();
    wrapB.rotation.y = Math.PI;
    const b = new THREE.Mesh(BLADE, M.prop);
    b.rotation.x = 0.22;
    wrapB.add(b);
    spin.add(wrapB);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.035, 20), M.black), 0, 0, 0, spin);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 16), M.graphite), 0, 0.03, 0, spin);
    return spin;
  }

  /* ---------- Montagem do drone ---------- */
  const drone = new THREE.Group();


  // corpo
  put(rbox(0.62, 0.2, 0.95, 0.14, M.shell), 0, 0, 0);
  put(rbox(0.64, 0.05, 0.97, 0.15, M.black), 0, -0.045, 0);
  put(rbox(0.5, 0.07, 0.8, 0.12, M.shellHi), 0, 0.115, 0);
  put(rbox(0.5, 0.16, 0.7, 0.06, M.black), 0, -0.18, 0);
  // tanque
  put(rbox(0.56, 0.26, 0.78, 0.1, M.tank), 0, -0.4, 0);
  [1, -1].forEach(function (s) {
    put(new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.14, 0.42), M.window), s * 0.283, -0.4, 0);
  });
  // sensores frontal e traseiro
  [1, -1].forEach(function (s) {
    put(rbox(0.36, 0.09, 0.07, 0.03, M.black), 0, 0.03, s * 0.49);
    [-0.09, 0.09].forEach(function (x) {
      const l = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.012, 20), M.lens);
      l.rotation.x = Math.PI / 2;
      put(l, x, 0.03, s * 0.527);
    });
  });
  // GPS e antenas
  put(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.035, 24), M.black), 0, 0.17, -0.12);
  [1, -1].forEach(function (s) {
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.013, 0.3, 10), M.grey);
    ant.rotation.z = -s * 0.14;
    put(ant, s * 0.2, 0.34, -0.38);
    put(new THREE.Mesh(new THREE.SphereGeometry(0.014, 10, 8), M.grey), s * 0.2 - s * 0.042, 0.49, -0.38);
  });

  // trem de pouso
  [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (p) {
    const top = new THREE.Vector3(p[0] * 0.29, -0.3, p[1] * 0.3);
    const bot = new THREE.Vector3(p[0] * 0.5, -0.66, p[1] * 0.52);
    drone.add(limb(top, bot, 0.022, M.black));
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 10), M.rubber);
    foot.position.copy(bot);
    drone.add(foot);
  });
  [1, -1].forEach(function (sx) {
    drone.add(limb(new THREE.Vector3(sx * 0.5, -0.66, 0.52), new THREE.Vector3(sx * 0.5, -0.66, -0.52), 0.02, M.graphite));
  });

  // braços, motores, hélices e bicos
  const discMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
  const arms: { spinner: THREE.Group; dir: number; nozzle: THREE.Object3D }[] = [];
  [45, 135, 225, 315].forEach(function (deg, i) {
    const a = deg * Math.PI / 180;
    const arm = new THREE.Group();
    arm.position.set(0, 0.03, 0);
    arm.rotation.y = Math.atan2(-Math.cos(a), Math.sin(a));
    drone.add(arm);

    put(rbox(0.2, 0.13, 0.14, 0.04, M.grey), 0.44, 0, 0, arm);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 1.0, 16), M.black);
    tube.rotation.z = Math.PI / 2;
    put(tube, 0.88, 0, 0, arm);
    put(rbox(0.2, 0.1, 0.1, 0.03, M.grey), 0.62, 0, 0, arm);
    put(new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.07), M.orange), 0.79, 0, 0, arm);
    put(rbox(0.14, 0.06, 0.14, 0.03, M.graphite), 1.37, 0, 0, arm);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.09, 24), M.black), 1.37, 0.075, 0, arm);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.04, 24), M.graphite), 1.37, 0.14, 0, arm);

    const spinner = makeProp();
    put(spinner, 1.37, 0.185, 0, arm);
    const dg = new THREE.CircleGeometry(0.6, 48);
    dg.rotateX(-Math.PI / 2);
    const disc = new THREE.Mesh(dg, discMat);
    disc.userData.noShadow = true;
    put(disc, 1.37, 0.19, 0, arm);

    // bico de pulverização
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.29, 12), M.black), 1.37, -0.175, 0, arm);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.03, 0.045, 18), M.graphite), 1.37, -0.32, 0, arm);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.01, 20), M.black), 1.37, -0.348, 0, arm);
    const nozzle = anchor(1.37, -0.355, 0, arm);


    arms.push({ spinner, dir: i % 2 ? 1 : -1, nozzle });
  });

  drone.traverse(function (o) { if (o instanceof THREE.Mesh && !o.userData.noShadow) o.castShadow = true; });


  return { drone, arms, discMat };
}
