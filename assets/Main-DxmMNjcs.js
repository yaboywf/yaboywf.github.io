import{a as e,d as b,y as g,e as S,A as E,f as R,T as M,g as B,h as L,M as z,i as F,m as C,j as G,k as O}from"./vendor-B3c1suye.js";import{P as H}from"./general-CFJjdlte.js";import{B as j}from"./TextEffect-Do0u0VcU.js";const W=()=>e("div",{className:"intro-container",children:[e(H,{particleColors:["#ffffff","#ffffff"],particleCount:200,particleSpread:10,speed:.5,particleBaseSize:100,moveParticlesOnHover:!0,alphaParticles:!0,disableRotation:!1}),e("div",{className:"intro-section",children:[e("div",{id:"pfp",style:{background:"url('/images/pfp.webp') center/cover no-repeat"}}),e("div",{id:"intro",children:[e("h3",{children:"Hello, I'm"}),e("h1",{children:"Dylan Yeo"}),e("p",{children:"A passionate IT student specialising in web development and modern software engineering."})]})]})]}),U="_card_ak5r8_1",$="_content_ak5r8_11",A={card:U,content:$},I=({title:n,children:r})=>e("div",{className:A.card,children:[e("h3",{children:n}),e("div",{className:A.content,children:r})]}),V=()=>{const[n,r]=b({github:null,linkedin:null,instagram:null});return g(()=>{(async()=>{try{const d=await S.get("https://api.microlink.io/?url=https://github.com/yaboywf"),f=await S.get("https://api.microlink.io/?url=https://linkedin.com"),u=await S.get("https://api.microlink.io/?url=https://instagram.com");console.log(d),r({github:d.data.data.image.url,linkedin:f.data.data.image.url,instagram:u.data.data.image.url})}catch(d){console.error(d)}})()},[]),e("div",{className:"subintro-container",children:[Object.keys(n).map(c=>e("div",{className:"image-container",children:e("img",{src:n[c],alt:c})},c)),e(I,{title:"Education",children:[e("div",{className:"education-container",children:[e("img",{src:"/images/tp.webp",alt:"Temasek Polytechnic Logo"}),e("p",{children:["Temasek Polytechnic ",e("br",{}),e("span",{children:"2024 - 2027"})]}),e("p",{children:"Diploma in Information Technology"})]}),e("div",{className:"education-container",children:[e("img",{src:"/images/gm.webp",alt:"Geylang Methodist School Logo"}),e("p",{children:["Geylang Methodist School (Secondary) ",e("br",{}),e("span",{children:"2022 - 2024"})]}),e("p",{children:"GCE Ordinary Level | 7 Credits"})]})]}),e(I,{title:"About Me",children:[e("p",{children:["I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.",e("br",{}),e("br",{}),"I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience."]}),e("button",{children:e("a",{href:"/portfolio.pdf",download:"portfolio.pdf",children:"Download Resume"})})]}),e(I,{title:"Socials",children:e("div",{className:"socials-container",children:[e("a",{href:"https://www.instagram.com/yaboywf/",target:"_blank",rel:"noopener noreferrer","aria-label":"instagram",children:[e("i",{className:"fab fa-instagram"}),e("p",{children:"Instagram"}),e("p",{children:"@yaboywf"})]}),e("a",{href:"https://www.linkedin.com/in/dylan-fong-9273b8234/",target:"_blank",rel:"noopener noreferrer","aria-label":"linkedin",children:[e("i",{className:"fab fa-linkedin-in"}),e("p",{children:"LinkedIn"}),e("p",{children:"dylanyeowenfeng"})]}),e("a",{href:"https://github.com/yaboywf",target:"_blank",rel:"noopener noreferrer","aria-label":"github",children:[e("i",{className:"fab fa-github"}),e("p",{children:"GitHub"}),e("p",{children:"yaboywf"})]})]})})]})},Q=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Y=`
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
`,q=({color:n=[1,1,1],amplitude:r=1,distance:c=0,enableMouseInteraction:d=!1,...f})=>{const u=E(null),o=E();return g(()=>{if(!u.current)return;const i=u.current,h=new R({alpha:!0}),a=h.gl;a.clearColor(0,0,0,0),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),i.appendChild(a.canvas);const _=new M(a),m=new B(a,{vertex:Q,fragment:Y,uniforms:{iTime:{value:0},iResolution:{value:new L(a.canvas.width,a.canvas.height,a.canvas.width/a.canvas.height)},uColor:{value:new L(...n)},uAmplitude:{value:r},uDistance:{value:c},uMouse:{value:new Float32Array([.5,.5])}}}),x=new z(a,{geometry:_,program:m});function y(){const{clientWidth:t,clientHeight:s}=i;h.setSize(t,s),m.uniforms.iResolution.value.r=t,m.uniforms.iResolution.value.g=s,m.uniforms.iResolution.value.b=t/s}window.addEventListener("resize",y),y();let p=[.5,.5],v=[.5,.5];function k(t){const s=i.getBoundingClientRect(),w=(t.clientX-s.left)/s.width,N=1-(t.clientY-s.top)/s.height;v=[w,N]}function P(){v=[.5,.5]}d&&(i.addEventListener("mousemove",k),i.addEventListener("mouseleave",P));function l(t){d?(p[0]+=.05*(v[0]-p[0]),p[1]+=.05*(v[1]-p[1]),m.uniforms.uMouse.value[0]=p[0],m.uniforms.uMouse.value[1]=p[1]):(m.uniforms.uMouse.value[0]=.5,m.uniforms.uMouse.value[1]=.5),m.uniforms.iTime.value=t*.001,h.render({scene:x}),o.current=requestAnimationFrame(l)}return o.current=requestAnimationFrame(l),()=>{o.current&&cancelAnimationFrame(o.current),window.removeEventListener("resize",y),d&&(i.removeEventListener("mousemove",k),i.removeEventListener("mouseleave",P)),i.contains(a.canvas)&&i.removeChild(a.canvas),a.getExtension("WEBGL_lose_context")?.loseContext()}},[n,r,c,d]),e("div",{ref:u,className:"threads-container",...f})};function J({text:n,speed:r=10}){const[c,d]=b("");g(()=>{d("")},[n]),g(()=>{let o=0;const i=setInterval(()=>{d(h=>h+n.charAt(o)),o++,o>=n.length&&clearInterval(i)},r);return()=>clearInterval(i)},[n,r]);const u=c.replace(/br/g,"@@DOUBLE@@").replace(/\n/g,"@@SINGLE@@").split(/(@@DOUBLE@@|@@SINGLE@@)/).map((o,i)=>o==="@@DOUBLE@@"?e("span",{children:[e("br",{}),e("br",{})]},i):o==="@@SINGLE@@"?e("br",{},i):e("span",{children:o},i));return e("pre",{children:u})}const K=()=>e("section",{className:"techstack",children:[e("div",{className:"threads-text-container",children:[e(q,{amplitude:4,distance:0,enableMouseInteraction:!1}),e(j,{text:"What I Use",delay:150,animateBy:"words",direction:"top"})]}),e("div",{className:"terminal-container",children:[e("div",{className:"terminal-header",children:[e("div",{className:"circle red"}),e("div",{className:"circle yellow"}),e("div",{className:"circle green"}),e("div",{className:"terminal-title",children:"Terminal"})]}),e("div",{className:"terminal-body",children:[e("p",{children:"$ cat techstack.txt"}),e(J,{text:`Tech Stack Overview
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
    `})]})]})]}),T=16,X={type:"spring",stiffness:300,damping:30};function D({items:n,baseWidth:r=300,...c}){const f=r-32,u=f+T,o=[...n,n[0]],[i,h]=b(0),a=F(0),[_,m]=b(!1),[x,y]=b(!1),p=E(null);g(()=>{const l=p.current;if(!l)return;const t=()=>m(!0),s=()=>m(!1);return l.addEventListener("mouseenter",t),l.addEventListener("mouseleave",s),()=>{l.removeEventListener("mouseenter",t),l.removeEventListener("mouseleave",s)}},[]),g(()=>{if(_)return;const l=setInterval(()=>{h(t=>t===n.length-1?t+1:t===o.length-1?0:t+1)},3e3);return()=>clearInterval(l)},[_,o.length]);const v=x?{duration:0}:X,k=()=>{i===o.length-1&&(y(!0),a.set(0),h(0),setTimeout(()=>y(!1),50))},P=(l,t)=>{t.offset.x<0?h(w=>w+1):h(w=>w===0?n.length-1:w-1)};return e("div",{ref:p,className:"carousel-container",style:{width:`${r}px`,height:`${r}px`,borderRadius:"50%",...c},children:[e(C.div,{className:"carousel-track",drag:"x",style:{width:f,gap:`${T}px`,perspective:1e3,perspectiveOrigin:`${i*u+f/2}px 50%`,x:a},onDragEnd:P,animate:{x:-(i*u)},transition:v,onAnimationComplete:k,children:o.map((l,t)=>{const s=[-(t+1)*u,-t*u,-(t-1)*u],N=G(a,s,[90,0,-90],{clamp:!1});return e(C.div,{className:"carousel-item",style:{width:f,height:f,rotateY:N,borderRadius:"50%"},transition:v,onClick:()=>r<300&&window.open(l.link,"_blank"),children:[e("div",{className:"carousel-item-header",children:e("img",{src:`/images/certs/${l.image}`,className:"carousel-icon-container"})}),e("div",{className:"carousel-item-content",children:[e("div",{className:"carousel-item-title",children:l.title}),r>=300&&e("button",{onClick:()=>window.open(l.link,"_blank"),children:"Show Me!"})]})]},t)})}),r>=300&&e("div",{className:"carousel-indicators",children:n.map((l,t)=>e(C.div,{className:`carousel-indicator ${i%n.length===t?"active":"inactive"}`,onClick:()=>h(t)},t))})]})}const Z=[{title:"Python Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/632ad715175d"},{title:"CSS Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/8a3506633a04"},{title:"SQL Advanced",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/c8e92d721d55"},{title:"Node Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/b457e9882934"}],ee=[{title:"Problem Solving Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/229c2962f74e"},{title:"AWS Cloud Practitioner",image:"aws.webp",link:"https://www.credly.com/badges/a3225cb1-00ff-4622-855c-cbb1b6d9545f"},{title:"AWS Academy Graduate - Cloud Foundations - Training",image:"aws.webp",link:"https://www.credly.com/badges/bdf09803-0ff2-43c4-b69e-752ae61fa70d"},{title:"Basic Proficiency in KNIME Analytics Platform",image:"knime.webp",link:"https://www.credly.com/badges/18f7f414-e178-4a23-93a1-109c89e42dd0"},{title:"Networking Basic",image:"cisco.webp",link:"https://www.credly.com/badges/f9fb7756-142f-4ce1-b56f-aece364bfeda/public_url"}],te=()=>{const[n,r]=b(window.innerWidth);return g(()=>{const c=()=>{r(window.innerWidth)};return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),e("div",{className:"certs",children:[e("h2",{style:{gridArea:"header"},children:"Certifications"}),e("h3",{style:{gridArea:"sub2"},children:"Technical"}),e("h3",{style:{gridArea:"sub1"},children:"General"}),e(D,{items:Z,gridArea:"content2",baseWidth:n>=500?300:200}),e(D,{items:ee,gridArea:"content1",baseWidth:n>=500?300:200})]})},re=()=>{const n=O();return g(()=>{document.title="Dylan Yeo Portfolio | Home"},[]),e("main",{children:[e(W,{}),e(V,{}),e(K,{}),e(te,{}),e("h2",{className:"redirect-header",children:"Want to know more?"}),e("div",{className:"redirect-container",children:[e("div",{className:"redirect",style:{"--icon":'"\\f135"'},children:[e("p",{children:"Explore My Experience"}),e("p",{children:"Discover my professional journey and projects"}),e("a",{onClick:()=>n("/experience"),children:"View Experience"})]}),e("div",{className:"redirect",style:{"--icon":'"\\f82d"'},children:[e("p",{children:"Get In Touch"}),e("p",{children:"Feel free to reach out for collaborations or opportunities"}),e("a",{onClick:()=>n("/contact"),children:"Contact Me"})]})]})]})};export{re as default};
