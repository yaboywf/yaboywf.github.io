import '../styles/certs.scss'

const Certs = () => {
    const content = Array.from({ length: 12 }, (_, index) => (index + 1).toString());

    return (
        <section className="certs">
            <h2>Certificates</h2>
            <div className="scroll" style={{ '--time': '250s' }}>
                <div>
                    {content.map(item => <img key={item} height={400} src={`/images/cert${item}.webp`} alt={item}/>)}
                </div>
                <div>
                    {content.map(item => <img key={item} height={400} src={`/images/cert${item}.webp`} alt={item}/>)}
                </div>
            </div>
        </section>
    );
}

export default Certs