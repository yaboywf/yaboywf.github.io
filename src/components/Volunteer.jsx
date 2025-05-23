import "../styles/techstack.scss";

const Volunteer = () => {
    const volunteerExperienceObject = {
        "The Boys' Brigade 21st Singapore Company": "2 Months",
        "Singapore Computer Society": "3 Days",
        "NTUC Active Ageing Centre": "1 Day",
        "People's Association": "2 Days"
    };

    return (
        <section id="volunteer_experience" className="work_experience">
            <h2>Volunteer Experience</h2>

            <div>
                {Object.entries(volunteerExperienceObject).map(([key, value]) => {
                    const volunteerLogo = key.toLowerCase().replaceAll("'", "").replaceAll(" ", "");
                    return (
                        <div key={volunteerLogo}>
                            <h3 style={{ '--bg': `url(/images/${volunteerLogo}.webp)` }}>{key}</h3>
                            <p>Duration:</p>
                            <p>{value}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Volunteer;