import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import './scroll.scss';

const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({ items, baseWidth = 300, ...rest }) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = [...items, items[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const enter = () => setIsHovered(true);
        const leave = () => setIsHovered(false);
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);

        return () => {
            el.removeEventListener('mouseenter', enter);
            el.removeEventListener('mouseleave', leave);
        };
    }, []);

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev === items.length - 1) return prev + 1;
                if (prev === carouselItems.length - 1) return 0;
                return prev + 1;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [isHovered, carouselItems.length]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50); 
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        if (offset < 0) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
        }
    };

    return (
        <div
            ref={containerRef}
            className='carousel-container'
            style={{
                width: `${baseWidth}px`,
                height: `${baseWidth}px`,
                borderRadius: '50%',
                ...rest
            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
                    const outputRange = [90, 0, -90];
                    const rotateY = useTransform(x, range, outputRange, { clamp: false });
                    return (
                        <motion.div
                            key={index}
                            className='carousel-item'
                            style={{
                                width: itemWidth,
                                height: itemWidth,
                                rotateY: rotateY,
                                borderRadius: '50%'
                            }}
                            transition={effectiveTransition}
                            onClick={() => baseWidth < 300 && window.open(item.link, '_blank')}
                        >
                            <div className='carousel-item-header'>
                                <img src={`/images/${item.image}`} className="carousel-icon-container" />
                            </div>
                            <div className="carousel-item-content">
                                <div className="carousel-item-title">{item.title}</div>
                                {baseWidth >= 300 && <button onClick={() => window.open(item.link, '_blank')}>Show Me!</button>}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {baseWidth >= 300 && <div className="carousel-indicators">
                {items.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`carousel-indicator ${currentIndex % items.length === index ? 'active' : 'inactive'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>}
        </div>
    );
}
