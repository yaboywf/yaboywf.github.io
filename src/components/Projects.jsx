import React, { useEffect, useState } from "react";
import "../styles/projects.scss";
import axios from "axios";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("projects.json")
        .then(response => {
            console.log(response.data); 
            setProjects(response.data)
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <section className="projects">
            <h2>Projects</h2>
            <div>
                {Object.entries(projects).map(([key, value]) => {
                    return (
                        <div className="project" style={{ background: `url(images/${value.image}) center/contain no-repeat` }} key={key}>
                            <div>
                                <h3>{key}</h3>
                                <p>{value.usage.join(" | ")}</p>

                                <p>{value.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;

// Object.entries(data).forEach(([key, value]) => {
//     const projectsFormat = `
// <div class="project" style="--bg: url(/assets/images/projects/${value.image})">
//     <div>
//         <h3>${key}</h3>
//         <p>${value.usage.join(" | ")}</p>

//         <p>${value.description}</p>
//     </div>
// </div>`