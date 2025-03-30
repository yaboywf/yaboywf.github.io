const techstack = document.querySelector(".techstack > div");
const techstackList = ["HTML", "React JS", "CSS", "SCSS", "JavaScript", "Python", "C++", "Javascript Express", "Python Flask", "Pygame", "MySQL", "SQLite", "Firebird SQL", "Dart", "Flutter", "Figma", "KNIME"];

if (techstack) {
    techstackList.forEach(techstackItem => {
        const techstackLogo = techstackItem.toLowerCase().replaceAll(" ", "");
        const techstackFormat = `
            <div>
                <div style="background-image: url('images/techstack/${techstackLogo}.webp')"></div>
                <p>${techstackItem}</p>
            </div>
        `;
    
        techstack.innerHTML += techstackFormat;
    });
}

const workExperience = document.querySelector(".work_experience:not(#volunteer_experience) > div");
const workExperienceObject = {
    "Eventas Asia LLP": ["Event Facilitator for Team Building Event", "Part-time", "1 Day"],
    "Mercantile Pacific Asia Pte. Ltd.": ["Temporary Phone Handler", "Part-time", "2 Months"],
    "Singapore Post Ltd.": ["Temporary Phone Handler", "Full-time", "1 Month"]
}

if (workExperience) {
    Object.entries(workExperienceObject).forEach(([key, value]) => {
        const workExperienceFormat = `
            <div>
                <h3 style="--bg: url(images/work/${key.split(" ")[0].toLowerCase()}.webp)">${key}</h3>
                
                <p>Job Scope</p>
                <p>${value[0]}</p>

                <p>Job Type</p>
                <p>${value[1]}</p>

                <p>Duration</p>
                <p>${value[2]}</p>
            </div>
        `;

        workExperience.innerHTML += workExperienceFormat;
    });
}

const volunteerExperience = document.getElementById("volunteer_experience");
const volunteerExperienceObject = {
    "The Boys' Brigade 21st Singapore Company": "2 Months",
    "Singapore Computer Society": "1 Day",
}

if (volunteerExperience) {
    Object.entries(volunteerExperienceObject).forEach(([key, value]) => {
        const volunteerExperienceFormat = `
            <div>
                <h3 style="--bg: url(images/volunteer/${key.split(" ")[0].toLowerCase()}.webp)">${key}</h3>
                
                <p>Duration</p>
                <p>${value}</p>
            </div>
        `;

        volunteerExperience.querySelector("div").innerHTML += volunteerExperienceFormat;
    });
}

const projects = document.querySelector(".projects > div");

function projectsData() {
    fetch("projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json()
    })
    .then(data => {
        Object.entries(data).forEach(([key, value]) => {
            const projectsFormat = `
                <div class="project" style="--bg: url(images/projects/${value.image})">
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
    const height = iframe.contentWindow.document.documentElement.scrollHeight;
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
    });
}

window.addEventListener('load', setupIframeResizing);
const observer = new MutationObserver(setupIframeResizing);
observer.observe(document.body, { childList: true, subtree: true });