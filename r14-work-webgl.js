import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/*
  R14.1 WebGL proof-of-concept.
  Visual only: reads existing DOM positions and renders behind the original anchors.
  It never changes project ids, hrefs, filters, routing or case-study content.
*/

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = null;
let scheduled = false;

function seeded(seed){
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeGlowTexture(){
  const c=document.createElement('canvas');
  c.width=c.height=256;
  const x=c.getContext('2d');
  const g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,.9)');
  g.addColorStop(.16,'rgba(255,255,255,.42)');
  g.addColorStop(.45,'rgba(255,255,255,.12)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;
  x.fillRect(0,0,256,256);
  const t=new THREE.CanvasTexture(c);
  t.colorSpace=THREE.SRGBColorSpace;
  return t;
}

function makePlanetTexture(kind){
  const w=768,h=384,c=document.createElement('canvas');
  c.width=w;
  c.height=h;
  const x=c.getContext('2d');
  const rand=seeded(kind==='agentlab'?731941:884201);
  const base=kind==='agentlab'
    ? ['#0a263c','#16445f','#2a7293','#70c5ef']
    : ['#2b3034','#5a493f','#9a6848','#e0a66f'];
  const g=x.createLinearGradient(0,0,w,h);
  g.addColorStop(0,base[3]);
  g.addColorStop(.2,base[2]);
  g.addColorStop(.58,base[1]);
  g.addColorStop(1,base[0]);
  x.fillStyle=g;
  x.fillRect(0,0,w,h);

  x.globalCompositeOperation='screen';
  for(let i=0;i<140;i++){
    const yy=rand()*h;
    const alpha=.015+rand()*.06;
    x.strokeStyle='rgba(255,255,255,'+alpha+')';
    x.lineWidth=.5+rand()*1.8;
    x.beginPath();
    const amp=5+rand()*24;
    const freq=.006+rand()*.018;
    for(let xx=0;xx<=w;xx+=12){
      const py=yy+Math.sin(xx*freq+rand()*2)*amp;
      if(xx===0)x.moveTo(xx,py);
      else x.lineTo(xx,py);
    }
    x.stroke();
  }

  x.globalCompositeOperation='overlay';
  for(let i=0;i<210;i++){
    const px=rand()*w,py=rand()*h,r=1+rand()*6;
    const a=.02+rand()*.08;
    x.fillStyle=kind==='agentlab'
      ? 'rgba(126,205,247,'+a+')'
      : 'rgba(246,194,140,'+a+')';
    x.beginPath();
    x.arc(px,py,r,0,Math.PI*2);
    x.fill();
  }
  x.globalCompositeOperation='source-over';

  if(kind==='agentlab'){
    x.strokeStyle='rgba(196,235,255,.22)';
    x.lineWidth=1;
    for(let y=30;y<h;y+=31){
      x.beginPath();
      x.moveTo(0,y);
      x.lineTo(w,y+8*Math.sin(y*.07));
      x.stroke();
    }
  }else{
    const seam=x.createLinearGradient(w*.46,0,w*.54,0);
    seam.addColorStop(0,'rgba(255,235,207,0)');
    seam.addColorStop(.48,'rgba(255,230,197,.24)');
    seam.addColorStop(.5,'rgba(255,240,218,.7)');
    seam.addColorStop(.52,'rgba(255,230,197,.24)');
    seam.addColorStop(1,'rgba(255,235,207,0)');
    x.fillStyle=seam;
    x.fillRect(w*.43,0,w*.14,h);
  }

  const t=new THREE.CanvasTexture(c);
  t.wrapS=THREE.RepeatWrapping;
  t.colorSpace=THREE.SRGBColorSpace;
  t.anisotropy=4;
  return t;
}

function addGlow(group,color,size=3){
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({
    map:makeGlowTexture(),
    color,
    transparent:true,
    opacity:.42,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
  sprite.scale.set(size,size,size);
  sprite.position.z=-.25;
  group.add(sprite);
  return sprite;
}

function makeGreatCircleLine(color){
  const pts=[];
  for(let i=0;i<=70;i++){
    const y=-.94+(1.88*i/70);
    const z=Math.sqrt(Math.max(0,1-y*y))*1.006;
    pts.push(new THREE.Vector3(.018,y,z));
  }
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(geo,new THREE.LineBasicMaterial({
    color,
    transparent:true,
    opacity:.72,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
}

function makePlanet(kind){
  const group=new THREE.Group();
  const geo=new THREE.SphereGeometry(1,96,96);
  const map=makePlanetTexture(kind);
  const mat=new THREE.MeshPhysicalMaterial({
    color:kind==='agentlab'?0x66b9e8:0xd59a68,
    map,
    roughness:kind==='agentlab'?.52:.62,
    metalness:.04,
    clearcoat:.26,
    clearcoatRoughness:.42,
    emissive:kind==='agentlab'?0x08263c:0x2e1608,
    emissiveIntensity:.35,
    transparent:true,
    opacity:1
  });
  const sphere=new THREE.Mesh(geo,mat);
  sphere.rotation.x=.08;
  group.add(sphere);

  if(kind==='agentlab'){
    const ringMat=new THREE.MeshBasicMaterial({
      color:0x9edcff,
      transparent:true,
      opacity:.5,
      blending:THREE.AdditiveBlending,
      depthWrite:false
    });
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.37,.012,8,220),ringMat);
    ring.rotation.x=1.13;
    ring.rotation.y=.18;
    ring.rotation.z=-.14;
    group.add(ring);

    const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.13,.005,6,180),ringMat.clone());
    ring2.material.opacity=.16;
    ring2.rotation.x=.75;
    ring2.rotation.y=-.52;
    ring2.rotation.z=.38;
    group.add(ring2);

    const sat=new THREE.Mesh(
      new THREE.SphereGeometry(.045,18,18),
      new THREE.MeshBasicMaterial({color:0xcdf0ff})
    );
    sat.position.set(-1.19,.25,.28);
    group.add(sat);

    const sat2=sat.clone();
    sat2.material=sat.material.clone();
    sat2.material.color.set(0xb8a9ff);
    sat2.scale.setScalar(.7);
    sat2.position.set(1.04,.54,.12);
    group.add(sat2);

    addGlow(group,0x5ebcf3,3.2);
  }else{
    const ringMat=new THREE.MeshBasicMaterial({
      color:0xefbc86,
      transparent:true,
      opacity:.48,
      blending:THREE.AdditiveBlending,
      depthWrite:false
    });
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.4,.012,8,220),ringMat);
    ring.rotation.x=1.17;
    ring.rotation.y=-.18;
    ring.rotation.z=.13;
    group.add(ring);

    const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.12,.005,6,180),ringMat.clone());
    ring2.material.opacity=.13;
    ring2.rotation.x=.78;
    ring2.rotation.y=.45;
    ring2.rotation.z=-.25;
    group.add(ring2);

    group.add(makeGreatCircleLine(0xffe2bc));

    for(const p of [[-1.13,.33,.15],[1.12,.18,.2],[.82,-.88,.15]]){
      const cube=new THREE.Mesh(
        new THREE.BoxGeometry(.09,.09,.09),
        new THREE.MeshBasicMaterial({color:0xf1c28f})
      );
      cube.position.set(p[0],p[1],p[2]);
      cube.rotation.z=.4;
      group.add(cube);
    }

    addGlow(group,0xe5a866,3.25);
  }

  group.userData={kind,sphere,hover:false,targetScale:1,baseScale:1};
  return group;
}

