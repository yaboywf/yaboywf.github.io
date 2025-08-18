import { useState, useEffect } from 'react';
import '../styles/certs.scss'

const Certs = () => {
    const content = Array.from({ length: 13 }, (_, index) => (index + 1).toString());
    const [certIndex, setCertIndex] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCertIndex(prevIndex => prevIndex === 13 ? 1 : prevIndex + 1);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="certs">
            <h2>Certificates</h2>
            <div>
                <div className='controls'>
                    <i className='fas fa-chevron-left' aria-label="Previous certificate" onClick={() => setCertIndex(certIndex === 1 ? 13 : certIndex - 1)}></i>
                    <div className='cert_photo' style={{ background: `url('/images/cert${certIndex}.webp') center/contain no-repeat` }}></div>
                    <i className='fas fa-chevron-right' aria-label="Next certificate" onClick={() => setCertIndex(certIndex === 13 ? 1 : certIndex + 1)}></i>
                </div>
                <div className='certs_list'>
                    {content.map(contentItem => <input key={contentItem} type="radio" name="certs" id={contentItem} onChange={() => setCertIndex(parseInt(contentItem))} role="button" aria-label={`Select Certificate ${contentItem}`} checked={certIndex === parseInt(contentItem)} />)}
                </div>
            </div>
        </section>
    );
}

export default Certs