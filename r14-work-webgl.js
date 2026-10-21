import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

/*
  R14.1 unified WebGL Work scene.
  Visual only. Existing project ids, grouping, order, hrefs, filters and case studies stay unchanged.
*/

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = null;
let scheduled = false;

const PROJECTS = {
  agentlab:      {cluster:'ai',         kind:'agent',      color:0x7fc9ef, z:120, spin:.0010},
  benchmark:     {cluster:'ai',         kind:'benchmark',  color:0x9fd8f2, z:-35, spin:.0016},
  'content-qa':  {cluster:'ai',         kind:'crystal',    color:0x9f86e9, z:10, spin:-.0013},
  requirement:   {cluster:'enterprise', kind:'requirement',color:0xe3c1a0, z:72, spin:-.0008},
  'task-summary':{cluster:'enterprise', kind:'diamond',    color:0xe3b889, z:-30, spin:.0014},
  dashboard:     {cluster:'enterprise', kind:'radar',      color:0xd7ae85, z:18, spin:.0007},
  training:      {cluster:'enterprise', kind:'document',   color:0xcfa47f, z:-18, spin:-.0010},
  airbnb:        {cluster:'data',       kind:'airbnb',     color:0x8ed8bb, z:80, spin:.0009},
  sp500:         {cluster:'data',       kind:'market',     color:0x98d6b6, z:-22, spin:.0012},
  minecraft:     {cluster:'data',       kind:'network',    color:0x8ccbad, z:20, spin:-.0012},
  deloitte:      {cluster:'data',       kind:'poly',       color:0x9bcfb9, z:-42, spin:.0008},
  character:     {cluster:'creative',   kind:'character',  color:0xc49ae9, z:92, spin:-.00075},
  liferpg:       {cluster:'creative',   kind:'portal',     color:0xb98bde, z:-8, spin:.0011}
};

function seeded(seed){
  let s=seed>>>0;
  return function(){
    s=(s*1664525+1013904223)>>>0;
    return s/4294967296;
  };
}

function makeGlowTexture(){
  const c=document.createElement('canvas');
  c.width=c.height=256;
  const x=c.getContext('2d');
  const g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,.95)');
  g.addColorStop(.15,'rgba(255,255,255,.5)');
  g.addColorStop(.42,'rgba(255,255,255,.15)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;
  x.fillRect(0,0,256,256);
  const t=new THREE.CanvasTexture(c);
  t.colorSpace=THREE.SRGBColorSpace;
  return t;
}

const GLOW = makeGlowTexture();

function physical(color,opts={}){
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness:opts.roughness??.38,
    metalness:opts.metalness??.04,
    clearcoat:opts.clearcoat??.55,
    clearcoatRoughness:opts.clearcoatRoughness??.34,
    transparent:opts.transparent??true,
    opacity:opts.opacity??.88,
    emissive:opts.emissive??new THREE.Color(color).multiplyScalar(.13),
    emissiveIntensity:opts.emissiveIntensity??.28,
    side:THREE.DoubleSide,
    depthWrite:opts.depthWrite??true
  });
}

