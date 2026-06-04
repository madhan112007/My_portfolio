import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const SceneCanvas = ({ isDark }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 220;
    const H = el.clientHeight || 700;

    /* ── RENDERER ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.0 : 1.6;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(isDark ? 0x0A0800 : 0xD4B87A);
    el.appendChild(renderer.domElement);

    /* ── SCENE ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x100C06 : 0xC8A860, isDark ? 0.09 : 0.05);
    scene.background = new THREE.Color(isDark ? 0x0A0800 : 0xD4B87A);

    /* ── CAMERA ── */
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.05, 30);
    camera.position.set(0, 1.6, 3.2);
    camera.lookAt(0, 0.9, -0.5);

    /* ── ORBIT CONTROLS ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.7;
    controls.panSpeed = 0.4;
    controls.minDistance = 1.2;
    controls.maxDistance = 5.5;
    controls.minPolarAngle = Math.PI / 6;   // don't go below floor
    controls.maxPolarAngle = Math.PI / 1.7; // don't flip upside
    controls.target.set(0, 0.9, -0.5);
    controls.update();

    /* ── HELPERS ── */
    const std = (color, rough = 0.88, metal = 0, opts = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...opts });
    const mkBox = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    const mkCyl = (rt, rb, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    const add = (mesh, x, y, z, rx = 0, ry = 0, rz = 0) => {
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };

    /* ── PROCEDURAL STONE TEXTURE ── */
    const makeStoneTexture = (seed = 0) => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      // Base warm stone grey
      ctx.fillStyle = '#5A4A38';
      ctx.fillRect(0, 0, 512, 512);
      // Noise grain
      for (let i = 0; i < 18000; i++) {
        const x = Math.random() * 512, y = Math.random() * 512;
        const r = Math.random() * 2;
        const v = Math.floor(50 + Math.random() * 60 + seed * 10);
        ctx.fillStyle = `rgba(${v + 30},${v + 15},${v},${0.18 + Math.random() * 0.25})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      // Cracks
      ctx.strokeStyle = 'rgba(20,14,8,0.35)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        for (let s = 0; s < 4; s++)
          ctx.lineTo(Math.random() * 512, Math.random() * 512);
        ctx.stroke();
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    };

    /* ── STONE BLOCK WALL ── */
    const stoneTex = makeStoneTexture(0);
    const stoneMat = std(0x6A5540, 0.96, 0.0, { map: stoneTex });
    const stoneDarkMat = std(0x4A3828, 0.98, 0.0, { map: makeStoneTexture(1) });
    const mortarMat = std(0x3A2E22, 0.99);

    const buildStoneWall = (W2, H2, depth, offsetX, offsetY, offsetZ, ry = 0) => {
      const g = new THREE.Group();
      // Base solid slab
      const slab = mkBox(W2, H2, depth, mortarMat);
      slab.position.set(0, 0, 0);
      slab.receiveShadow = true;
      g.add(slab);
      // Stone blocks
      const rows = 7, blockH = H2 / rows;
      for (let r = 0; r < rows; r++) {
        const cols = 4 + (r % 2);
        const blockW = W2 / cols;
        for (let c = 0; c < cols; c++) {
          const bw = blockW * (0.88 + Math.random() * 0.1);
          const bh = blockH * (0.82 + Math.random() * 0.1);
          const b = mkBox(bw - 0.02, bh - 0.02, depth + 0.025, r % 3 === 0 ? stoneDarkMat : stoneMat);
          b.position.set(
            -W2 / 2 + blockW * c + blockW / 2 + (r % 2 === 0 ? 0 : blockW * 0.5),
            -H2 / 2 + blockH * r + blockH / 2,
            depth / 2 + 0.005
          );
          b.receiveShadow = true;
          b.castShadow = false;
          g.add(b);
        }
      }
      g.position.set(offsetX, offsetY, offsetZ);
      g.rotation.y = ry;
      scene.add(g);
      return g;
    };

    // Back wall
    buildStoneWall(7, 5.5, 0.18, 0, 2.75, -3.0);
    // Left wall
    buildStoneWall(7, 5.5, 0.18, -3.4, 2.75, 0.5, Math.PI / 2);
    // Right wall
    buildStoneWall(7, 5.5, 0.18, 3.4, 2.75, 0.5, -Math.PI / 2);

    /* ── STONE FLOOR ── */
    const floorTex = makeStoneTexture(2);
    floorTex.repeat.set(4, 4);
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      std(0x4A3C2C, 0.97, 0, { map: floorTex })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    // Rug / carpet
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2),
      std(isDark ? 0x5A1A1A : 0x8B3A1A, 0.95));
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(-0.3, 0.005, 0.8);
    scene.add(rug);

    /* ── STONE CEILING ── */
    const ceilMesh = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), std(0x3A3028, 0.99));
    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.position.y = 5.5;
    scene.add(ceilMesh);

    /* ── ARCHED BARRED WINDOW (left wall) ── */
    const makeWindow = (x, y, z, ry = 0) => {
      const g = new THREE.Group();
      // Stone arch surround - carved inset
      const archDepth = mkBox(0.85, 1.5, 0.35, std(0x3A2E20, 0.98));
      archDepth.position.set(0, 0, -0.12);
      g.add(archDepth);
      // Arch top (semi-circle approximation with boxes)
      for (let a = 0; a < 8; a++) {
        const angle = (a / 7) * Math.PI;
        const bk = mkBox(0.18, 0.18, 0.38, std(0x4A3C28, 0.97));
        bk.position.set(Math.cos(angle) * 0.32, 0.75 + Math.sin(angle) * 0.22, -0.1);
        g.add(bk);
      }
      // Iron bars (vertical)
      const barMat = std(0x1A1612, 0.7, 0.5);
      for (let b = -2; b <= 2; b++) {
        const bar = mkCyl(0.018, 0.018, 1.4, 6, barMat);
        bar.position.set(b * 0.16, 0, 0.02);
        g.add(bar);
      }
      // Horizontal bar
      const hbar = mkBox(0.78, 0.03, 0.03, barMat);
      hbar.position.set(0, 0, 0.02);
      g.add(hbar);
      // Night sky / glow behind
      const sky = new THREE.Mesh(
        new THREE.PlaneGeometry(0.75, 1.35),
        new THREE.MeshBasicMaterial({ color: isDark ? 0x050814 : 0x6080B0 })
      );
      sky.position.set(0, 0, -0.3);
      g.add(sky);
      // Moon glow
      if (isDark) {
        const moonGlow = new THREE.Mesh(
          new THREE.CircleGeometry(0.12, 12),
          new THREE.MeshBasicMaterial({ color: 0xDDE8FF, transparent: true, opacity: 0.6 })
        );
        moonGlow.position.set(0.18, 0.3, -0.28);
        g.add(moonGlow);
      }
      g.position.set(x, y, z);
      g.rotation.y = ry;
      scene.add(g);
      return g;
    };
    makeWindow(-3.25, 2.2, -0.8, Math.PI / 2);
    makeWindow(-3.25, 2.2, 0.8, Math.PI / 2);

    /* ── WOODEN DESK (L-shaped like image) ── */
    const woodMat = std(0x6B4220, 0.82);
    const woodDarkMat = std(0x5A3318, 0.85);
    // Main desk surface
    const deskMain = mkBox(1.9, 0.08, 0.85, woodMat);
    add(deskMain, 0.2, 0.88, -0.55);
    // Desk legs - rough hewn
    [[-0.8, -0.25], [0.8, -0.25], [-0.8, 0.17], [0.8, 0.17]].forEach(([x, z]) => {
      const leg = mkBox(0.09, 0.88, 0.09, woodDarkMat);
      add(leg, x + 0.2, 0.44, z - 0.55);
    });
    // Desk stretchers
    const stretchH = mkBox(1.6, 0.06, 0.06, woodDarkMat);
    add(stretchH, 0.2, 0.28, -0.55);
    const stretchV = mkBox(0.06, 0.06, 0.76, woodDarkMat);
    add(stretchV, -0.6, 0.28, -0.55);

    /* ── ANGLED BOOK STAND (like in image) ── */
    const standBase = mkBox(0.52, 0.04, 0.42, woodMat);
    add(standBase, -0.25, 0.92, -0.6);
    const standPanel = mkBox(0.5, 0.42, 0.025, woodMat);
    add(standPanel, -0.25, 1.12, -0.76, -0.65, 0, 0);
    // Stand ledge (bottom lip)
    const standLedge = mkBox(0.5, 0.025, 0.06, woodDarkMat);
    add(standLedge, -0.25, 0.94, -0.68, -0.65, 0, 0);
    // Paper on stand
    const paperOnStand = new THREE.Mesh(
      new THREE.PlaneGeometry(0.42, 0.36),
      std(isDark ? 0xD4C090 : 0xF0E4C0, 0.92)
    );
    paperOnStand.position.set(-0.25, 1.12, -0.74);
    paperOnStand.rotation.x = -0.65;
    scene.add(paperOnStand);

    /* ── OPEN BOOK on desk (left side) ── */
    // Parchment canvas
    const pc = document.createElement('canvas');
    pc.width = 512; pc.height = 256;
    const ctx = pc.getContext('2d');
    const g2 = ctx.createLinearGradient(0, 0, 512, 0);
    g2.addColorStop(0, '#C8A850'); g2.addColorStop(0.48, '#D4B860');
    g2.addColorStop(0.52, '#C0A048'); g2.addColorStop(1, '#C8A850');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = 'rgba(60,30,10,0.3)'; ctx.lineWidth = 1;
    for (let l = 20; l < 256; l += 16) {
      ctx.beginPath(); ctx.moveTo(16, l); ctx.lineTo(245, l); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(267, l); ctx.lineTo(496, l); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(40,20,5,0.4)'; ctx.lineWidth = 0.9;
    for (let l = 22; l < 250; l += 16) {
      let lx = 16;
      while (lx < 240) { const w = 8 + Math.random() * 22; ctx.beginPath(); ctx.moveTo(lx, l); ctx.lineTo(lx + w, l); ctx.stroke(); lx += w + 3 + Math.random() * 8; }
      lx = 267;
      while (lx < 490) { const w = 8 + Math.random() * 22; ctx.beginPath(); ctx.moveTo(lx, l); ctx.lineTo(lx + w, l); ctx.stroke(); lx += w + 3 + Math.random() * 8; }
    }
    // Center spine shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(246, 0, 20, 256);
    const parchTex = new THREE.CanvasTexture(pc);

    const openBook = new THREE.Mesh(
      new THREE.PlaneGeometry(0.72, 0.52),
      new THREE.MeshStandardMaterial({ map: parchTex, roughness: 0.9, metalness: 0 })
    );
    openBook.rotation.x = -Math.PI / 2;
    openBook.position.set(-0.65, 0.925, -0.52);
    scene.add(openBook);
    // Book covers
    const bookCover = mkBox(0.73, 0.018, 0.53, std(0x3A1A08, 0.88));
    add(bookCover, -0.65, 0.918, -0.52);
    // Book spine
    const bookSpineM = mkBox(0.025, 0.045, 0.53, std(0x2A1206, 0.9));
    add(bookSpineM, -0.285, 0.928, -0.52);

    /* ── QUILL + INKWELL ── */
    const inkwellMat = std(0x120E0A, 0.2, 0.6);
    const inkwell = mkCyl(0.038, 0.034, 0.072, 14, inkwellMat);
    add(inkwell, 0.22, 0.9, -0.62);
    const inkRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.039, 0.007, 8, 18),
      std(0x8B6010, 0.3, 0.7)
    );
    inkRim.position.set(0.22, 0.934, -0.62);
    scene.add(inkRim);
    // Quill
    const quillMat = std(isDark ? 0xD4C080 : 0xF0DFA0, 0.8);
    const quillShaft = mkCyl(0.004, 0.007, 0.32, 6, quillMat);
    quillShaft.rotation.z = Math.PI / 2 - 0.3;
    quillShaft.rotation.y = 0.5;
    quillShaft.position.set(0.22, 0.96, -0.6);
    scene.add(quillShaft);
    for (let f = 0; f < 7; f++) {
      const barb = new THREE.Mesh(
        new THREE.PlaneGeometry(0.07 - f * 0.006, 0.018),
        new THREE.MeshStandardMaterial({ color: isDark ? 0xE0D090 : 0xF8EEB0, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      barb.position.set(0.18 + f * 0.018, 0.975 + f * 0.004, -0.59);
      barb.rotation.y = 0.5;
      barb.rotation.z = f % 2 === 0 ? 0.3 : -0.3;
      scene.add(barb);
    }

    /* ── SMALL CLAY POT / MUG ── */
    const potMat = std(0x8B5A30, 0.88);
    const pot = mkCyl(0.055, 0.048, 0.09, 12, potMat);
    add(pot, 0.45, 0.895, -0.68);
    const potRim = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.008, 8, 16), potMat);
    potRim.position.set(0.45, 0.938, -0.68); scene.add(potRim);

    /* ── TREASURE CHEST / BOX on desk ── */
    const chestMat = std(0x5A3A18, 0.85);
    const chestBody = mkBox(0.26, 0.16, 0.2, chestMat);
    add(chestBody, 0.62, 0.96, -0.6);
    const chestLid = mkBox(0.26, 0.06, 0.2, std(0x6A4A22, 0.82));
    add(chestLid, 0.62, 1.05, -0.6, -0.25, 0, 0);
    const chestLock = mkBox(0.04, 0.04, 0.025, std(0xA07820, 0.3, 0.7));
    add(chestLock, 0.62, 0.96, -0.5);

    /* ── WALL-MOUNTED SHELVES (upper back wall like image) ── */
    const shelfMat = std(0x6B4220, 0.84);
    const shelfDark = std(0x5A3318, 0.87);
    // Upper shelf row
    const shelf1 = mkBox(1.6, 0.055, 0.32, shelfMat);
    add(shelf1, 0.3, 2.5, -2.82);
    // Shelf brackets
    [-0.6, 0.6].forEach(x => {
      const br = mkBox(0.04, 0.22, 0.28, shelfDark);
      add(br, x + 0.3, 2.38, -2.82);
    });
    // Box/crate on shelf
    const shelfBox1 = mkBox(0.28, 0.28, 0.24, std(0x6B4A20, 0.86));
    add(shelfBox1, -0.2, 2.66, -2.82);
    const shelfBox2 = mkBox(0.22, 0.22, 0.2, std(0x7A5428, 0.85));
    add(shelfBox2, 0.65, 2.62, -2.82);
    // Small vase/jar on shelf
    const vase = mkCyl(0.045, 0.038, 0.1, 10, std(0x2A1A10, 0.2, 0.5));
    add(vase, 0.18, 2.58, -2.82);

    // Lower wall shelf
    const shelf2 = mkBox(1.2, 0.05, 0.28, shelfMat);
    add(shelf2, 0.2, 1.85, -2.85);
    [-0.45, 0.45].forEach(x => {
      const br2 = mkBox(0.04, 0.18, 0.24, shelfDark);
      add(br2, x + 0.2, 1.76, -2.85);
    });
    // Rolled scrolls on lower shelf
    for (let s = 0; s < 3; s++) {
      const scroll = mkCyl(0.028, 0.028, 0.2, 8, std(0xC8A860, 0.88));
      scroll.rotation.z = Math.PI / 2;
      scroll.position.set(-0.3 + s * 0.26, 1.9, -2.85);
      scroll.castShadow = true; scene.add(scroll);
    }

    /* ── ORB LAMP (left, like in image) ── */
    const makeLamp = (x, y, z) => {
      const g = new THREE.Group();
      // Pole
      const pole = mkCyl(0.012, 0.012, y, 8, std(0x8B7050, 0.4, 0.6));
      pole.position.set(0, y / 2, 0);
      g.add(pole);
      // Decorative base
      const base = mkCyl(0.05, 0.06, 0.05, 10, std(0x9B8060, 0.4, 0.5));
      base.position.set(0, 0.025, 0);
      g.add(base);
      // Arm / bracket
      const arm = mkBox(0.12, 0.01, 0.01, std(0x8B7050, 0.4, 0.6));
      arm.position.set(0.06, y, 0);
      g.add(arm);
      // Orb sphere
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 10),
        new THREE.MeshStandardMaterial({ color: 0xFFDD44, emissive: 0xFFAA00, emissiveIntensity: 2.5, roughness: 0.1 })
      );
      orb.position.set(0.12, y, 0);
      g.add(orb);
      // Decorative claw/bracket around orb
      for (let c = 0; c < 4; c++) {
        const claw = mkCyl(0.005, 0.005, 0.08, 4, std(0x8B7050, 0.4, 0.6));
        claw.rotation.z = 0.5;
        const angle = (c / 4) * Math.PI * 2;
        claw.position.set(0.12 + Math.cos(angle) * 0.04, y - 0.03, Math.sin(angle) * 0.04);
        g.add(claw);
      }
      g.position.set(x, 0, z);
      scene.add(g);
      return { group: g, orb };
    };

    const lamp1 = makeLamp(-1.6, 1.5, 0.4);
    const lamp2 = makeLamp(1.8, 1.3, 0.3);

    /* ── LAMP POINT LIGHTS ── */
    const orbLight1 = new THREE.PointLight(0xFFAA22, 2.5, 5.5, 2);
    orbLight1.position.set(-1.48, 1.5, 0.4);
    orbLight1.castShadow = true;
    orbLight1.shadow.mapSize.set(512, 512);
    scene.add(orbLight1);

    const orbLight2 = new THREE.PointLight(0xFFAA22, 2.0, 5.0, 2);
    orbLight2.position.set(1.92, 1.3, 0.3);
    orbLight2.castShadow = true;
    scene.add(orbLight2);

    /* ── AMBIENT + FILL ── */
    // Dark mode: very dim warm ambient. Light mode: bright daylight.
    scene.add(new THREE.AmbientLight(
      isDark ? 0xFFEECC : 0xFFF5E0,
      isDark ? 0.03 : 1.2
    ));
    const fillLight = new THREE.DirectionalLight(
      isDark ? 0xFFDDAA : 0xFFF0CC,
      isDark ? 0.04 : 1.5
    );
    fillLight.position.set(2, 5, 3);
    fillLight.castShadow = true;
    scene.add(fillLight);
    // Light mode: sun shaft through window
    if (!isDark) {
      const sunSpot = new THREE.SpotLight(0xFFE8A0, 2.5, 8, Math.PI / 7, 0.5);
      sunSpot.position.set(-2.8, 3.5, -0.5);
      sunSpot.target.position.set(0, 0.5, 0);
      sunSpot.castShadow = true;
      scene.add(sunSpot);
      scene.add(sunSpot.target);
      // Boost orb lights in light mode too
      orbLight1.intensity = 0.8;
      orbLight2.intensity = 0.6;
    }

    /* ── WOODEN BARREL (right, like image) ── */
    const barrelMat = std(0x5A3818, 0.88);
    const barrel = mkCyl(0.22, 0.19, 0.55, 14, barrelMat);
    add(barrel, 2.4, 0.275, 0.6);
    // Barrel rings
    [0.18, 0, -0.18].forEach(y => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.012, 6, 18),
        std(0x3A2A10, 0.5, 0.4)
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(2.4, 0.275 + y, 0.6);
      scene.add(ring);
    });
    // Barrel top
    const barrelTop = mkCyl(0.22, 0.22, 0.015, 14, std(0x6A4820, 0.85));
    add(barrelTop, 2.4, 0.562, 0.6);

    /* ── STOOL (center, like image) ── */
    const stoolMat = std(0x6B4220, 0.85);
    const stoolSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 6), stoolMat);
    add(stoolSeat, 0.1, 0.5, 0.5);
    for (let s = 0; s < 3; s++) {
      const angle = (s / 3) * Math.PI * 2;
      const sl = mkCyl(0.02, 0.02, 0.5, 8, std(0x5A3318, 0.88));
      sl.position.set(0.1 + Math.cos(angle) * 0.15, 0.25, 0.5 + Math.sin(angle) * 0.15);
      sl.castShadow = true; scene.add(sl);
    }
    // Stool stretchers
    for (let s = 0; s < 3; s++) {
      const angle = (s / 3) * Math.PI * 2;
      const nextAngle = ((s + 1) / 3) * Math.PI * 2;
      const sx = (Math.cos(angle) + Math.cos(nextAngle)) * 0.5 * 0.15;
      const sz = (Math.sin(angle) + Math.sin(nextAngle)) * 0.5 * 0.15;
      const stretch = mkBox(0.17, 0.018, 0.018, std(0x5A3318, 0.88));
      stretch.position.set(0.1 + sx, 0.22, 0.5 + sz);
      stretch.rotation.y = Math.atan2(Math.sin(nextAngle) - Math.sin(angle), Math.cos(nextAngle) - Math.cos(angle));
      scene.add(stretch);
    }

    /* ── PARTICLES (floating dust motes) ── */
    const dustGeo = new THREE.SphereGeometry(0.004, 3, 3);
    const dustMat = new THREE.MeshBasicMaterial({ color: 0xFFD080, transparent: true, opacity: 0 });
    const dusts = Array.from({ length: 60 }, (_, i) => {
      const d = new THREE.Mesh(dustGeo, dustMat.clone());
      d.position.set(
        (Math.random() - 0.5) * 3,
        0.5 + Math.random() * 2,
        (Math.random() - 0.5) * 2 - 0.5
      );
      d.userData = {
        speed: 0.002 + Math.random() * 0.003,
        drift: new THREE.Vector3((Math.random() - 0.5) * 0.001, 0, (Math.random() - 0.5) * 0.001),
        life: Math.random(),
        maxLife: 1.5 + Math.random() * 2,
        startY: 0.3 + Math.random() * 1.5,
      };
      scene.add(d);
      return d;
    });

    /* ── CLOCK + ANIMATION ── */
    const clock = new THREE.Clock();
    let rafId;
    let isUserInteracting = false;
    let idleTimer = 0;
    const IDLE_RESUME = 2.5;

    // Cinematic camera waypoints — each is [camX, camY, camZ, tgtX, tgtY, tgtZ]
    const waypoints = [
      [0,    1.6,  3.2,   0,    0.9, -0.5],  // front overview
      [-1.2, 1.4,  2.0,   0.3,  0.9, -0.6],  // slight left angle
      [1.2,  1.4,  2.0,  -0.2,  0.9, -0.6],  // slight right angle
      [0,    2.4,  2.5,   0,    0.7, -0.8],  // higher birds-eye
      [-0.5, 1.1,  1.5,   0.4,  1.0, -0.5],  // low close-up of desk
      [0.8,  1.8,  2.8,  -0.4,  0.8, -0.4],  // right side gaze
    ];
    let wpIndex = 0;
    let wpProgress = 0;
    const WP_DURATION = 5.0; // seconds per waypoint

    const lerpV = (a, b, t) => a + (b - a) * t;
    const easeInOut = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;

    renderer.domElement.addEventListener('pointerdown', () => { isUserInteracting = true; idleTimer = 0; });
    renderer.domElement.addEventListener('pointerup',   () => { isUserInteracting = false; });
    renderer.domElement.addEventListener('wheel',       () => { isUserInteracting = true; idleTimer = 0; setTimeout(() => { isUserInteracting = false; }, 800); });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = 0.016;

      controls.update();

      if (isUserInteracting) {
        idleTimer = 0;
      } else {
        idleTimer += dt;
      }

      // Auto camera tour when idle
      if (!isUserInteracting && idleTimer > IDLE_RESUME) {
        wpProgress += dt / WP_DURATION;
        if (wpProgress >= 1) {
          wpProgress = 0;
          wpIndex = (wpIndex + 1) % waypoints.length;
        }
        const next = (wpIndex + 1) % waypoints.length;
        const e = easeInOut(wpProgress);
        const cur = waypoints[wpIndex];
        const nxt = waypoints[next];

        camera.position.set(
          lerpV(cur[0], nxt[0], e),
          lerpV(cur[1], nxt[1], e),
          lerpV(cur[2], nxt[2], e)
        );
        controls.target.set(
          lerpV(cur[3], nxt[3], e),
          lerpV(cur[4], nxt[4], e),
          lerpV(cur[5], nxt[5], e)
        );
        controls.update();
      }

      // Orb lamp flicker
      const base1 = isDark ? 2.4 : 0.8;
      const base2 = isDark ? 2.0 : 0.6;
      orbLight1.intensity = base1 + Math.sin(t * 7.1) * 0.22 + Math.sin(t * 13.3) * 0.1 + (Math.random() - 0.5) * 0.05;
      orbLight2.intensity = base2 + Math.sin(t * 6.7) * 0.18 + Math.sin(t * 11.9) * 0.09 + (Math.random() - 0.5) * 0.04;
      lamp1.orb.material.emissiveIntensity = 2.2 + Math.sin(t * 5) * 0.5;
      lamp2.orb.material.emissiveIntensity = 2.0 + Math.sin(t * 4.2 + 1) * 0.5;
      lamp1.orb.scale.setScalar(1 + Math.sin(t * 6.5) * 0.06);
      lamp2.orb.scale.setScalar(1 + Math.sin(t * 5.8) * 0.07);

      // Dust particles
      dusts.forEach(d => {
        d.userData.life += d.userData.speed;
        const lt = d.userData.life / d.userData.maxLife;
        d.material.opacity = lt < 0.12 ? lt / 0.12 * 0.7 : lt > 0.75 ? (1 - lt) / 0.25 * 0.7 : 0.7;
        d.position.y += d.userData.speed * 0.5;
        d.position.x += d.userData.drift.x;
        d.position.z += d.userData.drift.z;
        if (d.userData.life >= d.userData.maxLife) {
          d.userData.life = 0;
          d.position.set(
            (Math.random() - 0.5) * 3,
            d.userData.startY,
            (Math.random() - 0.5) * 2 - 0.5
          );
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      scene.traverse(obj => {
        obj.geometry?.dispose();
        if (obj.material) {
          Array.isArray(obj.material)
            ? obj.material.forEach(m => m.dispose())
            : obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }}
      onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={e => e.currentTarget.style.cursor = 'grab'}
    />
  );
};

const SidePanel = ({ side }) => {
  const { isDarkMode } = useTheme();
  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, [side]: 0,
      width: 'calc((100vw - min(928px, 95vw)) / 2)',
      pointerEvents: 'none', zIndex: 5, overflow: 'hidden',
    }}>
      {/* Only the canvas area below navbar captures pointer events */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 0, pointerEvents: 'auto' }}>
        <SceneCanvas isDark={isDarkMode} />
      </div>
    </div>
  );
};

const SidePanels = () => (
  <>
    <SidePanel side="left" />
    <SidePanel side="right" />
  </>
);

export default SidePanels;
