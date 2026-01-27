import styles from './reflections.module.scss';
// import HlsPlayer from './HLS';

const Reflections = () => {
    return (
        <div className={styles.reflections}>
            <h2>Reflections</h2>
            <div>
                {/* <HlsPlayer src="/gl/final/output.m3u8" forceMSE /> */}
                <img src="/images/reflect.png" alt="Reflections" />
                <article>
                    Across the semester, the PPMR framework provided a structured way for me to develop my learning journey while responding to facilitator feedback. Instead of treating each phase as separate, I gradually learned to view them as a continuous cycle that informed my decisions and improvements.
                    <br /><br />
                    During the planning phase, my initial ideas were ambitious but not always well-defined. While this showed motivation, it also made execution challenging at the start. Through facilitator guidance, I learned the importance of translating intentions into clear, actionable steps. This helped me establish a more realistic direction and made subsequent phases easier to manage. The key improvement was learning to plan with feasibility in mind rather than focusing only on outcomes.
                    <br /><br />
                    In the perform phase, consistent effort allowed me to make visible progress, especially when I followed a structured schedule. What worked well was maintaining discipline and adapting my routine when necessary. One example of adaptation was my decision to move away from using Simply Piano as the main learning tool, as I realised it was becoming too easy and no longer sufficiently challenging. Instead, I shifted towards learning through YouTube tutorials, which required greater independence and active listening. This change better supported skill development and encouraged deeper engagement with the learning process. However, not all aspects progressed evenly, as some areas required more focused attention than I initially allocated. This highlighted the need for flexibility in execution. By adjusting my approach mid-semester, I became more aware of how different tasks demanded different levels of time and effort.
                    <br /><br />
                    The monitoring phase was critical in identifying gaps that were not immediately obvious to me. Facilitator feedback helped me recognise that completion alone was insufficient without clear explanation and evidence of learning. While I had made early progress, the quality and clarity of documentation needed improvement. Acting on this feedback, I refined my work to better reflect my learning process and outcomes. This phase reinforced the importance of reviewing work critically rather than assuming it meets expectations.
                    <br /><br />
                    Finally, the reflection phase allowed me to consolidate my learning across the semester. Looking back, what went well was my willingness to accept feedback and make improvements iteratively. What did not go as well was my initial tendency to underestimate the depth required in reflection and documentation. This occurred because I focused more on doing than analysing. Moving forward, I will place greater emphasis on reflective thinking, ensuring that my actions, challenges, and improvements are clearly articulated and supported by evidence. Overall, the PPMR cycle has helped me become more intentional, adaptable, and reflective in managing my learning journey.
                </article>
            </div>
        </div>
    );
}

export default Reflections;