function glowSprite(color,size=2.7,opacity=.16){
  const s=new THREE.Sprite(new THREE.SpriteMaterial({
    map:GLOW,
    color,
    transparent:true,
    opacity,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
  s.scale.set(size,size,size);
  return s;
}

function wireShell(geometry,color,opacity=.11,scale=1.05){
  const m=new THREE.Mesh(
    geometry.clone(),
    new THREE.MeshBasicMaterial({
      color,
      wireframe:true,
      transparent:true,
      opacity,
      depthWrite:false,
      blending:THREE.AdditiveBlending
    })
  );
  m.scale.setScalar(scale);
  return m;
}

function arc(color,rx,ry,rot,opacity=.22,dashed=false,start=.25,end=5.2){
  const curve=new THREE.EllipseCurve(0,0,rx,ry,start,end,false,0);
  const pts=curve.getPoints(120).map(p=>new THREE.Vector3(p.x,p.y,0));
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const mat=dashed
    ? new THREE.LineDashedMaterial({color,transparent:true,opacity,dashSize:.08,gapSize:.055,depthWrite:false})
    : new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending});
  const line=new THREE.Line(geo,mat);
  if(dashed) line.computeLineDistances();
  line.rotation.set(rot[0],rot[1],rot[2]);
  return line;
}

function addSatellites(group,color,items){
  items.forEach(item=>{
    const mesh=new THREE.Mesh(
      new THREE.SphereGeometry(item.r||.035,14,14),
      new THREE.MeshBasicMaterial({color,transparent:true,opacity:item.o||.9})
    );
    mesh.position.set(item.x,item.y,item.z||.1);
    group.add(mesh);
  });
}

function makeAgent(){
  const g=new THREE.Group();
  const geo=new THREE.SphereGeometry(1,72,72);
  const core=new THREE.Mesh(geo,physical(0x365f79,{roughness:.46,opacity:.92,emissive:0x102b3c,emissiveIntensity:.42}));
  g.add(core);
  const inner=new THREE.Mesh(new THREE.SphereGeometry(.72,48,48),new THREE.MeshBasicMaterial({
    color:0x6bb8df,transparent:true,opacity:.08,depthWrite:false,blending:THREE.AdditiveBlending
  }));
  g.add(inner);
  g.add(wireShell(new THREE.IcosahedronGeometry(1,3),0x8dd3f4,.08,1.035));
  g.add(arc(0x9edcf7,1.40,.31,[1.12,.16,-.12],.30,false));
  g.add(arc(0x9789df,1.12,.47,[.73,-.48,.33],.11,true,1.0,4.45));
  addSatellites(g,0xd4f1ff,[{x:-1.13,y:.26,r:.041},{x:1.03,y:.48,r:.029,o:.75}]);
  const halo=glowSprite(0x67bce7,2.72,.16);
  halo.position.z=-.3;
  g.add(halo);
  g.userData.core=core;
  return g;
}

function makeRequirement(){
  const g=new THREE.Group();
  const core=new THREE.Mesh(
    new THREE.IcosahedronGeometry(1,5),
    physical(0x777069,{roughness:.58,opacity:.94,clearcoat:.34,emissive:0x2f2924,emissiveIntensity:.28})
  );
  g.add(core);
  const seam=new THREE.Mesh(
    new THREE.BoxGeometry(.022,1.78,.035),
    new THREE.MeshBasicMaterial({color:0xf0d2b3,transparent:true,opacity:.68,depthWrite:false})
  );
  seam.position.z=1.0;
  g.add(seam);
  g.add(arc(0xe8c6a6,1.38,.30,[1.14,-.15,.13],.25,false,.35,5.05));
  g.add(arc(0xbda58e,1.10,.47,[.76,.40,-.22],.085,true,1.25,4.45));
  for(const p of [[-1.12,.31,.13],[1.08,.15,.15],[.77,-.83,.12]]){
    const c=new THREE.Mesh(new THREE.BoxGeometry(.07,.07,.07),new THREE.MeshBasicMaterial({color:0xd8b795}));
    c.position.set(p[0],p[1],p[2]);
    c.rotation.z=.35;
    g.add(c);
  }
  const halo=glowSprite(0xc4a382,2.72,.13);
  halo.position.z=-.3;
  g.add(halo);
  g.userData.core=core;
  return g;
}

function makeAirbnb(){
  const g=new THREE.Group();
  const core=new THREE.Mesh(
    new THREE.SphereGeometry(1,64,64),
    physical(0x4d8c76,{roughness:.5,opacity:.90,emissive:0x153a31,emissiveIntensity:.35})
  );
  g.add(core);
  g.add(wireShell(new THREE.SphereGeometry(1,24,16),0xa6dfc4,.065,1.025));
  const xs=[-.52,-.34,-.14,.08,.29,.49];
  const hs=[.32,.52,.38,.66,.44,.58];
  xs.forEach((x,i)=>{
    const b=new THREE.Mesh(
      new THREE.BoxGeometry(.085,hs[i],.075),
      new THREE.MeshBasicMaterial({color:0xb9ead1,transparent:true,opacity:.38})
    );
    b.position.set(x,-.18+hs[i]/2,.92);
    g.add(b);
  });
  g.add(arc(0xa6e5c8,1.34,.30,[1.18,.04,-.18],.22,false));
  addSatellites(g,0xbaf1d8,[{x:-1.02,y:-.28,r:.033},{x:1.0,y:.44,r:.028,o:.65}]);
  g.add(glowSprite(0x62b895,2.55,.13));
  g.userData.core=core;
  return g;
}

function makeCharacter(){
  const g=new THREE.Group();
  const geo=new THREE.IcosahedronGeometry(1,2);
  const core=new THREE.Mesh(
    geo,
    physical(0x755b9d,{roughness:.34,opacity:.90,clearcoat:.8,emissive:0x281b3d,emissiveIntensity:.42})
  );
  g.add(core);
  g.add(wireShell(geo,0xd5b4ef,.07,1.035));
  const inner=new THREE.Mesh(
    new THREE.IcosahedronGeometry(.55,1),
    new THREE.MeshBasicMaterial({color:0xb17ed7,transparent:true,opacity:.12,depthWrite:false,blending:THREE.AdditiveBlending})
  );
  g.add(inner);
  g.add(arc(0xcfa7eb,1.32,.29,[1.08,.15,.48],.23,true,.3,5.0));
  g.add(glowSprite(0x9f69cf,2.6,.15));
  g.userData.core=core;
  return g;
}

function makeBenchmark(){
  const g=new THREE.Group();
  const geo=new THREE.IcosahedronGeometry(1,1);
  const core=new THREE.Mesh(geo,physical(0x74a9c5,{roughness:.3,opacity:.62,clearcoat:.65,emissive:0x17384b,emissiveIntensity:.32,depthWrite:false}));
  g.add(core);
  g.add(wireShell(geo,0xc3ebfb,.24,1.025));
  g.add(glowSprite(0x74bde0,2.05,.10));
  g.userData.core=core;
  return g;
}

function makeCrystal(){
  const g=new THREE.Group();
  const geo=new THREE.OctahedronGeometry(1,1);
  const core=new THREE.Mesh(geo,physical(0x756bb0,{roughness:.28,opacity:.78,clearcoat:.85,emissive:0x291e48,emissiveIntensity:.36,depthWrite:false}));
  g.add(core);
  g.add(wireShell(geo,0xb9d9f0,.10,1.025));
  g.userData.core=core;
  return g;
}

function makeDiamond(){
  const g=new THREE.Group();
  const geo=new THREE.OctahedronGeometry(1,0);
  const core=new THREE.Mesh(geo,physical(0xb48762,{roughness:.42,opacity:.90,emissive:0x382419,emissiveIntensity:.25}));
  g.add(core);
  addSatellites(g,0xe7bd91,[{x:-1.18,y:.22,r:.05},{x:1.13,y:.38,r:.04},{x:1.03,y:-.62,r:.035}]);
  g.userData.core=core;
  return g;
}

function makeRadar(){
  const g=new THREE.Group();
  const disc=new THREE.Mesh(
    new THREE.CircleGeometry(.92,64),
    new THREE.MeshBasicMaterial({color:0x7d6655,transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false})
  );
  g.add(disc);
  [1,.68,.36].forEach((r,i)=>{
    const tor=new THREE.Mesh(
      new THREE.TorusGeometry(r,.012,6,96),
      new THREE.MeshBasicMaterial({color:0xd7b28d,transparent:true,opacity:.32-i*.06,depthWrite:false})
    );
    g.add(tor);
  });
  const sweep=new THREE.Mesh(
    new THREE.CircleGeometry(.88,48,0,.55),
    new THREE.MeshBasicMaterial({color:0xe6c19a,transparent:true,opacity:.13,side:THREE.DoubleSide,depthWrite:false})
  );
  sweep.position.z=.01;
  g.add(sweep);
  g.userData.core=g;
  return g;
}

function makeDocument(){
  const g=new THREE.Group();
  const core=new THREE.Mesh(
    new THREE.DodecahedronGeometry(.92,0),
    physical(0x9b775d,{roughness:.48,opacity:.88,emissive:0x32241c,emissiveIntensity:.24})
  );
  g.add(core);
  [-.25,0,.25].forEach(y=>{
    const line=new THREE.Mesh(
      new THREE.BoxGeometry(.9,.026,.025),
      new THREE.MeshBasicMaterial({color:0xe0c1a2,transparent:true,opacity:.45})
    );
    line.position.set(0,y,.76);
    g.add(line);
  });
  g.userData.core=core;
  return g;
}

function makeMarket(){
  const g=new THREE.Group();
  const core=new THREE.Mesh(
    new THREE.SphereGeometry(1,48,48),
    physical(0x4f856f,{roughness:.52,opacity:.86,emissive:0x18382f,emissiveIntensity:.30})
  );
  g.add(core);
  const xs=[-.52,-.34,-.16,.02,.2,.38,.56];
  const hs=[.18,.38,.28,.55,.42,.68,.58];
  xs.forEach((x,i)=>{
    const b=new THREE.Mesh(
      new THREE.BoxGeometry(.07,hs[i],.05),
      new THREE.MeshBasicMaterial({color:0xb6e5cb,transparent:true,opacity:.48})
    );
    b.position.set(x,-.25+hs[i]/2,.94);
    g.add(b);
  });
  g.userData.core=core;
  return g;
}

function makeNetwork(){
  const g=new THREE.Group();
  const pts=[[-.55,.45,0],[.55,.38,.05],[.35,-.56,.08],[-.48,-.44,.03],[0,0,.2]];
  pts.forEach((p,i)=>{
    const m=new THREE.Mesh(
      new THREE.SphereGeometry(i===4?.11:.065,12,12),
      new THREE.MeshBasicMaterial({color:i===4?0xd9f6e8:0xaad8bf})
    );
    m.position.set(p[0],p[1],p[2]);
    g.add(m);
  });
  [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]].forEach(pair=>{
    const a=new THREE.Vector3(...pts[pair[0]]);
    const b=new THREE.Vector3(...pts[pair[1]]);
    const geo=new THREE.BufferGeometry().setFromPoints([a,b]);
    g.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x92c9ad,transparent:true,opacity:.28})));
  });
  g.add(glowSprite(0x68aa8b,1.85,.08));
  g.userData.core=g;
  return g;
}

