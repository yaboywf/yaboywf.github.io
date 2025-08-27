import "../styles/education.scss";

const Education = () => {
    return (
        <section className="education">
            <h2>Education</h2>
            <div>
                <div>
                    <span></span>
                    <p>3</p>
                </div>

                <div className="info_box">
                    <div style={{ '--bg': `url('/images/tp.webp')` }} className="education-image">Temasek Polytechnic</div>

                    <div>
                        <p>Duration: 2024 - 2027</p>
                        <p>Leadership Roles:</p>
                        <ul>
                            <li>Member of Temasek LEADership Programme</li>
                            <li>Member of Informatics & IT Studies Club</li>
                            <li>Member of National Youth Achievement Award Student Interest Group (NYAASIG)</li>
                            <li>Student Representative for Singapore Computer Society</li>
                        </ul>
                        <p>Academic Achievements:</p>
                        <ul>
                            <li>Director's List (AY 2024/2025)</li>
                            <li>ASTAR Scholarship Recipient (2025)</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <span></span>
                    <p>2</p>
                </div>

                <div className="info_box">
                    <div style={{ '--bg': `url('/images/gm.webp')` }} className="education-image">Geylang Methodist School (Secondary)</div>

                    <div>
                        <p>Duration: 2020 - 2023</p>
                        <p>Leadership Roles:</p>
                        <ul>
                            <li>The Boys' Brigade 21<sup>st</sup> Company's Award Sergeant</li>
                            <li>Student Councilor</li>
                            <li>Orientation Group Leader</li>
                        </ul>
                        <p>Academic Achievements:</p>
                        <ul>
                            <li>The Boys' Brigade Founders' Award</li>
                            <li>Geylang Methodist School (Secondary) Colours Award</li>
                        </ul>
                        <p>Completion of GCE O-Level</p>
                    </div>
                </div>

                <div>
                    <span></span>
                    <p>1</p>
                </div>

                <div className="info_box">
                    <div style={{ '--bg': `url('/images/gm.webp')` }} className="education-image">Geylang Methodist School (Primary)</div>

                    <div>
                        <p>Duration: 2013 - 2019</p>
                        <p>Completion of PSLE</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;