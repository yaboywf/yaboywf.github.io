import{A as L,y as R,b as W,d as X,G as $,e as Y,M as q,u as e,f as H,T as O,m as J,g as K,h as V}from"./vendor-CxjmNaBP.js";/* empty css                  *//* empty css            */const Z=["#ffffff","#ffffff","#ffffff"],ee=t=>{t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(c=>c+c).join(""));const l=parseInt(t,16),m=(l>>16&255)/255,n=(l>>8&255)/255,a=(l&255)/255;return[m,n,a]},te=`
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
`,ne=`
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
`,oe=({particleCount:t=200,particleSpread:l=10,speed:m=.1,particleColors:n,moveParticlesOnHover:a=!1,particleHoverFactor:c=1,alphaParticles:s=!1,particleBaseSize:o=100,sizeRandomness:g=1,cameraDistance:i=20})=>{const C=L(null),d=L({x:0,y:0});return R(()=>{const p=C.current;if(!p)return;const _=new W({depth:!1,alpha:!0}),r=_.gl;p.appendChild(r.canvas),r.clearColor(0,0,0,0);const x=new X(r,{fov:15});x.position.set(0,0,i);const M=()=>{const h=p.clientWidth,v=p.clientHeight;_.setSize(h,v),x.perspective({aspect:r.canvas.width/r.canvas.height})};window.addEventListener("resize",M,!1),M();const b=h=>{const v=p.getBoundingClientRect(),N=(h.clientX-v.left)/v.width*2-1,z=-((h.clientY-v.top)/v.height*2-1);d.current={x:N,y:z}};a&&p.addEventListener("mousemove",b);const w=t,u=new Float32Array(w*3),f=new Float32Array(w*4),T=new Float32Array(w*3),y=n&&n.length>0?n:Z;for(let h=0;h<w;h++){let v,N,z,A;do v=Math.random()*2-1,N=Math.random()*2-1,z=Math.random()*2-1,A=v*v+N*N+z*z;while(A>1||A===0);const k=Math.cbrt(Math.random());u.set([v*k,N*k,z*k],h*3),f.set([Math.random(),Math.random(),Math.random(),Math.random()],h*4);const Q=ee(y[Math.floor(Math.random()*y.length)]);T.set(Q,h*3)}const P=new $(r,{position:{size:3,data:u},random:{size:4,data:f},color:{size:3,data:T}}),I=new Y(r,{vertex:te,fragment:ne,uniforms:{uTime:{value:0},uSpread:{value:l},uBaseSize:{value:o},uSizeRandomness:{value:g},uAlphaParticles:{value:s?1:0}},transparent:!0,depthTest:!1}),S=new q(r,{mode:r.POINTS,geometry:P,program:I});let E,B=performance.now(),j=0;const G=h=>{E=requestAnimationFrame(G);const v=h-B;B=h,j+=v*m,I.uniforms.uTime.value=j*.001,a?(S.position.x=-d.current.x*c,S.position.y=-d.current.y*c):(S.position.x=0,S.position.y=0),_.render({scene:S,camera:x})};return E=requestAnimationFrame(G),()=>{window.removeEventListener("resize",M),a&&p.removeEventListener("mousemove",b),cancelAnimationFrame(E),p.contains(r.canvas)&&p.removeChild(r.canvas)}},[t,l,m,a,c,s,o,g,i]),e("div",{ref:C,className:"particles-container"})},re=()=>e("div",{className:"intro-container",children:[e(oe,{particleColors:["#ffffff","#ffffff"],particleCount:200,particleSpread:10,speed:.5,particleBaseSize:100,moveParticlesOnHover:!0,alphaParticles:!0,disableRotation:!1}),e("div",{className:"intro-section",children:[e("div",{id:"pfp",style:{background:"url('/images/pfp.webp') center/cover no-repeat"}}),e("div",{id:"intro",children:[e("h3",{children:"Hello, I'm"}),e("h1",{children:"Dylan Yeo"}),e("p",{children:"A passionate IT student specialising in web development and modern software engineering."})]})]})]}),ie="_card_1n76s_1",ae="_content_1n76s_12",U={card:ie,content:ae},D=({title:t,children:l})=>e("div",{className:U.card,children:[e("h3",{children:t}),e("div",{className:U.content,children:l})]}),se=()=>e("div",{className:"subintro-container",children:[e(D,{title:"Education",children:[e("div",{className:"education-container",children:[e("img",{src:"/images/tp.webp",alt:"Temasek Polytechnic Logo"}),e("p",{children:["Temasek Polytechnic ",e("br",{}),e("span",{children:"2024 - 2027"})]}),e("p",{children:"Diploma in Information Technology"})]}),e("div",{className:"education-container",children:[e("img",{src:"/images/gm.webp",alt:"Geylang Methodist School Logo"}),e("p",{children:["Geylang Methodist School (Secondary) ",e("br",{}),e("span",{children:"2022 - 2024"})]}),e("p",{children:"GCE Ordinary Level | 7 Credits"})]})]}),e(D,{title:"About Me",children:[e("p",{children:["I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.",e("br",{}),e("br",{}),"I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience."]}),e("button",{children:e("a",{href:"/portfolio.pdf",download:"portfolio.pdf",children:"Download Resume"})})]}),e(D,{title:"Socials",children:e("div",{className:"socials-container",children:[e("a",{href:"https://www.instagram.com/yaboywf/",target:"_blank",rel:"noopener noreferrer","aria-label":"instagram",children:[e("i",{className:"fab fa-instagram"}),e("p",{children:"Instagram"}),e("p",{children:"@yaboywf"})]}),e("a",{href:"https://www.linkedin.com/in/dylan-fong-9273b8234/",target:"_blank",rel:"noopener noreferrer","aria-label":"linkedin",children:[e("i",{className:"fab fa-linkedin-in"}),e("p",{children:"LinkedIn"}),e("p",{children:"dylanyeowenfeng"})]}),e("a",{href:"https://github.com/yaboywf",target:"_blank",rel:"noopener noreferrer","aria-label":"github",children:[e("i",{className:"fab fa-github"}),e("p",{children:"GitHub"}),e("p",{children:"yaboywf"})]})]})})]}),le=(t,l)=>{const m=new Set([...Object.keys(t),...l.flatMap(a=>Object.keys(a))]),n={};return m.forEach(a=>{n[a]=[t[a],...l.map(c=>c[a])]}),n},ce=({text:t="",delay:l=200,className:m="",animateBy:n="words",direction:a="top",threshold:c=.1,rootMargin:s="0px",animationFrom:o,animationTo:g,easing:i=d=>d,stepDuration:C=.35})=>{const d=n==="words"?t.split(" "):t.split(""),[p,_]=H(!1),r=L(null);R(()=>{if(!r.current)return;const y=new IntersectionObserver(([P])=>{P.isIntersecting&&(_(!0),y.unobserve(r.current))},{threshold:c,rootMargin:s});return y.observe(r.current),()=>y.disconnect()},[c,s]);const x=O(()=>a==="top"?{filter:"blur(10px)",opacity:0,y:-50}:{filter:"blur(10px)",opacity:0,y:50},[a]),M=O(()=>[{filter:"blur(5px)",opacity:.5,y:a==="top"?5:-5},{filter:"blur(0px)",opacity:1,y:0}],[a]),b=o??x,w=g??M,u=w.length+1,f=C*(u-1),T=Array.from({length:u},(y,P)=>u===1?0:P/(u-1));return e("p",{ref:r,className:m,style:{display:"flex",flexWrap:"wrap"},children:d.map((y,P)=>{const I=le(b,w),S={duration:f,times:T,delay:P*l/1e3};return S.ease=i,e(J.span,{className:"inline-block will-change-[transform,filter,opacity]",initial:b,animate:p?I:b,transition:S,children:[y===" "?" ":y,n==="words"&&P<d.length-1&&" "]},P)})})},de=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ue=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,me=({color:t=[1,1,1],amplitude:l=1,distance:m=0,enableMouseInteraction:n=!1,...a})=>{const c=L(null),s=L();return R(()=>{if(!c.current)return;const o=c.current,g=new W({alpha:!0}),i=g.gl;i.clearColor(0,0,0,0),i.enable(i.BLEND),i.blendFunc(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA),o.appendChild(i.canvas);const C=new K(i),d=new Y(i,{vertex:de,fragment:ue,uniforms:{iTime:{value:0},iResolution:{value:new V(i.canvas.width,i.canvas.height,i.canvas.width/i.canvas.height)},uColor:{value:new V(...t)},uAmplitude:{value:l},uDistance:{value:m},uMouse:{value:new Float32Array([.5,.5])}}}),p=new q(i,{geometry:C,program:d});function _(){const{clientWidth:u,clientHeight:f}=o;g.setSize(u,f),d.uniforms.iResolution.value.r=u,d.uniforms.iResolution.value.g=f,d.uniforms.iResolution.value.b=u/f}window.addEventListener("resize",_),_();let r=[.5,.5],x=[.5,.5];function M(u){const f=o.getBoundingClientRect(),T=(u.clientX-f.left)/f.width,y=1-(u.clientY-f.top)/f.height;x=[T,y]}function b(){x=[.5,.5]}n&&(o.addEventListener("mousemove",M),o.addEventListener("mouseleave",b));function w(u){n?(r[0]+=.05*(x[0]-r[0]),r[1]+=.05*(x[1]-r[1]),d.uniforms.uMouse.value[0]=r[0],d.uniforms.uMouse.value[1]=r[1]):(d.uniforms.uMouse.value[0]=.5,d.uniforms.uMouse.value[1]=.5),d.uniforms.iTime.value=u*.001,g.render({scene:p}),s.current=requestAnimationFrame(w)}return s.current=requestAnimationFrame(w),()=>{s.current&&cancelAnimationFrame(s.current),window.removeEventListener("resize",_),n&&(o.removeEventListener("mousemove",M),o.removeEventListener("mouseleave",b)),o.contains(i.canvas)&&o.removeChild(i.canvas),i.getExtension("WEBGL_lose_context")?.loseContext()}},[t,l,m,n]),e("div",{ref:c,className:"threads-container",...a})};function fe({text:t,speed:l=10}){const[m,n]=H("");R(()=>{let s=0;const o=setInterval(()=>{n(g=>g+t.charAt(s)),s++,s>=t.length&&clearInterval(o)},l);return()=>clearInterval(o)},[t,l]);const c=m.replace(/br/g,"@@DOUBLE@@").replace(/\n/g,"@@SINGLE@@").split(/(@@DOUBLE@@|@@SINGLE@@)/).map((s,o)=>s==="@@DOUBLE@@"?e("span",{children:[e("br",{}),e("br",{})]},o):s==="@@SINGLE@@"?e("br",{},o):e("span",{children:s},o));return e("pre",{children:c})}const pe=()=>e("section",{className:"techstack",children:[e("div",{className:"threads-text-container",children:[e(me,{amplitude:4,distance:0,enableMouseInteraction:!1}),e(ce,{text:"What I Use",delay:150,animateBy:"words",direction:"top"})]}),e("div",{className:"terminal-container",children:[e("div",{className:"terminal-header",children:[e("div",{className:"circle red"}),e("div",{className:"circle yellow"}),e("div",{className:"circle green"}),e("div",{className:"terminal-title",children:"Terminal"})]}),e("div",{className:"terminal-body",children:[e("p",{children:"$ cat techstack.txt"}),e(fe,{text:`T#ech Stack Overview
-------------------------------------------------------

[ Web Development ]             [ Backend Development ]
- HTML                          - Node.js (Express)
- CSS / SCSS                    - Django
- JavaScript                    - Python Flask
- React.js

[ Programming Languages ]       [ Databases ]
- Python                        - MySQL
- JavaScript                    - PostgreSQL
- Dart                          - MongoDB
                                - SQLite
                                - Firebird SQL

[ Mobile Development ]          [ Game Development ]
- Flutter                       - Pygame

-------------------------------------------------------
End of file
    `})]})]})]}),F=({children:t,className:l="",spotlightColor:m="rgb(255, 255, 255)"})=>{const n=L(null);return e("div",{ref:n,onMouseMove:c=>{const s=n.current.getBoundingClientRect(),o=c.clientX-s.left,g=c.clientY-s.top;n.current.style.setProperty("--mouse-x",`${o}px`),n.current.style.setProperty("--mouse-y",`${g}px`),n.current.style.setProperty("--spotlight-color",m)},className:"redirect",children:t})},ye=()=>(R(()=>{document.title="Dylan Yeo Portfolio | Home",localStorage.getItem("warn")!==!0&&(alert("This website is current ly undergoing a major revamp. Some sections may be incomplete or missing. Thank you for your understanding!"),localStorage.setItem("warn",!0))},[]),e("main",{children:[e(re,{}),e(se,{}),e(pe,{}),e("div",{className:"redirect-container",children:[e(F,{spotlightColor:"rgba(255, 255, 255, 0.25)",children:[e("p",{children:"Let Me Prove my Skills"}),e("p",{children:"View certficates achieved over the years"}),e("a",{href:"#/certifications",children:"View Certifications"})]}),e(F,{spotlightColor:"rgba(255, 255, 255, 0.25)",children:[e("p",{children:"Explore My Experience"}),e("p",{children:"Discover my professional journey and projects"}),e("a",{href:"#/experience",children:"View Experience"})]}),e(F,{spotlightColor:"rgba(255, 255, 255, 0.25)",children:[e("p",{children:"Get In Touch"}),e("p",{children:"Feel free to reach out for collaborations or opportunities"}),e("a",{href:"#/contact",children:"Contact Me"})]})]})]}));export{ye as default};