function makePoly(){
  const g=new THREE.Group();
  const geo=new THREE.OctahedronGeometry(1,0);
  const core=new THREE.Mesh(geo,physical(0x709f8c,{roughness:.34,opacity:.56,clearcoat:.8,emissive:0x18352e,emissiveIntensity:.24,depthWrite:false}));
  g.add(core);
  g.add(wireShell(geo,0xbbe7d1,.10,1.03));
  g.userData.core=core;
  return g;
}

function makePortal(){
  const g=new THREE.Group();
  [1,.72,.44].forEach((r,i)=>{
    const tor=new THREE.Mesh(
      new THREE.TorusGeometry(r,.035-i*.008,12,110),
      new THREE.MeshBasicMaterial({color:i===0?0xb98bd9:0xd6b0ed,transparent:true,opacity:.46-i*.08,depthWrite:false,blending:THREE.AdditiveBlending})
    );
    g.add(tor);
  });
  g.add(glowSprite(0xa86bcf,2.0,.12));
  g.userData.core=g;
  return g;
}

function makeObject(kind){
  if(kind==='agent') return makeAgent();
  if(kind==='requirement') return makeRequirement();
  if(kind==='airbnb') return makeAirbnb();
  if(kind==='character') return makeCharacter();
  if(kind==='benchmark') return makeBenchmark();
  if(kind==='crystal') return makeCrystal();
  if(kind==='diamond') return makeDiamond();
  if(kind==='radar') return makeRadar();
  if(kind==='document') return makeDocument();
  if(kind==='market') return makeMarket();
  if(kind==='network') return makeNetwork();
  if(kind==='poly') return makePoly();
  if(kind==='portal') return makePortal();
  return makeCrystal();
}

