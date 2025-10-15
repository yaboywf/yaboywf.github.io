import { useState, useEffect } from 'react';
import '../styles/certs.scss'

const Certs = () => {
    const num = 14
    const content = Array.from({ length: num }, (_, index) => (index + 1).toString());
    const [certIndex, setCertIndex] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCertIndex(prevIndex => prevIndex === num ? 1 : prevIndex + 1);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="certs">
            <h2>Certificates</h2>
            <div>
                <div className='controls'>
                    <i className='fas fa-chevron-left' onClick={() => setCertIndex(certIndex === 1 ? num : certIndex - 1)}></i>
                    <div className='cert_photo' style={{ background: `url('/images/cert${certIndex}.webp') center/contain no-repeat` }}></div>
                    <i className='fas fa-chevron-right' onClick={() => setCertIndex(certIndex === num ? 1 : certIndex + 1)}></i>
                </div>
                <div className='certs_list'>
                    {content.map(contentItem => <button key={contentItem} onClick={() => setCertIndex(parseInt(contentItem))} aria-label={contentItem} className={certIndex === parseInt(contentItem) ? 'active' : ''}></button>)}
                </div>
            </div>
        </section>
    );
}

export default Certs