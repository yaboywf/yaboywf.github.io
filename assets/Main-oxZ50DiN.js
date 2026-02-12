import{A as S,y as w,d as M,T,e as I,f as A,M as R,a as e,g as _,h as D,m as N,i as B,j as F}from"./vendor-BuZh7iWQ.js";import{I as G,S as O}from"./nav-C083gmEw.js";import{B as z}from"./TextEffect-D3Z5E3MV.js";import{F as V}from"./Footer-BO7Me6kL.js";import"./general-CbBILpSI.js";const H=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,W=`
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
`,U=({color:n=[1,1,1],amplitude:l=1,distance:m=0,enableMouseInteraction:h=!1,...v})=>{const d=S(null),a=S();return w(()=>{if(!d.current)return;const i=d.current,u=new M({alpha:!0}),r=u.gl;r.clearColor(0,0,0,0),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),i.appendChild(r.canvas);const P=new T(r),c=new I(r,{vertex:H,fragment:W,uniforms:{iTime:{value:0},iResolution:{value:new A(r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height)},uColor:{value:new A(...n)},uAmplitude:{value:l},uDistance:{value:m},uMouse:{value:new Float32Array([.5,.5])}}}),k=new R(r,{geometry:P,program:c});function y(){const{clientWidth:t,clientHeight:s}=i;u.setSize(t,s),c.uniforms.iResolution.value.r=t,c.uniforms.iResolution.value.g=s,c.uniforms.iResolution.value.b=t/s}window.addEventListener("resize",y),y();let f=[.5,.5],p=[.5,.5];function x(t){const s=i.getBoundingClientRect(),g=(t.clientX-s.left)/s.width,E=1-(t.clientY-s.top)/s.height;p=[g,E]}function b(){p=[.5,.5]}h&&(i.addEventListener("mousemove",x),i.addEventListener("mouseleave",b));function o(t){h?(f[0]+=.05*(p[0]-f[0]),f[1]+=.05*(p[1]-f[1]),c.uniforms.uMouse.value[0]=f[0],c.uniforms.uMouse.value[1]=f[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=t*.001,u.render({scene:k}),a.current=requestAnimationFrame(o)}return a.current=requestAnimationFrame(o),()=>{a.current&&cancelAnimationFrame(a.current),window.removeEventListener("resize",y),h&&(i.removeEventListener("mousemove",x),i.removeEventListener("mouseleave",b)),i.contains(r.canvas)&&i.removeChild(r.canvas),r.getExtension("WEBGL_lose_context")?.loseContext()}},[n,l,m,h]),e("div",{ref:d,className:"threads-container",...v})};function j({text:n,speed:l=10}){const[m,h]=_("");w(()=>{h("")},[n]),w(()=>{let a=0;const i=setInterval(()=>{h(u=>u+n.charAt(a)),a++,a>=n.length&&clearInterval(i)},l);return()=>clearInterval(i)},[n,l]);const d=m.replace(/br/g,"@@DOUBLE@@").replace(/\n/g,"@@SINGLE@@").split(/(@@DOUBLE@@|@@SINGLE@@)/).map((a,i)=>a==="@@DOUBLE@@"?e("span",{children:[e("br",{}),e("br",{})]},i):a==="@@SINGLE@@"?e("br",{},i):e("span",{children:a},i));return e("pre",{children:d})}const $=()=>e("section",{className:"techstack",children:[e("div",{className:"threads-text-container",children:[e(U,{amplitude:4,distance:0,enableMouseInteraction:!1}),e(z,{text:"What I Use",delay:150,animateBy:"words",direction:"top"})]}),e("div",{className:"terminal-container",children:[e("div",{className:"terminal-header",children:[e("div",{className:"circle red"}),e("div",{className:"circle yellow"}),e("div",{className:"circle green"}),e("div",{className:"terminal-title",children:"Terminal"})]}),e("div",{className:"terminal-body",children:[e("p",{children:"$ cat techstack.txt"}),e(j,{text:`Tech Stack Overview
-------------------------------------------------------

[ WEB DEVELOPMENT ]             [ DEVOPS ]
- HTML                          - Git/GitHub
- CSS / SCSS                    - Github Actions
- JavaScript/TypeScript         - Jenkins
- React.js                      - Playwright / Cypress
- Next.js                       - Cloud (AWS / GCP) 
- Node.js (Express)             - Docker
- Python (Flask)                - SuperTest
- Django                        - Minikube / Kubernetes

[ PROGRAMMING LANGUAGES ]       [ DATABASES ]
- Python                        - MySQL
- Dart                          - PostgreSQL
- Javascript                    - MongoDB
- TypeScript                    - SQLite
- MicroPython                   - Firebird SQL
                                - Firebase

[ MOBILE DEVELOPMENT ]          [ GAME DEVELOPMENT ]
- Flutter                       - Pygame

-------------------------------------------------------
END OF FILE
    `})]})]})]}),C=16,Q={type:"spring",stiffness:300,damping:30};function L({items:n,baseWidth:l=300,...m}){const v=l-32,d=v+C,a=[...n,n[0]],[i,u]=_(0),r=D(0),[P,c]=_(!1),[k,y]=_(!1),f=S(null);w(()=>{const o=f.current;if(!o)return;const t=()=>c(!0),s=()=>c(!1);return o.addEventListener("mouseenter",t),o.addEventListener("mouseleave",s),()=>{o.removeEventListener("mouseenter",t),o.removeEventListener("mouseleave",s)}},[]),w(()=>{if(P)return;const o=setInterval(()=>{u(t=>t===n.length-1?t+1:t===a.length-1?0:t+1)},3e3);return()=>clearInterval(o)},[P,a.length]);const p=k?{duration:0}:Q,x=()=>{i===a.length-1&&(y(!0),r.set(0),u(0),setTimeout(()=>y(!1),50))},b=(o,t)=>{t.offset.x<0?u(g=>g+1):u(g=>g===0?n.length-1:g-1)};return e("div",{ref:f,className:"carousel-container",style:{width:`${l}px`,height:`${l}px`,borderRadius:"50%",...m},children:[e(N.div,{className:"carousel-track",drag:"x",style:{width:v,gap:`${C}px`,perspective:1e3,perspectiveOrigin:`${i*d+v/2}px 50%`,x:r},onDragEnd:b,animate:{x:-(i*d)},transition:p,onAnimationComplete:x,children:a.map((o,t)=>{const s=[-(t+1)*d,-t*d,-(t-1)*d],E=B(r,s,[90,0,-90],{clamp:!1});return e(N.div,{className:"carousel-item",style:{width:v,height:v,rotateY:E,borderRadius:"50%"},transition:p,onClick:()=>l<300&&window.open(o.link,"_blank"),children:[e("div",{className:"carousel-item-header",children:e("img",{src:`/images/certs/${o.image}`,className:"carousel-icon-container"})}),e("div",{className:"carousel-item-content",children:[e("div",{className:"carousel-item-title",children:o.title}),l>=300&&e("button",{onClick:()=>window.open(o.link,"_blank"),children:"Show Me!"})]})]},t)})}),l>=300&&e("div",{className:"carousel-indicators",children:n.map((o,t)=>e(N.div,{className:`carousel-indicator ${i%n.length===t?"active":"inactive"}`,onClick:()=>u(t)},t))})]})}const q=[{title:"Python Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/632ad715175d"},{title:"CSS Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/8a3506633a04"},{title:"SQL Advanced",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/c8e92d721d55"},{title:"Node Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/b457e9882934"}],J=[{title:"Problem Solving Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/229c2962f74e"},{title:"AWS Cloud Practitioner",image:"aws.webp",link:"https://www.credly.com/badges/a3225cb1-00ff-4622-855c-cbb1b6d9545f"},{title:"AWS Academy Graduate - Cloud Foundations - Training",image:"aws.webp",link:"https://www.credly.com/badges/bdf09803-0ff2-43c4-b69e-752ae61fa70d"},{title:"Basic Proficiency in KNIME Analytics Platform",image:"knime.webp",link:"https://www.credly.com/badges/18f7f414-e178-4a23-93a1-109c89e42dd0"},{title:"Networking Basic",image:"cisco.webp",link:"https://www.credly.com/badges/f9fb7756-142f-4ce1-b56f-aece364bfeda/public_url"}],Y=()=>{const[n,l]=_(window.innerWidth);return w(()=>{const m=()=>{l(window.innerWidth)};return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]),e("div",{className:"certs",children:[e("h2",{style:{gridArea:"header"},children:"Certifications"}),e("h3",{style:{gridArea:"sub2"},children:"Technical"}),e("h3",{style:{gridArea:"sub1"},children:"General"}),e(L,{items:q,gridArea:"content2",baseWidth:n>=500?300:200}),e(L,{items:J,gridArea:"content1",baseWidth:n>=500?300:200})]})},ne=()=>{const n=F();return w(()=>{document.title="Dylan Yeo | Home"},[]),e("main",{children:[e(G,{}),e(O,{}),e($,{}),e(Y,{}),e("h2",{className:"redirect-header",children:"Want to know more?"}),e("div",{className:"redirect-container",children:[e("div",{className:"redirect",style:{"--icon":'"\\f135"'},children:[e("p",{children:"Explore My Experience"}),e("p",{children:"Discover my professional journey and projects"}),e("a",{onClick:()=>n("/experience"),children:"View Experience"})]}),e("div",{className:"redirect",style:{"--icon":'"\\f82d"'},children:[e("p",{children:"Get In Touch"}),e("p",{children:"Feel free to reach out for collaborations or opportunities"}),e("a",{onClick:()=>n("/contact"),children:"Contact Me"})]})]}),e(V,{})]})};export{ne as default};
