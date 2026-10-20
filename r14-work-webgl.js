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

function addGlow(group,color,size=3,opacity=.28){
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({
    map:makeGlowTexture(),color,transparent:true,opacity,
    blending:THREE.AdditiveBlending,depthWrite:false
  }));
  sprite.scale.set(size,size,size);
  sprite.position.z=-.35;
  group.add(sprite);
  return sprite;
}

function makeStylizedPlanetMaterial(kind){
  const agent=kind==='agentlab';
  const uniforms={
    uDark:{value:new THREE.Color(agent?0x13283a:0x2d3135)},
    uMid:{value:new THREE.Color(agent?0x365d76:0x756d66)},
    uLight:{value:new THREE.Color(agent?0xaedcf2:0xe8cfb5)},
    uRim:{value:new THREE.Color(agent?0x7bc8ed:0xf0d5b7)},
    uAccent:{value:new THREE.Color(agent?0x8f7fe8:0xc7ad94)},
    uTime:{value:0}
  };
  const vertexShader=[
    'varying vec3 vNormalV;',
    'varying vec3 vViewPos;',
    'varying vec3 vLocalPos;',
    'void main(){',
    '  vLocalPos=position;',
    '  vec4 mv=modelViewMatrix*vec4(position,1.0);',
    '  vViewPos=mv.xyz;',
    '  vNormalV=normalize(normalMatrix*normal);',
    '  gl_Position=projectionMatrix*mv;',
    '}'
  ].join('\n');
  const fragmentShader=(agent?[
    'uniform vec3 uDark;',
    'uniform vec3 uMid;',
    'uniform vec3 uLight;',
    'uniform vec3 uRim;',
    'uniform vec3 uAccent;',
    'uniform float uTime;',
    'varying vec3 vNormalV;',
    'varying vec3 vViewPos;',
    'varying vec3 vLocalPos;',
    'void main(){',
    '  vec3 n=normalize(vNormalV);',
    '  vec3 v=normalize(-vViewPos);',
    '  vec3 l=normalize(vec3(-0.45,0.58,0.85));',
    '  float diff=max(dot(n,l),0.0);',
    '  float fres=pow(1.0-max(dot(n,v),0.0),2.35);',
    '  float soft=0.45+0.55*diff;',
    '  vec3 col=mix(uDark,uMid,soft);',
    '  col=mix(col,uLight,pow(diff,3.2)*0.34);',
    '  float band=0.5+0.5*sin(vLocalPos.y*16.0+vLocalPos.x*4.5+uTime*0.12);',
    '  float band2=0.5+0.5*sin(vLocalPos.y*34.0-vLocalPos.z*5.0-uTime*0.08);',
    '  col+=uRim*fres*0.46;',
    '  col+=uAccent*(band*.035+band2*.018)*(0.35+fres);',
    '  float core=pow(max(dot(n,normalize(vec3(-0.2,0.18,1.0))),0.0),8.0);',
    '  col+=uLight*core*.18;',
    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ]:[
    'uniform vec3 uDark;',
    'uniform vec3 uMid;',
    'uniform vec3 uLight;',
    'uniform vec3 uRim;',
    'uniform vec3 uAccent;',
    'uniform float uTime;',
    'varying vec3 vNormalV;',
    'varying vec3 vViewPos;',
    'varying vec3 vLocalPos;',
    'void main(){',
    '  vec3 n=normalize(vNormalV);',
    '  vec3 v=normalize(-vViewPos);',
    '  vec3 l=normalize(vec3(-0.34,0.54,0.9));',
    '  float diff=max(dot(n,l),0.0);',
    '  float fres=pow(1.0-max(dot(n,v),0.0),2.65);',
    '  vec3 col=mix(uDark,uMid,0.42+0.48*diff);',
    '  col=mix(col,uLight,pow(diff,3.0)*0.31);',
    '  float subtle=0.5+0.5*sin(vLocalPos.y*12.0+vLocalPos.z*3.2);',
    '  col+=uAccent*subtle*.022;',
    '  float seam=1.0-smoothstep(0.018,0.055,abs(vLocalPos.x));',
    '  col=mix(col,uLight,seam*.58);',
    '  col+=uRim*fres*.34;',
    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ]).join('\n');
  return new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader,transparent:true,depthWrite:true});
}

