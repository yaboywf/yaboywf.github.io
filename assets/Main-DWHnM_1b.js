import{a as e,A as E,y as w,d as T,T as D,e as M,f as L,M as R,g as b,h as B,m as C,i as F,j as z}from"./vendor-BQQ7LqxH.js";import{C as S,I as G}from"./nav-Dr1KoPEd.js";import"./general-BW4G9QI6.js";import{B as O}from"./TextEffect-CZ6kYQA6.js";import{F as H}from"./Footer-dYbErPak.js";const W=()=>e("div",{className:"subintro-container",children:[e(S,{title:"Education",children:[e("div",{className:"education-container",children:[e("img",{src:"/images/tp.webp",alt:"Temasek Polytechnic Logo"}),e("p",{children:["Temasek Polytechnic ",e("br",{}),e("span",{children:"2024 - 2027"})]}),e("p",{children:"Diploma in Information Technology"})]}),e("div",{className:"education-container",children:[e("img",{src:"/images/gm.webp",alt:"Geylang Methodist School Logo"}),e("p",{children:["Geylang Methodist School (Secondary) ",e("br",{}),e("span",{children:"2022 - 2024"})]}),e("p",{children:"GCE Ordinary Level | 7 Credits"})]})]}),e(S,{title:"About Me",children:[e("p",{children:["I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.",e("br",{}),e("br",{}),"I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience."]}),e("button",{children:e("a",{href:"/portfolio.pdf",download:"portfolio.pdf",children:"Download Resume"})})]}),e(S,{title:"Socials",children:e("div",{className:"socials-container",children:[e("a",{href:"https://www.instagram.com/yaboywf/",target:"_blank",rel:"noopener noreferrer","aria-label":"instagram",children:[e("i",{className:"fab fa-instagram"}),e("p",{children:"Instagram"}),e("p",{children:"@yaboywf"})]}),e("a",{href:"https://www.linkedin.com/in/dylan-fong-9273b8234/",target:"_blank",rel:"noopener noreferrer","aria-label":"linkedin",children:[e("i",{className:"fab fa-linkedin-in"}),e("p",{children:"LinkedIn"}),e("p",{children:"dylanyeowenfeng"})]}),e("a",{href:"https://github.com/yaboywf",target:"_blank",rel:"noopener noreferrer","aria-label":"github",children:[e("i",{className:"fab fa-github"}),e("p",{children:"GitHub"}),e("p",{children:"yaboywf"})]})]})})]}),j=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,U=`
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
`,$=({color:n=[1,1,1],amplitude:s=1,distance:m=0,enableMouseInteraction:f=!1,...p})=>{const d=E(null),r=E();return w(()=>{if(!d.current)return;const i=d.current,u=new T({alpha:!0}),a=u.gl;a.clearColor(0,0,0,0),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),i.appendChild(a.canvas);const _=new D(a),c=new M(a,{vertex:j,fragment:U,uniforms:{iTime:{value:0},iResolution:{value:new L(a.canvas.width,a.canvas.height,a.canvas.width/a.canvas.height)},uColor:{value:new L(...n)},uAmplitude:{value:s},uDistance:{value:m},uMouse:{value:new Float32Array([.5,.5])}}}),k=new R(a,{geometry:_,program:c});function y(){const{clientWidth:t,clientHeight:l}=i;u.setSize(t,l),c.uniforms.iResolution.value.r=t,c.uniforms.iResolution.value.g=l,c.uniforms.iResolution.value.b=t/l}window.addEventListener("resize",y),y();let h=[.5,.5],v=[.5,.5];function x(t){const l=i.getBoundingClientRect(),g=(t.clientX-l.left)/l.width,N=1-(t.clientY-l.top)/l.height;v=[g,N]}function P(){v=[.5,.5]}f&&(i.addEventListener("mousemove",x),i.addEventListener("mouseleave",P));function o(t){f?(h[0]+=.05*(v[0]-h[0]),h[1]+=.05*(v[1]-h[1]),c.uniforms.uMouse.value[0]=h[0],c.uniforms.uMouse.value[1]=h[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=t*.001,u.render({scene:k}),r.current=requestAnimationFrame(o)}return r.current=requestAnimationFrame(o),()=>{r.current&&cancelAnimationFrame(r.current),window.removeEventListener("resize",y),f&&(i.removeEventListener("mousemove",x),i.removeEventListener("mouseleave",P)),i.contains(a.canvas)&&i.removeChild(a.canvas),a.getExtension("WEBGL_lose_context")?.loseContext()}},[n,s,m,f]),e("div",{ref:d,className:"threads-container",...p})};function V({text:n,speed:s=10}){const[m,f]=b("");w(()=>{f("")},[n]),w(()=>{let r=0;const i=setInterval(()=>{f(u=>u+n.charAt(r)),r++,r>=n.length&&clearInterval(i)},s);return()=>clearInterval(i)},[n,s]);const d=m.replace(/br/g,"@@DOUBLE@@").replace(/\n/g,"@@SINGLE@@").split(/(@@DOUBLE@@|@@SINGLE@@)/).map((r,i)=>r==="@@DOUBLE@@"?e("span",{children:[e("br",{}),e("br",{})]},i):r==="@@SINGLE@@"?e("br",{},i):e("span",{children:r},i));return e("pre",{children:d})}const Q=()=>e("section",{className:"techstack",children:[e("div",{className:"threads-text-container",children:[e($,{amplitude:4,distance:0,enableMouseInteraction:!1}),e(O,{text:"What I Use",delay:150,animateBy:"words",direction:"top"})]}),e("div",{className:"terminal-container",children:[e("div",{className:"terminal-header",children:[e("div",{className:"circle red"}),e("div",{className:"circle yellow"}),e("div",{className:"circle green"}),e("div",{className:"terminal-title",children:"Terminal"})]}),e("div",{className:"terminal-body",children:[e("p",{children:"$ cat techstack.txt"}),e(V,{text:`Tech Stack Overview
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
    `})]})]})]}),I=16,Y={type:"spring",stiffness:300,damping:30};function A({items:n,baseWidth:s=300,...m}){const p=s-32,d=p+I,r=[...n,n[0]],[i,u]=b(0),a=B(0),[_,c]=b(!1),[k,y]=b(!1),h=E(null);w(()=>{const o=h.current;if(!o)return;const t=()=>c(!0),l=()=>c(!1);return o.addEventListener("mouseenter",t),o.addEventListener("mouseleave",l),()=>{o.removeEventListener("mouseenter",t),o.removeEventListener("mouseleave",l)}},[]),w(()=>{if(_)return;const o=setInterval(()=>{u(t=>t===n.length-1?t+1:t===r.length-1?0:t+1)},3e3);return()=>clearInterval(o)},[_,r.length]);const v=k?{duration:0}:Y,x=()=>{i===r.length-1&&(y(!0),a.set(0),u(0),setTimeout(()=>y(!1),50))},P=(o,t)=>{t.offset.x<0?u(g=>g+1):u(g=>g===0?n.length-1:g-1)};return e("div",{ref:h,className:"carousel-container",style:{width:`${s}px`,height:`${s}px`,borderRadius:"50%",...m},children:[e(C.div,{className:"carousel-track",drag:"x",style:{width:p,gap:`${I}px`,perspective:1e3,perspectiveOrigin:`${i*d+p/2}px 50%`,x:a},onDragEnd:P,animate:{x:-(i*d)},transition:v,onAnimationComplete:x,children:r.map((o,t)=>{const l=[-(t+1)*d,-t*d,-(t-1)*d],N=F(a,l,[90,0,-90],{clamp:!1});return e(C.div,{className:"carousel-item",style:{width:p,height:p,rotateY:N,borderRadius:"50%"},transition:v,onClick:()=>s<300&&window.open(o.link,"_blank"),children:[e("div",{className:"carousel-item-header",children:e("img",{src:`/images/certs/${o.image}`,className:"carousel-icon-container"})}),e("div",{className:"carousel-item-content",children:[e("div",{className:"carousel-item-title",children:o.title}),s>=300&&e("button",{onClick:()=>window.open(o.link,"_blank"),children:"Show Me!"})]})]},t)})}),s>=300&&e("div",{className:"carousel-indicators",children:n.map((o,t)=>e(C.div,{className:`carousel-indicator ${i%n.length===t?"active":"inactive"}`,onClick:()=>u(t)},t))})]})}const q=[{title:"Python Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/632ad715175d"},{title:"CSS Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/8a3506633a04"},{title:"SQL Advanced",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/c8e92d721d55"},{title:"Node Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/b457e9882934"}],J=[{title:"Problem Solving Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/229c2962f74e"},{title:"AWS Cloud Practitioner",image:"aws.webp",link:"https://www.credly.com/badges/a3225cb1-00ff-4622-855c-cbb1b6d9545f"},{title:"AWS Academy Graduate - Cloud Foundations - Training",image:"aws.webp",link:"https://www.credly.com/badges/bdf09803-0ff2-43c4-b69e-752ae61fa70d"},{title:"Basic Proficiency in KNIME Analytics Platform",image:"knime.webp",link:"https://www.credly.com/badges/18f7f414-e178-4a23-93a1-109c89e42dd0"},{title:"Networking Basic",image:"cisco.webp",link:"https://www.credly.com/badges/f9fb7756-142f-4ce1-b56f-aece364bfeda/public_url"}],K=()=>{const[n,s]=b(window.innerWidth);return w(()=>{const m=()=>{s(window.innerWidth)};return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]),e("div",{className:"certs",children:[e("h2",{style:{gridArea:"header"},children:"Certifications"}),e("h3",{style:{gridArea:"sub2"},children:"Technical"}),e("h3",{style:{gridArea:"sub1"},children:"General"}),e(A,{items:q,gridArea:"content2",baseWidth:n>=500?300:200}),e(A,{items:J,gridArea:"content1",baseWidth:n>=500?300:200})]})},ie=()=>{const n=z();return w(()=>{document.title="Dylan Yeo | Home"},[]),e("main",{children:[e(G,{}),e(W,{}),e(Q,{}),e(K,{}),e("h2",{className:"redirect-header",children:"Want to know more?"}),e("div",{className:"redirect-container",children:[e("div",{className:"redirect",style:{"--icon":'"\\f135"'},children:[e("p",{children:"Explore My Experience"}),e("p",{children:"Discover my professional journey and projects"}),e("a",{onClick:()=>n("/experience"),children:"View Experience"})]}),e("div",{className:"redirect",style:{"--icon":'"\\f82d"'},children:[e("p",{children:"Get In Touch"}),e("p",{children:"Feel free to reach out for collaborations or opportunities"}),e("a",{onClick:()=>n("/contact"),children:"Contact Me"})]})]}),e(H,{})]})};export{ie as default};
