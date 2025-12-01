import{u as e,d as N,A as E,y as _,T,m as C,b as z,e as F,f as O,g as A,M as G,h as H,i as j,j as W}from"./vendor-BUX3Son7.js";import{P as V}from"./Particles-BMoeE65r.js";/* empty css                */const U=()=>e("div",{className:"intro-container",children:[e(V,{particleColors:["#ffffff","#ffffff"],particleCount:200,particleSpread:10,speed:.5,particleBaseSize:100,moveParticlesOnHover:!0,alphaParticles:!0,disableRotation:!1}),e("div",{className:"intro-section",children:[e("div",{id:"pfp",style:{background:"url('/images/pfp.webp') center/cover no-repeat"}}),e("div",{id:"intro",children:[e("h3",{children:"Hello, I'm"}),e("h1",{children:"Dylan Yeo"}),e("p",{children:"A passionate IT student specialising in web development and modern software engineering."})]})]})]}),$="_card_ak5r8_1",Q="_content_ak5r8_11",D={card:$,content:Q},I=({title:n,children:a})=>e("div",{className:D.card,children:[e("h3",{children:n}),e("div",{className:D.content,children:a})]}),Y=()=>e("div",{className:"subintro-container",children:[e(I,{title:"Education",children:[e("div",{className:"education-container",children:[e("img",{src:"/images/tp.webp",alt:"Temasek Polytechnic Logo"}),e("p",{children:["Temasek Polytechnic ",e("br",{}),e("span",{children:"2024 - 2027"})]}),e("p",{children:"Diploma in Information Technology"})]}),e("div",{className:"education-container",children:[e("img",{src:"/images/gm.webp",alt:"Geylang Methodist School Logo"}),e("p",{children:["Geylang Methodist School (Secondary) ",e("br",{}),e("span",{children:"2022 - 2024"})]}),e("p",{children:"GCE Ordinary Level | 7 Credits"})]})]}),e(I,{title:"About Me",children:[e("p",{children:["I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.",e("br",{}),e("br",{}),"I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience."]}),e("button",{children:e("a",{href:"/portfolio.pdf",download:"portfolio.pdf",children:"Download Resume"})})]}),e(I,{title:"Socials",children:e("div",{className:"socials-container",children:[e("a",{href:"https://www.instagram.com/yaboywf/",target:"_blank",rel:"noopener noreferrer","aria-label":"instagram",children:[e("i",{className:"fab fa-instagram"}),e("p",{children:"Instagram"}),e("p",{children:"@yaboywf"})]}),e("a",{href:"https://www.linkedin.com/in/dylan-fong-9273b8234/",target:"_blank",rel:"noopener noreferrer","aria-label":"linkedin",children:[e("i",{className:"fab fa-linkedin-in"}),e("p",{children:"LinkedIn"}),e("p",{children:"dylanyeowenfeng"})]}),e("a",{href:"https://github.com/yaboywf",target:"_blank",rel:"noopener noreferrer","aria-label":"github",children:[e("i",{className:"fab fa-github"}),e("p",{children:"GitHub"}),e("p",{children:"yaboywf"})]})]})})]}),q=(n,a)=>{const h=new Set([...Object.keys(n),...a.flatMap(s=>Object.keys(s))]),m={};return h.forEach(s=>{m[s]=[n[s],...a.map(u=>u[s])]}),m},K=({text:n="",delay:a=200,className:h="",animateBy:m="words",direction:s="top",threshold:u=.1,rootMargin:o="0px",animationFrom:i,animationTo:p,easing:r=c=>c,stepDuration:P=.35})=>{const c=m==="words"?n.split(" "):n.split(""),[S,y]=N(!1),f=E(null);_(()=>{if(!f.current)return;const v=new IntersectionObserver(([x])=>{x.isIntersecting&&(y(!0),v.unobserve(f.current))},{threshold:u,rootMargin:o});return v.observe(f.current),()=>v.disconnect()},[u,o]);const g=T(()=>s==="top"?{filter:"blur(10px)",opacity:0,y:-50}:{filter:"blur(10px)",opacity:0,y:50},[s]),k=T(()=>[{filter:"blur(5px)",opacity:.5,y:s==="top"?5:-5},{filter:"blur(0px)",opacity:1,y:0}],[s]),b=i??g,l=p??k,t=l.length+1,d=P*(t-1),w=Array.from({length:t},(v,x)=>t===1?0:x/(t-1));return e("p",{ref:f,className:h,style:{display:"flex",flexWrap:"wrap"},children:c.map((v,x)=>{const B=q(b,l),L={duration:d,times:w,delay:x*a/1e3};return L.ease=r,e(C.span,{className:"inline-block will-change-[transform,filter,opacity]",initial:b,animate:S?B:b,transition:L,children:[v===" "?" ":v,m==="words"&&x<c.length-1&&" "]},x)})})},J=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,X=`
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
`,Z=({color:n=[1,1,1],amplitude:a=1,distance:h=0,enableMouseInteraction:m=!1,...s})=>{const u=E(null),o=E();return _(()=>{if(!u.current)return;const i=u.current,p=new z({alpha:!0}),r=p.gl;r.clearColor(0,0,0,0),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),i.appendChild(r.canvas);const P=new F(r),c=new O(r,{vertex:J,fragment:X,uniforms:{iTime:{value:0},iResolution:{value:new A(r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height)},uColor:{value:new A(...n)},uAmplitude:{value:a},uDistance:{value:h},uMouse:{value:new Float32Array([.5,.5])}}}),S=new G(r,{geometry:P,program:c});function y(){const{clientWidth:t,clientHeight:d}=i;p.setSize(t,d),c.uniforms.iResolution.value.r=t,c.uniforms.iResolution.value.g=d,c.uniforms.iResolution.value.b=t/d}window.addEventListener("resize",y),y();let f=[.5,.5],g=[.5,.5];function k(t){const d=i.getBoundingClientRect(),w=(t.clientX-d.left)/d.width,v=1-(t.clientY-d.top)/d.height;g=[w,v]}function b(){g=[.5,.5]}m&&(i.addEventListener("mousemove",k),i.addEventListener("mouseleave",b));function l(t){m?(f[0]+=.05*(g[0]-f[0]),f[1]+=.05*(g[1]-f[1]),c.uniforms.uMouse.value[0]=f[0],c.uniforms.uMouse.value[1]=f[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=t*.001,p.render({scene:S}),o.current=requestAnimationFrame(l)}return o.current=requestAnimationFrame(l),()=>{o.current&&cancelAnimationFrame(o.current),window.removeEventListener("resize",y),m&&(i.removeEventListener("mousemove",k),i.removeEventListener("mouseleave",b)),i.contains(r.canvas)&&i.removeChild(r.canvas),r.getExtension("WEBGL_lose_context")?.loseContext()}},[n,a,h,m]),e("div",{ref:u,className:"threads-container",...s})};function ee({text:n,speed:a=10}){const[h,m]=N("");_(()=>{m("")},[n]),_(()=>{let o=0;const i=setInterval(()=>{m(p=>p+n.charAt(o)),o++,o>=n.length&&clearInterval(i)},a);return()=>clearInterval(i)},[n,a]);const u=h.replace(/br/g,"@@DOUBLE@@").replace(/\n/g,"@@SINGLE@@").split(/(@@DOUBLE@@|@@SINGLE@@)/).map((o,i)=>o==="@@DOUBLE@@"?e("span",{children:[e("br",{}),e("br",{})]},i):o==="@@SINGLE@@"?e("br",{},i):e("span",{children:o},i));return e("pre",{children:u})}const te=()=>e("section",{className:"techstack",children:[e("div",{className:"threads-text-container",children:[e(Z,{amplitude:4,distance:0,enableMouseInteraction:!1}),e(K,{text:"What I Use",delay:150,animateBy:"words",direction:"top"})]}),e("div",{className:"terminal-container",children:[e("div",{className:"terminal-header",children:[e("div",{className:"circle red"}),e("div",{className:"circle yellow"}),e("div",{className:"circle green"}),e("div",{className:"terminal-title",children:"Terminal"})]}),e("div",{className:"terminal-body",children:[e("p",{children:"$ cat techstack.txt"}),e(ee,{text:`Tech Stack Overview
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
    `})]})]})]}),R=16,ne={type:"spring",stiffness:300,damping:30};function M({items:n,baseWidth:a=300,...h}){const s=a-32,u=s+R,o=[...n,n[0]],[i,p]=N(0),r=H(0),[P,c]=N(!1),[S,y]=N(!1),f=E(null);_(()=>{const l=f.current;if(!l)return;const t=()=>c(!0),d=()=>c(!1);return l.addEventListener("mouseenter",t),l.addEventListener("mouseleave",d),()=>{l.removeEventListener("mouseenter",t),l.removeEventListener("mouseleave",d)}},[]),_(()=>{if(P)return;const l=setInterval(()=>{p(t=>t===n.length-1?t+1:t===o.length-1?0:t+1)},3e3);return()=>clearInterval(l)},[P,o.length]);const g=S?{duration:0}:ne,k=()=>{i===o.length-1&&(y(!0),r.set(0),p(0),setTimeout(()=>y(!1),50))},b=(l,t)=>{t.offset.x<0?p(w=>w+1):p(w=>w===0?n.length-1:w-1)};return e("div",{ref:f,className:"carousel-container",style:{width:`${a}px`,height:`${a}px`,borderRadius:"50%",...h},children:[e(C.div,{className:"carousel-track",drag:"x",style:{width:s,gap:`${R}px`,perspective:1e3,perspectiveOrigin:`${i*u+s/2}px 50%`,x:r},onDragEnd:b,animate:{x:-(i*u)},transition:g,onAnimationComplete:k,children:o.map((l,t)=>{const d=[-(t+1)*u,-t*u,-(t-1)*u],v=j(r,d,[90,0,-90],{clamp:!1});return e(C.div,{className:"carousel-item",style:{width:s,height:s,rotateY:v,borderRadius:"50%"},transition:g,onClick:()=>a<300&&window.open(l.link,"_blank"),children:[e("div",{className:"carousel-item-header",children:e("img",{src:`/images/${l.image}`,className:"carousel-icon-container"})}),e("div",{className:"carousel-item-content",children:[e("div",{className:"carousel-item-title",children:l.title}),a>=300&&e("button",{onClick:()=>window.open(l.link,"_blank"),children:"Show Me!"})]})]},t)})}),a>=300&&e("div",{className:"carousel-indicators",children:n.map((l,t)=>e(C.div,{className:`carousel-indicator ${i%n.length===t?"active":"inactive"}`,onClick:()=>p(t)},t))})]})}const ie=[{title:"Python Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/632ad715175d"},{title:"CSS Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/8a3506633a04"},{title:"SQL Advanced",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/c8e92d721d55"},{title:"Node Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/b457e9882934"}],re=[{title:"Problem Solving Basic",image:"hackerrank.webp",link:"https://www.hackerrank.com/certificates/229c2962f74e"},{title:"AWS Cloud Practitioner",image:"aws.webp",link:"https://www.credly.com/badges/a3225cb1-00ff-4622-855c-cbb1b6d9545f"},{title:"AWS Academy Graduate - Cloud Foundations - Training",image:"aws.webp",link:"https://www.credly.com/badges/bdf09803-0ff2-43c4-b69e-752ae61fa70d"},{title:"Basic Proficiency in KNIME Analytics Platform",image:"knime.webp",link:"https://www.credly.com/badges/18f7f414-e178-4a23-93a1-109c89e42dd0"},{title:"Networking Basic",image:"cisco.webp",link:"https://www.credly.com/badges/f9fb7756-142f-4ce1-b56f-aece364bfeda/public_url"}],ae=()=>{const[n,a]=N(window.innerWidth);return _(()=>{const h=()=>{a(window.innerWidth)};return window.addEventListener("resize",h),()=>window.removeEventListener("resize",h)},[]),e("div",{className:"certs",children:[e("h2",{style:{gridArea:"header"},children:"Certifications"}),e("h3",{style:{gridArea:"sub2"},children:"Technical"}),e("h3",{style:{gridArea:"sub1"},children:"General"}),e(M,{items:ie,gridArea:"content2",baseWidth:n>=500?300:200}),e(M,{items:re,gridArea:"content1",baseWidth:n>=500?300:200})]})},ce=()=>{const n=W();return _(()=>{document.title="Dylan Yeo Portfolio | Home"},[]),e("main",{children:[e(U,{}),e(Y,{}),e(te,{}),e(ae,{}),e("h2",{className:"redirect-header",children:"Want to know more?"}),e("div",{className:"redirect-container",children:[e("div",{className:"redirect",style:{"--icon":'"\\f135"'},children:[e("p",{children:"Explore My Experience"}),e("p",{children:"Discover my professional journey and projects"}),e("a",{onClick:()=>n("/experience"),children:"View Experience"})]}),e("div",{className:"redirect",style:{"--icon":'"\\f82d"'},children:[e("p",{children:"Get In Touch"}),e("p",{children:"Feel free to reach out for collaborations or opportunities"}),e("a",{onClick:()=>n("/contact"),children:"Contact Me"})]})]})]})};export{ce as default};
