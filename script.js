const techstack = document.querySelector(".techstack");
const techstackList = ["HTML", "React JS", "CSS", "SCSS", "JavaScript", "Python", "C++", "Javascript Express", "Python Flask", "Pygame", "MySQL", "SQLite", "Firebird SQL", "Dart", "Flutter", "Figma", "KNIME"];

if (techstack) {
    const techstackContent = techstackList.map(techstackItem => {
        const techstackLogo = techstackItem.toLowerCase().replaceAll(" ", "");
        return `
            <div>
                <div style="background: url('assets/images/techstack/${techstackLogo}.webp') center/contain no-repeat"></div>
                <p>${techstackItem}</p>
            </div>
        `;
    }).join("");

    techstack.innerHTML += techstackContent;
}

const workExperience = document.querySelector(".work_experience:not(#volunteer_experience) > div");
const workExperienceObject = {
    "Eventas Asia LLP": ["Event Facilitator for Team Building Event", "Part-time", "1 Day"],
    "Mercantile Pacific Asia Pte. Ltd.": ["Temporary Phone Handler", "Part-time", "2 Months"],
    "Singapore Post Ltd.": ["Temporary Phone Handler", "Full-time", "1 Month"]
};

if (workExperience) {
    const workExperienceContent = Object.entries(workExperienceObject).map(([key, value]) => {
        const workLogo = key.split(" ")[0].toLowerCase();
        return `
            <div>
                <h3 style="--bg: url(assets/images/work/${workLogo}.webp)">${key}</h3>
                <p>Job Scope</p>
                <p>${value[0]}</p>
                <p>Job Type</p>
                <p>${value[1]}</p>
                <p>Duration</p>
                <p>${value[2]}</p>
            </div>
        `;
    }).join("");

    workExperience.innerHTML += workExperienceContent;
}

const volunteerExperience = document.getElementById("volunteer_experience");
const volunteerExperienceObject = {
    "The Boys' Brigade 21st Singapore Company": "2 Months",
    "Singapore Computer Society": "1 Day",
}

if (volunteerExperience) {
    const volunteerExperienceContent = Object.entries(volunteerExperienceObject).map(([key, value]) => {
        const volunteerLogo = key.split(" ")[0].toLowerCase();
        return `
            <div>
                <h3 style="--bg: url(assets/images/volunteer/${volunteerLogo}.webp)">${key}</h3>
                <p>Duration</p>
                <p>${value}</p>
            </div>
        `;
    }).join("");

    volunteerExperience.querySelector("div").innerHTML += volunteerExperienceContent;
}

const projects = document.querySelector(".projects > div");

function projectsData() {
    fetch("assets/projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json()
    })
    .then(data => {
        Object.entries(data).forEach(([key, value]) => {
            const projectsFormat = `
                <div class="project" style="--bg: url(/assets/images/projects/${value.image})">
                    <div>
                        <h3>${key}</h3>
                        <p>${value.usage.join(" | ")}</p>
            
                        <p>${value.description}</p>
                    </div>
                </div>
            `;
    
            projects.innerHTML += projectsFormat;
        });
    })
    .catch(error => {
        console.error(error);
    });
}

if (projects) {
    projectsData()
}

function resizeIframe(iframe) {
    const iframeDoc = iframe.contentWindow.document;
    const body = iframeDoc.body;
    const html = iframeDoc.documentElement;

    const height = Math.min(body.scrollHeight, html.scrollHeight, body.clientHeight, html.clientHeight);
    iframe.style.height = height + 'px';
    iframe.style.overflow = 'hidden';
}

function setupIframeResizing() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        iframe.onload = () => {
            setTimeout(() => resizeIframe(iframe), 100);
        };
        
        if (iframe.contentWindow.document.readyState === 'complete') {
            setTimeout(() => resizeIframe(iframe), 100);
        }

        const interval = setInterval(() => {
            const height = iframe.contentWindow.document.documentElement.scrollHeight;
            if (iframe.style.height !== height + 'px') {
                iframe.style.height = height + 'px';
            } else {
                clearInterval(interval);
            }
        }, 500);
    });
}

window.addEventListener('load', setupIframeResizing);
window.addEventListener('resize', setupIframeResizing);
const observer = new MutationObserver(setupIframeResizing);
observer.observe(document.body, { childList: true, subtree: true });