function makeNebula(color,opacity=.14,scaleX=3.2,scaleY=2.0){
  const s=new THREE.Sprite(new THREE.SpriteMaterial({
    map:GLOW,
    color,
    transparent:true,
    opacity,
    blending:THREE.AdditiveBlending,
    depthWrite:false
  }));
  s.scale.set(scaleX,scaleY,1);
  return s;
}

function makeDust(seed,count,spanX,spanY,zMin,zMax,size,opacity,warmMix){
  const rand=seeded(seed);
  const positions=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const warm=new THREE.Color(0xe6c7aa);
  const cool=new THREE.Color(0x86a8c3);
  for(let i=0;i<count;i++){
    const t=rand()*2-1;
    const arm=Math.sin(t*Math.PI*2.12)*.45;
    positions[i*3]=t*spanX+(rand()-.5)*spanX*.15;
    positions[i*3+1]=arm*spanY+(rand()-.5)*spanY*1.06;
    positions[i*3+2]=zMin+rand()*(zMax-zMin);
    const mix=Math.min(1,Math.max(0,warmMix*(.45+.55*Math.cos(t*Math.PI))));
    const c=cool.clone().lerp(warm,mix);
    colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  return new THREE.Points(geo,new THREE.PointsMaterial({
    size,
    sizeAttenuation:true,
    transparent:true,
    opacity,
    vertexColors:true,
    blending:THREE.AdditiveBlending,
    depthWrite:false,
    fog:true
  }));
}

function makeGalaxy(scene,w,h,camera){
  const group=new THREE.Group();
  const wh=2*camera.position.z*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  const upp=wh/h;
  const sx=w*.56*upp, sy=76*upp;
  const far=makeDust(21,1000,sx*1.08,sy*1.1,-650,-280,1.5*upp,.25,.38);
  const mid=makeDust(91,1350,sx,sy,-240,60,2.45*upp,.66,.70);
  const near=makeDust(77,190,sx*.92,sy*.9,170,420,4.2*upp,.21,.50);
  far.rotation.z=THREE.MathUtils.degToRad(-8);
  mid.rotation.z=THREE.MathUtils.degToRad(-9.5);
  near.rotation.z=THREE.MathUtils.degToRad(-11);
  group.add(far,mid,near);

  const core=makeNebula(0xd8b99d,.12,280*upp,145*upp);
  core.position.set(0,0,-90);
  group.add(core);

  group.userData={far,mid,near};
  scene.add(group);
  return group;
}

function dispose(root){
  root?.traverse?.(o=>{
    o.geometry?.dispose?.();
    if(o.material){
      const mats=Array.isArray(o.material)?o.material:[o.material];
      mats.forEach(m=>{m.map?.dispose?.();m.dispose?.();});
    }
  });
}

function init(map){
  if(active?.map===map) return;
  active?.destroy?.();
  active=null;
  if(!map || map.clientWidth<1180) return;

  const anchors={};
  Object.keys(PROJECTS).forEach(id=>{
    const a=map.querySelector('[data-project="'+id+'"]');
    const art=a?.querySelector('.project-art');
    if(a&&art) anchors[id]={a,art};
  });
  if(!anchors.agentlab || !anchors.requirement || !anchors.airbnb || !anchors.character) return;

  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  }catch(e){return;}

  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;

  const layer=document.createElement('div');
  layer.className='r14-webgl-layer';
  layer.setAttribute('aria-hidden','true');
  layer.appendChild(renderer.domElement);
  map.prepend(layer);
  map.classList.add('r14-webgl-ready');

  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x11283b,660,1580);
  const camera=new THREE.PerspectiveCamera(42,1,.1,2600);
  camera.position.set(0,0,900);
  camera.lookAt(0,0,0);

  scene.add(new THREE.HemisphereLight(0xb7ccda,0x15212a,1.35));
  const key=new THREE.DirectionalLight(0xf2ebe3,1.75);
  key.position.set(-240,260,520);
  scene.add(key);
  const rim=new THREE.DirectionalLight(0x89adc2,.9);
  rim.position.set(300,-130,420);
  scene.add(rim);

  const objects={};
  Object.entries(PROJECTS).forEach(([id,cfg])=>{
    const g=makeObject(cfg.kind);
    g.userData.id=id;
    g.userData.cluster=cfg.cluster;
    g.userData.spin=cfg.spin;
    g.userData.baseScale=1;
    g.userData.hover=false;
    objects[id]=g;
    scene.add(g);

    const a=anchors[id]?.a;
    if(a){
      a.addEventListener('mouseenter',()=>g.userData.hover=true);
      a.addEventListener('mouseleave',()=>g.userData.hover=false);
      a.addEventListener('focus',()=>g.userData.hover=true);
      a.addEventListener('blur',()=>g.userData.hover=false);
    }
  });

  const clusterColors={ai:0x4f8fc0,enterprise:0xb88d67,data:0x4f9a7e,creative:0x845cb1};
  const clusterNebula={};

  let galaxy=null;
  let width=0,height=0;
  let pointerX=0,pointerY=0,camX=0,camY=0;
  let raf=0,destroyed=false;

  function unitsPerPixel(z){
    const d=camera.position.z-z;
    return 2*d*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/height;
  }

  function screenToWorld(px,py,z){
    const v=new THREE.Vector3((px/width)*2-1,-(py/height)*2+1,.5);
    v.unproject(camera);
    const dir=v.sub(camera.position).normalize();
    const dist=(z-camera.position.z)/dir.z;
    return camera.position.clone().add(dir.multiplyScalar(dist));
  }

  function place(id){
    const cfg=PROJECTS[id];
    const art=anchors[id]?.art;
    if(!art) return null;
    const mr=map.getBoundingClientRect();
    const r=art.getBoundingClientRect();
    const p=screenToWorld(r.left+r.width/2-mr.left,r.top+r.height/2-mr.top,cfg.z);
    const g=objects[id];
    g.position.copy(p);
    const s=(r.width/2)*unitsPerPixel(cfg.z);
    g.userData.baseScale=s;
    g.scale.setScalar(s);
    return p;
  }

  function sync(){
    width=map.clientWidth;height=map.clientHeight;
    if(!width||!height) return;
    renderer.setSize(width,height,false);
    camera.aspect=width/height;
    camera.updateProjectionMatrix();

    if(galaxy){scene.remove(galaxy);dispose(galaxy);}
    galaxy=makeGalaxy(scene,width,height,camera);

    const mainPos={};
    Object.keys(PROJECTS).forEach(id=>{
      const p=place(id);
      if(id==='agentlab') mainPos.ai=p;
      if(id==='requirement') mainPos.enterprise=p;
      if(id==='airbnb') mainPos.data=p;
      if(id==='character') mainPos.creative=p;
    });

    Object.values(clusterNebula).forEach(n=>{scene.remove(n);n.material?.dispose?.();});
    Object.keys(clusterNebula).forEach(k=>delete clusterNebula[k]);

    Object.entries(mainPos).forEach(([cluster,p])=>{
      if(!p) return;
      const n=makeNebula(clusterColors[cluster],cluster==='creative'?.14:.12,220*unitsPerPixel(-90),140*unitsPerPixel(-90));
      n.position.set(p.x+(cluster==='enterprise'||cluster==='creative'?-18:18)*unitsPerPixel(-90),p.y,-95);
      scene.add(n);
      clusterNebula[cluster]=n;
    });
  }

  function onPointer(e){
    const r=map.getBoundingClientRect();
    pointerX=(e.clientX-r.left)/r.width-.5;
    pointerY=(e.clientY-r.top)/r.height-.5;
  }
  function resetPointer(){pointerX=0;pointerY=0;}
  map.addEventListener('pointermove',onPointer,{passive:true});
  map.addEventListener('pointerleave',resetPointer,{passive:true});

  const ro=new ResizeObserver(sync);
  ro.observe(map);
  sync();

  function animate(){
    if(destroyed) return;
    raf=requestAnimationFrame(animate);

    Object.entries(objects).forEach(([id,g])=>{
      const cfg=PROJECTS[id];
      const panel=map.querySelector('[data-cluster-panel="'+cfg.cluster+'"]');
      g.visible=panel?.dataset.selected!=='false';
      const target=g.userData.baseScale*(g.userData.hover?1.065:1);
      const s=THREE.MathUtils.lerp(g.scale.x,target,.075);
      g.scale.setScalar(s);
      if(!REDUCED){
        if(g.userData.core?.rotation) g.userData.core.rotation.y+=cfg.spin;
        g.rotation.z+=cfg.spin*.18;
      }
    });

    Object.entries(clusterNebula).forEach(([cluster,n])=>{
      const panel=map.querySelector('[data-cluster-panel="'+cluster+'"]');
      n.visible=panel?.dataset.selected!=='false';
    });

    if(!REDUCED){
      galaxy.userData.far.position.x=THREE.MathUtils.lerp(galaxy.userData.far.position.x,-pointerX*3,.025);
      galaxy.userData.far.position.y=THREE.MathUtils.lerp(galaxy.userData.far.position.y,pointerY*2,.025);
      galaxy.userData.mid.position.x=THREE.MathUtils.lerp(galaxy.userData.mid.position.x,-pointerX*9,.035);
      galaxy.userData.mid.position.y=THREE.MathUtils.lerp(galaxy.userData.mid.position.y,pointerY*6,.035);
      galaxy.userData.near.position.x=THREE.MathUtils.lerp(galaxy.userData.near.position.x,-pointerX*24,.05);
      galaxy.userData.near.position.y=THREE.MathUtils.lerp(galaxy.userData.near.position.y,pointerY*16,.05);
      camX=THREE.MathUtils.lerp(camX,pointerX*22,.04);
      camY=THREE.MathUtils.lerp(camY,-pointerY*14,.04);
      camera.position.x=camX;
      camera.position.y=camY;
      camera.lookAt(camX*.1,camY*.1,0);
    }

    renderer.render(scene,camera);
  }
  animate();

  function destroy(){
    destroyed=true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    map.removeEventListener('pointermove',onPointer);
    map.removeEventListener('pointerleave',resetPointer);
    map.classList.remove('r14-webgl-ready');
    dispose(scene);
    renderer.dispose();
    layer.remove();
  }

  active={map,destroy};
}

function scan(){
  const map=document.querySelector('.r14-static-fix #galaxy.constellation-map');
  if(!map){active?.destroy?.();active=null;return;}
  if(active?.map!==map) init(map);
}
function schedule(){
  if(scheduled) return;
  scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;scan();});
}

const app=document.querySelector('#app');
if(app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
window.addEventListener('resize',schedule,{passive:true});
window.addEventListener('popstate',schedule);
document.addEventListener('DOMContentLoaded',schedule);
schedule();
