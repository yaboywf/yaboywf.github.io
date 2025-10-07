const Work = () => {
    const workExperienceObject = {
        "aCcomerce Pte Ltd": ["Temporary Parcel Parker", "Part-time", "4 days"],
        "Outdoor Venture Pte Ltd": ["Sports Atrium Assistant/Packer ", "Part-time", "9 Days"],
        "Eventas Asia LLP": ["Event Facilitator for Team Building Event", "Part-time", "1 Day"],
        "Mercantile Pacific Asia Pte. Ltd.": ["Temporary Phone Handler", "Part-time", "2 Months"],
        "Singapore Post Ltd.": ["Temporary Phone Handler", "Full-time", "1 Month"],
    };

    return (
        <section className="work_experience">
            <h2>Work Experience</h2>
            <div>
                {Object.entries(workExperienceObject).map(([key, value]) => {
                    const workLogo = key.split(" ")[0].toLowerCase();
                    return (
                        <div key={workLogo}>
                            <h3 style={{ '--bg': `url(/images/${workLogo}.webp)` }}>{key}</h3>
                            <p>Job Scope</p>
                            <p>{value[0]}</p>
                            <p>Job Type</p>
                            <p>{value[1]}</p>
                            <p>Duration</p>
                            <p>{value[2]}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Work;