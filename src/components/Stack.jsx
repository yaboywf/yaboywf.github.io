import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import './stack.scss';

function CardRotate({ children, onSendToBack, sensitivity }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className="card-rotate"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function Stack({
    sensitivity = 10,
    cardsData = [],
    ...rest
}) {
    const [cards, setCards] = useState(cardsData);
    const [cardDimensions, setCardDimensions] = useState(() =>
        window.innerWidth < 800
            ? { width: 210, height: 210 }
            : { width: 300, height: 300 }
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setCardDimensions({ width: 210, height: 210 });
            } else {
                setCardDimensions({ width: 300, height: 300 });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sendToBack = id => {
        setCards(prev => {
            const newCards = [...prev];
            const index = newCards.findIndex(card => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card);
            return newCards;
        });
    };

    return (
        <div
            className="stack-container"
            style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                perspective: 600,
                ...rest
            }}
        >
            {cards.map((card, index) => (
                <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
                    <motion.div
                        className="card"
                        animate={{
                            rotateZ: (cards.length - index - 1) * 4,
                            scale: 1 + index * 0.06 - cards.length * 0.06,
                            transformOrigin: '90% 90%'
                        }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ width: cardDimensions.width, height: cardDimensions.height }}
                    >
                        <img src={card.img} alt={`card-${card.id}`} />
                        <h3>{card.title}</h3>
                        <p>{card.subtitle}</p>
                    </motion.div>
                </CardRotate>
            ))}
        </div>
    );
}