function createDustLayer({seed,count,spanX,spanY,zMin,zMax,size,opacity,warmMix=0.5}){
  const rand=seeded(seed);
  const positions=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const warm=new THREE.Color(0xeac9a8);
  const cool=new THREE.Color(0x8fb5d1);
  for(let i=0;i<count;i++){
    const t=rand()*2-1;
    const arm=Math.sin(t*Math.PI*2.15)*.48;
    positions[i*3]=t*spanX+(rand()-.5)*spanX*.16;
    positions[i*3+1]=arm*spanY+(rand()-.5)*spanY*1.18;
    positions[i*3+2]=zMin+rand()*(zMax-zMin);
    const mix=Math.min(1,Math.max(0,warmMix*(.45+.55*Math.cos(t*Math.PI))));
    const col=cool.clone().lerp(warm,mix);
    colors[i*3]=col.r;
    colors[i*3+1]=col.g;
    colors[i*3+2]=col.b;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const mat=new THREE.PointsMaterial({
    size,
    sizeAttenuation:true,
    transparent:true,
    opacity,
    vertexColors:true,
    blending:THREE.AdditiveBlending,
    depthWrite:false,
    fog:true
  });
  return new THREE.Points(geo,mat);
}

function createGalaxy(scene,w,h,camera){
  const group=new THREE.Group();
  const worldHeight=2*camera.position.z*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  const upp=worldHeight/h;
  const spanX=w*.58*upp;
  const spanY=82*upp;

  const far=createDustLayer({
    seed:20261,count:1450,spanX:spanX*1.08,spanY:spanY*1.15,
    zMin:-620,zMax:-260,size:1.65*upp,opacity:.34,warmMix:.42
  });
  const mid=createDustLayer({
    seed:90210,count:1900,spanX,spanY,
    zMin:-230,zMax:70,size:2.6*upp,opacity:.78,warmMix:.78
  });
  const near=createDustLayer({
    seed:77113,count:360,spanX:spanX*.92,spanY:spanY*.92,
    zMin:180,zMax:430,size:4.5*upp,opacity:.30,warmMix:.58
  });

  far.rotation.z=THREE.MathUtils.degToRad(-7.5);
  mid.rotation.z=THREE.MathUtils.degToRad(-9);
  near.rotation.z=THREE.MathUtils.degToRad(-11);

  group.add(far,mid,near);

  const glowTexture=makeGlowTexture();
  const coreGlow=new THREE.Sprite(new THREE.SpriteMaterial({
    map:glowTexture,
    color:0xe8c6a6,
    transparent:true,
    opacity:.18,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
  coreGlow.scale.set(300*upp,170*upp,1);
  coreGlow.position.set(0,0,-65);
  group.add(coreGlow);

  const coolGlow=new THREE.Sprite(new THREE.SpriteMaterial({
    map:glowTexture,
    color:0x789fc2,
    transparent:true,
    opacity:.10,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
  coolGlow.scale.set(460*upp,115*upp,1);
  coolGlow.position.set(-90*upp,18*upp,-320);
  group.add(coolGlow);

  group.userData={far,mid,near,coreGlow,coolGlow};
  scene.add(group);
  return group;
}

function disposeObject(root){
  root?.traverse?.(o=>{
    o.geometry?.dispose?.();
    if(o.material){
      const mats=Array.isArray(o.material)?o.material:[o.material];
      mats.forEach(m=>{
        m.map?.dispose?.();
        m.dispose?.();
      });
    }
  });
}

function initMap(map){
  if(active?.map===map)return;
  active?.destroy?.();
  active=null;
  if(!map || map.clientWidth<1180)return;

  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({
      alpha:true,
      antialias:true,
      powerPreference:'high-performance'
    });
  }catch(e){
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;

  const layer=document.createElement('div');
  layer.className='r14-webgl-layer';
  layer.setAttribute('aria-hidden','true');
  layer.appendChild(renderer.domElement);
  map.prepend(layer);

  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x11283b,620,1540);
  const camera=new THREE.PerspectiveCamera(40,1,.1,2600);
  camera.position.set(0,0,900);
  camera.lookAt(0,0,0);

  scene.add(new THREE.HemisphereLight(0x9fc9e5,0x15212a,1.45));

  const key=new THREE.DirectionalLight(0xfff2e5,3.2);
  key.position.set(-240,260,520);
  scene.add(key);

  const rim=new THREE.DirectionalLight(0x76bde8,1.7);
  rim.position.set(300,-130,420);
  scene.add(rim);

  const agent=makePlanet('agentlab');
  const requirement=makePlanet('requirement');
  scene.add(agent,requirement);

  const agentLight=new THREE.PointLight(0x66c5ff,3.8,420,2);
  const reqLight=new THREE.PointLight(0xefad69,3.8,440,2);
  scene.add(agentLight,reqLight);

  let galaxy=null;
  let raf=0;
  let destroyed=false;
  let pointerX=0,pointerY=0;
  let camX=0,camY=0;
  let width=0,height=0;

  const agentAnchor=map.querySelector('[data-project="agentlab"]');
  const reqAnchor=map.querySelector('[data-project="requirement"]');
  const agentArt=agentAnchor?.querySelector('.project-art');
  const reqArt=reqAnchor?.querySelector('.project-art');

  if(!agentAnchor||!reqAnchor||!agentArt||!reqArt){
    renderer.dispose();
    layer.remove();
    return;
  }

  function unitsPerPixel(z=0){
    const dist=camera.position.z-z;
    const worldHeight=2*dist*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    return worldHeight/height;
  }

  function screenToWorld(px,py,z=0){
    const ndc=new THREE.Vector3((px/width)*2-1,-(py/height)*2+1,.5);
    ndc.unproject(camera);
    const dir=ndc.sub(camera.position).normalize();
    const d=(z-camera.position.z)/dir.z;
    return camera.position.clone().add(dir.multiplyScalar(d));
  }

  function place(group,art,z=0){
    const mr=map.getBoundingClientRect();
    const ar=art.getBoundingClientRect();
    const cx=ar.left+ar.width/2-mr.left;
    const cy=ar.top+ar.height/2-mr.top;
    const pos=screenToWorld(cx,cy,z);
    group.position.copy(pos);
    const s=(ar.width/2)*unitsPerPixel(z);
    group.userData.baseScale=s;
    group.scale.setScalar(s);
    return pos;
  }

  function syncLayout(){
    width=map.clientWidth;
    height=map.clientHeight;
    if(!width||!height)return;

    renderer.setSize(width,height,false);
    camera.aspect=width/height;
    camera.updateProjectionMatrix();

    if(galaxy){
      scene.remove(galaxy);
      disposeObject(galaxy);
    }
    galaxy=createGalaxy(scene,width,height,camera);
    galaxy.position.z=-80;

    const ap=place(agent,agentArt,120);
    const rp=place(requirement,reqArt,-35);
    agentLight.position.set(ap.x-40,ap.y+30,180);
    reqLight.position.set(rp.x+40,rp.y+35,180);
  }

  agentAnchor.addEventListener('mouseenter',()=>{agent.userData.hover=true});
  agentAnchor.addEventListener('mouseleave',()=>{agent.userData.hover=false});
  agentAnchor.addEventListener('focus',()=>{agent.userData.hover=true});
  agentAnchor.addEventListener('blur',()=>{agent.userData.hover=false});

  reqAnchor.addEventListener('mouseenter',()=>{requirement.userData.hover=true});
  reqAnchor.addEventListener('mouseleave',()=>{requirement.userData.hover=false});
  reqAnchor.addEventListener('focus',()=>{requirement.userData.hover=true});
  reqAnchor.addEventListener('blur',()=>{requirement.userData.hover=false});

  function onPointer(e){
    const r=map.getBoundingClientRect();
    pointerX=(e.clientX-r.left)/r.width-.5;
    pointerY=(e.clientY-r.top)/r.height-.5;
  }
  function resetPointer(){
    pointerX=0;
    pointerY=0;
  }
  map.addEventListener('pointermove',onPointer,{passive:true});
  map.addEventListener('pointerleave',resetPointer,{passive:true});

  const ro=new ResizeObserver(syncLayout);
  ro.observe(map);
  syncLayout();

  function animate(){
    if(destroyed)return;
    raf=requestAnimationFrame(animate);

    const aiPanel=map.querySelector('[data-cluster-panel="ai"]');
    const entPanel=map.querySelector('[data-cluster-panel="enterprise"]');
    agent.visible=aiPanel?.dataset.selected!=='false';
    requirement.visible=entPanel?.dataset.selected!=='false';

    const at=agent.userData.baseScale*(agent.userData.hover?1.075:1);
    const rt=requirement.userData.baseScale*(requirement.userData.hover?1.075:1);
    const as=THREE.MathUtils.lerp(agent.scale.x,at,.08);
    const rs=THREE.MathUtils.lerp(requirement.scale.x,rt,.08);
    agent.scale.setScalar(as);
    requirement.scale.setScalar(rs);

    if(!REDUCED){
      agent.userData.sphere.rotation.y+=.0018;
      agent.userData.sphere.rotation.x=.08+Math.sin(performance.now()*.00025)*.018;
      requirement.userData.sphere.rotation.y-=.00125;
      const tm=performance.now();
      galaxy.userData.far.position.x=THREE.MathUtils.lerp(galaxy.userData.far.position.x,-pointerX*3,.025);
      galaxy.userData.far.position.y=THREE.MathUtils.lerp(galaxy.userData.far.position.y,pointerY*2,.025);
      galaxy.userData.mid.position.x=THREE.MathUtils.lerp(galaxy.userData.mid.position.x,-pointerX*9,.035);
      galaxy.userData.mid.position.y=THREE.MathUtils.lerp(galaxy.userData.mid.position.y,pointerY*6,.035);
      galaxy.userData.near.position.x=THREE.MathUtils.lerp(galaxy.userData.near.position.x,-pointerX*24,.05);
      galaxy.userData.near.position.y=THREE.MathUtils.lerp(galaxy.userData.near.position.y,pointerY*16,.05);
      galaxy.userData.mid.rotation.z=THREE.MathUtils.degToRad(-9)+Math.sin(tm*.00007)*.014;
      galaxy.userData.near.rotation.z=THREE.MathUtils.degToRad(-11)+Math.sin(tm*.00011)*.02;

      camX=THREE.MathUtils.lerp(camX,pointerX*18,.04);
      camY=THREE.MathUtils.lerp(camY,-pointerY*12,.04);
      camera.position.x=camX;
      camera.position.y=camY;
      camera.lookAt(camX*.12,camY*.12,0);
    }

    renderer.render(scene,camera);
    if(!map.classList.contains('r14-webgl-ready')){
      map.classList.add('r14-webgl-ready');
    }
  }

  animate();

  function destroy(){
    destroyed=true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    map.removeEventListener('pointermove',onPointer);
    map.removeEventListener('pointerleave',resetPointer);
    map.classList.remove('r14-webgl-ready');
    disposeObject(scene);
    renderer.dispose();
    layer.remove();
  }

  active={map,destroy};
}

function scan(){
  const map=document.querySelector('.r14-static-fix #galaxy.constellation-map');
  if(!map){
    active?.destroy?.();
    active=null;
    return;
  }
  if(active?.map!==map)initMap(map);
}

function schedule(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{
    scheduled=false;
    scan();
  });
}

const app=document.querySelector('#app');
if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
window.addEventListener('resize',schedule,{passive:true});
window.addEventListener('popstate',schedule);
document.addEventListener('DOMContentLoaded',schedule);
schedule();