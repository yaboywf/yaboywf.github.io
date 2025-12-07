import{A as j,y as N,d as G,x as W,B as X,e as Y,M as k,a as J}from"./vendor-Du6H7GyP.js";const K=["#ffffff","#ffffff","#ffffff"],Q=t=>{t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(s=>s+s).join(""));const i=parseInt(t,16),u=(i>>16&255)/255,l=(i>>8&255)/255,r=(i&255)/255;return[u,l,r]},U=`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`,V=`
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`,$=({particleCount:t=200,particleSpread:i=10,speed:u=.1,particleColors:l,moveParticlesOnHover:r=!1,particleHoverFactor:s=1,alphaParticles:z=!1,particleBaseSize:M=100,sizeRandomness:P=1,cameraDistance:R=20})=>{const S=j(null),v=j({x:0,y:0});return N(()=>{const a=S.current;if(!a)return;const h=new G({depth:!1,alpha:!0}),n=h.gl;a.appendChild(n.canvas),n.clearColor(0,0,0,0);const p=new W(n,{fov:15});p.position.set(0,0,R);const g=()=>{const e=a.clientWidth,o=a.clientHeight;h.setSize(e,o),p.perspective({aspect:n.canvas.width/n.canvas.height})};window.addEventListener("resize",g,!1),g();const C=e=>{const o=a.getBoundingClientRect(),m=(e.clientX-o.left)/o.width*2-1,c=-((e.clientY-o.top)/o.height*2-1);v.current={x:m,y:c}};r&&a.addEventListener("mousemove",C);const f=t,T=new Float32Array(f*3),A=new Float32Array(f*4),F=new Float32Array(f*3),b=l&&l.length>0?l:K;for(let e=0;e<f;e++){let o,m,c,x;do o=Math.random()*2-1,m=Math.random()*2-1,c=Math.random()*2-1,x=o*o+m*m+c*c;while(x>1||x===0);const w=Math.cbrt(Math.random());T.set([o*w,m*w,c*w],e*3),A.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4);const q=Q(b[Math.floor(Math.random()*b.length)]);F.set(q,e*3)}const I=new X(n,{position:{size:3,data:T},random:{size:4,data:A},color:{size:3,data:F}}),_=new Y(n,{vertex:U,fragment:V,uniforms:{uTime:{value:0},uSpread:{value:i},uBaseSize:{value:M},uSizeRandomness:{value:P},uAlphaParticles:{value:z?1:0}},transparent:!0,depthTest:!1}),d=new k(n,{mode:n.POINTS,geometry:I,program:_});let y,B=performance.now(),E=0;const L=e=>{y=requestAnimationFrame(L);const o=e-B;B=e,E+=o*u,_.uniforms.uTime.value=E*.001,r?(d.position.x=-v.current.x*s,d.position.y=-v.current.y*s):(d.position.x=0,d.position.y=0),h.render({scene:d,camera:p})};return y=requestAnimationFrame(L),()=>{window.removeEventListener("resize",g),r&&a.removeEventListener("mousemove",C),cancelAnimationFrame(y),a.contains(n.canvas)&&a.removeChild(n.canvas)}},[t,i,u,r,s,z,M,P,R]),J("div",{ref:S,className:"particles-container"})};export{$ as P};