function makeAtmosphere(kind){
  const agent=kind==='agentlab';
  return new THREE.Mesh(
    new THREE.SphereGeometry(1.055,72,72),
    new THREE.ShaderMaterial({
      uniforms:{uColor:{value:new THREE.Color(agent?0x77c7eb:0xe7c6a4)}},
      vertexShader:[
        'varying vec3 vNormalV;',
        'varying vec3 vViewPos;',
        'void main(){',
        '  vec4 mv=modelViewMatrix*vec4(position,1.0);',
        '  vViewPos=mv.xyz;',
        '  vNormalV=normalize(normalMatrix*normal);',
        '  gl_Position=projectionMatrix*mv;',
        '}'
      ].join('\n'),
      fragmentShader:[
        'uniform vec3 uColor;',
        'varying vec3 vNormalV;',
        'varying vec3 vViewPos;',
        'void main(){',
        '  vec3 n=normalize(vNormalV);',
        '  vec3 v=normalize(-vViewPos);',
        '  float f=pow(1.0-max(dot(n,v),0.0),2.1);',
        '  gl_FragColor=vec4(uColor,f*.23);',
        '}'
      ].join('\n'),
      side:THREE.BackSide,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
    })
  );
}

function makeOrbitArc(color,opts={}){
  const rx=opts.rx??1.3, ry=opts.ry??.34, start=opts.start??.22, end=opts.end??5.35;
  const rotation=opts.rotation??[1.15,0,0], opacity=opts.opacity??.3, dashed=opts.dashed??false;
  const curve=new THREE.EllipseCurve(0,0,rx,ry,start,end,false,0);
  const pts=curve.getPoints(140).map(p=>new THREE.Vector3(p.x,p.y,0));
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const mat=dashed
    ? new THREE.LineDashedMaterial({color,transparent:true,opacity,dashSize:.08,gapSize:.055,depthWrite:false})
    : new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending});
  const line=new THREE.Line(geo,mat);
  if(dashed)line.computeLineDistances();
  line.rotation.set(rotation[0],rotation[1],rotation[2]);
  return line;
}

function makePlanet(kind){
  const group=new THREE.Group();
  const mat=makeStylizedPlanetMaterial(kind);
  const sphere=new THREE.Mesh(new THREE.SphereGeometry(1,96,96),mat);
  sphere.rotation.x=.06;
  group.add(sphere);
  group.add(makeAtmosphere(kind));

  if(kind==='agentlab'){
    group.add(makeOrbitArc(0x91d5f4,{rx:1.46,ry:.31,start:.35,end:5.25,rotation:[1.12,.18,-.12],opacity:.34}));
    group.add(makeOrbitArc(0x9a8be5,{rx:1.12,ry:.47,start:1.1,end:4.35,rotation:[.74,-.48,.34],opacity:.13,dashed:true}));
    const sat=new THREE.Mesh(new THREE.SphereGeometry(.042,16,16),new THREE.MeshBasicMaterial({color:0xcdf1ff}));
    sat.position.set(-1.17,.28,.22);group.add(sat);
    const sat2=sat.clone();
    sat2.material=sat.material.clone();
    sat2.material.color.set(0xae9bea);
    sat2.scale.setScalar(.72);
    sat2.position.set(1.03,.51,.1);group.add(sat2);
    addGlow(group,0x6bbce7,2.85,.20);
  }else{
    group.add(makeOrbitArc(0xe9c6a3,{rx:1.43,ry:.30,start:.45,end:5.05,rotation:[1.16,-.18,.13],opacity:.28}));
    group.add(makeOrbitArc(0xbaa189,{rx:1.12,ry:.49,start:1.35,end:4.45,rotation:[.76,.42,-.23],opacity:.10,dashed:true}));
    for(const p of [[-1.12,.34,.12],[1.08,.16,.16],[.79,-.84,.12]]){
      const cube=new THREE.Mesh(new THREE.BoxGeometry(.075,.075,.075),new THREE.MeshBasicMaterial({color:0xd7b28e}));
      cube.position.set(p[0],p[1],p[2]);cube.rotation.z=.35;group.add(cube);
    }
    addGlow(group,0xc9a17d,2.9,.18);
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

  const key=new THREE.DirectionalLight(0xf4ede6,2.35);
  key.position.set(-240,260,520);
  scene.add(key);

  const rim=new THREE.DirectionalLight(0x8bb8d0,1.15);
  rim.position.set(300,-130,420);
  scene.add(rim);

  const agent=makePlanet('agentlab');
  const requirement=makePlanet('requirement');
  scene.add(agent,requirement);

  const agentLight=new THREE.PointLight(0x7fc7ea,2.1,390,2);
  const reqLight=new THREE.PointLight(0xd3b18f,2.0,400,2);
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
      agent.userData.sphere.rotation.y+=.00115;
      agent.userData.sphere.material.uniforms.uTime.value=performance.now()*.001;
      agent.userData.sphere.rotation.x=.06+Math.sin(performance.now()*.00022)*.012;
      requirement.userData.sphere.rotation.y-=.0008;
      requirement.userData.sphere.material.uniforms.uTime.value=performance.now()*.001;
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