import * as THREE from "./assets/vendor/three.module.js";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches,
  sceneEl = document.querySelector("#landscape");
const status = document.querySelector(".drive-status");
function makeScene() {
  if (!sceneEl) return;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcde6e9, 22, 58);
  const camera = new THREE.OrthographicCamera(-12, 12, 7, -7, 0.1, 100);
  camera.position.set(16, 11, 22);
  camera.lookAt(0, 2, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(sceneEl.clientWidth, sceneEl.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  sceneEl.appendChild(renderer.domElement);
  sceneEl.classList.add("scene-ready");
  const hemi = new THREE.HemisphereLight(0xdff6f0, 0x8a8e74, 2.8);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0c5, 3);
  sun.position.set(-8, 18, 12);
  sun.castShadow = true;
  scene.add(sun);
  const mats = {
    road: new THREE.MeshStandardMaterial({ color: 0x77766d, roughness: 1 }),
    hill: new THREE.MeshStandardMaterial({ color: 0x8ca184, roughness: 1 }),
    hill2: new THREE.MeshStandardMaterial({ color: 0x66816b, roughness: 1 }),
    truck: new THREE.MeshStandardMaterial({ color: 0xc2762c, roughness: 0.65 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xf1ddad, roughness: 0.7 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x263e37, roughness: 0.8 }),
    tree: new THREE.MeshStandardMaterial({ color: 0x375d48, roughness: 1 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x765337, roughness: 1 }),
    cloud: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.82,
    }),
  };
  const box = (s, p, m, parent = scene) => {
    const x = new THREE.Mesh(new THREE.BoxGeometry(...s), m);
    x.position.set(...p);
    x.castShadow = true;
    x.receiveShadow = true;
    parent.add(x);
    return x;
  };
  const cone = (r, h, p, m, parent = scene) => {
    const x = new THREE.Mesh(new THREE.ConeGeometry(r, h, 8), m);
    x.position.set(...p);
    x.castShadow = true;
    parent.add(x);
    return x;
  };
  box([50, 0.25, 14], [0, -0.5, 0], mats.road);
  for (let i = 0; i < 8; i++)
    cone(
      5 + Math.random() * 2,
      7,
      [i * 8 - 28, 2, -5],
      i % 2 ? mats.hill : mats.hill2,
    );
  for (let i = 0; i < 11; i++) {
    const x = i * 6 - 29,
      z = -2 + Math.sin(i) * 3;
    cone(1.2, 3, [x, 1, z], mats.tree);
    box([0.28, 1, 0.28], [x, -0.1, z], mats.trunk);
  }
  const truck = new THREE.Group();
  truck.scale.setScalar(1.35);
  truck.position.set(innerWidth < 600 ? -1 : -7, 0.9, 3);
  scene.add(truck);
  box([3.7, 1.25, 1.65], [0, 0, 0], mats.truck, truck);
  box([1.9, 1.15, 1.6], [0.85, 0.8, 0], mats.cream, truck);
  box([0.9, 0.4, 1.64], [-1.15, 0.83, 0], mats.cream, truck);
  box([0.75, 0.38, 1.67], [0.9, 1.42, 0], mats.dark, truck);
  box([0.12, 0.85, 1.8], [-1.8, 0.42, 0], mats.dark, truck);
  const wheels = [];
  [-1.2, 1.25].forEach((x) =>
    [-0.9, 0.9].forEach((z) => {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.25, 16),
        mats.dark,
      );
      w.rotation.x = Math.PI / 2;
      w.position.set(x, -0.65, z);
      w.castShadow = true;
      truck.add(w);
      wheels.push(w);
    }),
  );
  // Expedition details: side windows, lights, rack, spare wheel and cargo.
  box([0.7, 0.65, 0.04], [0.75, 0.85, 0.84], mats.dark, truck);
  box([0.7, 0.65, 0.04], [0.75, 0.85, -0.84], mats.dark, truck);
  box([0.1, 0.4, 0.4], [1.9, -0.1, 0.6], mats.cream, truck);
  box([0.1, 0.4, 0.4], [1.9, -0.1, -0.6], mats.cream, truck);
  box([2.1, 0.1, 1.8], [0.4, 1.52, 0], mats.dark, truck);
  box([0.6, 0.3, 0.9], [-0.2, 1.73, 0], mats.truck, truck);
  box([0.6, 0.3, 0.9], [0.5, 1.73, 0], mats.cream, truck);
  for (let i = 0; i < 5; i++) {
    box([0.1, 0.08, 1.8], [-0.5 + i * 0.45, 1.6, 0], mats.dark, truck);
  }
  wheels.forEach((w) => {
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.23, 0.23, 0.28, 12),
      mats.cream,
    );
    hub.rotation.x = Math.PI / 2;
    hub.position.copy(w.position);
    truck.add(hub);
  });
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Group();
    c.position.set(i * 8 - 18, 8 + Math.sin(i) * 1, -4);
    c.add(new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 8), mats.cloud));
    c.add(new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), mats.cloud));
    c.children[1].position.x = 1.4;
    scene.add(c);
  }
  let distance = truck.position.x,
    paused = reduced;
  const drive = (dir) => {
    distance = Math.max(-6, Math.min(9, distance + dir * 1.3));
    gsap.to(truck.position, {
      x: distance,
      duration: reduced ? 0 : 0.65,
      ease: "power2.out",
      onUpdate: () => renderer.render(scene, camera),
    });
    wheels.forEach((w) =>
      gsap.to(w.rotation, {
        z: "+=6",
        duration: reduced ? 0 : 0.65,
        onUpdate: () => renderer.render(scene, camera),
      }),
    );
    status.textContent = dir > 0 ? "Truck drove forward" : "Truck drove back";
  };
  document.querySelector("#drive-forward").onclick = () => drive(1);
  document.querySelector("#drive-back").onclick = () => drive(-1);
  document.querySelector("#motion").onclick = () => {
    paused = !paused;
    document.querySelector("#motion").textContent = paused ? "▶" : "Ⅱ";
    document.querySelector("#motion").setAttribute("aria-pressed", paused);
    document
      .querySelector("#motion")
      .setAttribute(
        "aria-label",
        paused ? "Resume scenery motion" : "Pause scenery motion",
      );
    syncRendering();
    status.textContent = paused ? "Scenery paused" : "Scenery moving";
  };
  sceneEl.tabIndex = 0;
  sceneEl.onkeydown = (e) => {
    if (e.key === "ArrowRight") drive(1);
    if (e.key === "ArrowLeft") drive(-1);
  };
  document.querySelector("#theme").onclick = () => {
    document.body.classList.toggle("night");
    const night = document.body.classList.contains("night");
    scene.background = new THREE.Color(night ? 0x243b47 : 0xcde6e9);
    scene.fog.color.set(night ? 0x243b47 : 0xcde6e9);
    hemi.intensity = night ? 0.7 : 2.8;
    sun.intensity = night ? 0.6 : 3;
    document.querySelector("#theme").setAttribute("aria-pressed", night);
    renderer.render(scene, camera);
  };
  const routeMarkers = [];
  ["PTC", "Code", "Research"].forEach((label, i) => {
    const panel = document.createElement("canvas");
    panel.width = 256;
    panel.height = 100;
    const ctx = panel.getContext("2d");
    ctx.fillStyle = "#f5f2e9";
    ctx.fillRect(0, 0, 256, 100);
    ctx.fillStyle = "#213e35";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, 128, 65);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(panel),
    });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.8), material);
    sign.position.set(i * 8 - 6, 1.8, -1.5);
    sign.rotation.y = 0.4;
    scene.add(sign);
    box([0.1, 2.3, 0.1], [i * 8 - 6, 0.3, -1.5], mats.trunk);
    routeMarkers.push(sign);
  });
  if (!reduced && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        camera.position.y = 11 + self.progress * 2;
        camera.lookAt(0, 2, 0);
        renderer.render(scene, camera);
      },
    });
  }
  const cloudGroups = scene.children.filter(
    (c) => c.type === "Group" && c !== truck,
  );
  let visible = true;
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    syncRendering();
  }).observe(sceneEl);
  if (reduced) {
    renderer.render(scene, camera);
    document.querySelector("#motion").textContent = "Play";
    document
      .querySelector("#motion")
      .setAttribute("aria-label", "Resume scenery motion");
    document.querySelector("#motion").setAttribute("aria-pressed", "true");
  }
  let raf = 0;
  const clock = new THREE.Clock();
  function syncRendering() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (!document.hidden && visible && !paused) render();
  }
  function render() {
    if (!document.hidden && visible && !paused) {
      const t = clock.getElapsedTime();
      truck.position.y = 0.9 + Math.sin(t * 2) * 0.03;
      cloudGroups.forEach(
        (c, i) => (c.position.x = ((t * 0.15 + i * 8) % 44) - 22),
      );
      renderer.render(scene, camera);
    }
    if (!document.hidden && visible && !paused)
      raf = requestAnimationFrame(render);
  }
  render();
  const resize = () => {
    const aspect = sceneEl.clientWidth / sceneEl.clientHeight;
    camera.left = -10 * aspect;
    camera.right = 10 * aspect;
    camera.top = 10;
    camera.bottom = -10;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneEl.clientWidth, sceneEl.clientHeight);
    renderer.render(scene, camera);
  };
  resize();
  renderer.render(scene, camera);
  addEventListener("resize", resize);
  addEventListener("visibilitychange", () => {
    syncRendering();
  });
}
try {
  makeScene();
} catch (err) {
  console.warn("Scenery unavailable", err);
  document
    .querySelectorAll("#drive-forward,#drive-back,#motion")
    .forEach((b) => (b.hidden = true));
  sceneEl?.classList.remove("scene-ready");
  document.querySelector("#theme").onclick = () => {
    const night = document.body.classList.toggle("night");
    document.querySelector("#theme").setAttribute("aria-pressed", night);
  };
}
if (window.gsap) {
  gsap.registerPlugin(window.ScrollTrigger);
  if (!reduced) {
    gsap.from(".hero-note,.hero-bottom", {
      y: 25,
      autoAlpha: 0,
      duration: 1,
      delay: 0.4,
      stagger: 0.1,
      ease: "power3.out",
    });
    gsap.utils.toArray(".section").forEach((s) =>
      gsap.from(
        s.querySelectorAll(
          ".route-label,h2,.project-card,.job,.archive-grid article",
        ),
        {
          y: 30,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: s, start: "top 82%", once: true },
        },
      ),
    );
  }
}
let credentials = [];
const list = document.querySelector("#cert-list");
const escapeHtml = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function renderCerts(q = "") {
  const found = credentials.filter((c) =>
    [c.name, c.issuer, c.issued]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  list.innerHTML = found
    .map(
      (c) =>
        "<article><h3>" +
        escapeHtml(c.name) +
        (/CKAD|Certified Kubernetes Application Developer/i.test(c.name) &&
        /LearnKartS/i.test(c.issuer)
          ? " (course completion; not exam certification)"
          : "") +
        "</h3><p>" +
        escapeHtml(c.issuer) +
        (c.issued ? " / " + escapeHtml(c.issued) : "") +
        " / Profile-reported</p>" +
        (c.credentialUrl && /^https:\/\//.test(c.credentialUrl)
          ? '<a class="under-link" href="' +
            escapeHtml(c.credentialUrl) +
            '">View credential record</a>'
          : "") +
        "</article>",
    )
    .join("");
  document.querySelector("#cert-count").textContent =
    found.length + " records shown";
}
fetch("profile-data.json")
  .then((r) => {
    if (!r.ok) throw Error();
    return r.json();
  })
  .then((data) => {
    credentials = data.certifications || [];
    renderCerts();
  })
  .catch(() => {
    document.querySelector("#cert-count").textContent =
      "Records unavailable. View credential records on LinkedIn.";
  });
document.querySelector("#cert-search").oninput = (e) =>
  renderCerts(e.target.value);
if (!reduced && window.Lenis) {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
const dlg = document.querySelector("#certification-dialog");
document.querySelector("#open-certifications").onclick = () => dlg.showModal();
document.querySelector("#close-certifications").onclick = () => dlg.close();
const filterButtons = [...document.querySelectorAll(".filters button")],
  projectCards = [...document.querySelectorAll(".project-card")];
filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const f = btn.dataset.filter;
    projectCards.forEach(
      (card) => (card.hidden = f !== "all" && card.dataset.category !== f),
    );
    document.querySelector("#filter-status").textContent =
      `${projectCards.filter((c) => !c.hidden).length} projects shown`;
  }),
);
document.querySelector("#destination").addEventListener("change", (e) => {
  document
    .getElementById(e.target.value)
    ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  status.textContent = "Arrived at " + e.target.selectedOptions[0].textContent;
});
