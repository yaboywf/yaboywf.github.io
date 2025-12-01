import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import './form.scss';

export default function Stepper({
    children,
    currentStep=1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    checkRequirements = async () => true,
    ...rest
}) {
    const [direction, setDirection] = useState(0);
    const [pageSize, setPageSize] = useState(window.innerWidth);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const handleResize = () => setPageSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateStep = newStep => {
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleNext = async () => {
        if (!isLastStep && await checkRequirements(currentStep)) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    return (
        <div className="outer-container" {...rest}>
            <h2 id='title'>Contact Me</h2>
            <div className='step-indicator-row'>
                {stepsArray.map((_, index) => {
                    const stepNumber = index + 1;
                    const isNotLastStep = index < totalSteps - 1;
                    return (
                        <React.Fragment key={stepNumber}>
                            <StepIndicator
                                step={stepNumber}
                                currentStep={currentStep}
                            />
                            {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                        </React.Fragment>
                    );
                })}
            </div>

            <StepContentWrapper
                isCompleted={isCompleted}
                currentStep={currentStep}
                direction={direction}
                className='step-content-default'
            >
                {stepsArray[currentStep - 1]}
            </StepContentWrapper>

            {(!isCompleted && currentStep !== 1) && (
                <div className='footer-container'>
                    <div className={`footer-nav ${currentStep !== 1 ? 'spread' : 'end'}`}>
                        {!isLastStep && <button onClick={() => navigate("/")} className="back-button">Return to Home</button>}
                        {currentStep !== 1 && <>
                            <button onClick={isLastStep ? () => navigate("/") : handleNext} className={`next-button ${isLastStep ? 'final' : ''}`}>
                                {isLastStep ? 'Return to Home' : 'Continue'}
                            </button>
                        </>}
                    </div>
                </div>
            )}
        </div>
    );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
    const [parentHeight, setParentHeight] = useState(0);

    return (
        <motion.div
            className={className}
            style={{ position: 'relative', overflow: 'hidden' }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: 'spring', duration: 0.4 }}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SlideTransition({ children, direction, onHeightReady }) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants = {
    enter: dir => ({
        x: dir >= 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: '0%',
        opacity: 1
    },
    exit: dir => ({
        x: dir >= 0 ? '-50%' : '50%',
        opacity: 0
    })
};

export function Step({ children }) {
    return <div className="step-default">{children}</div>;
}

function StepIndicator({ step, currentStep }) {
    const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

    return (
        <motion.div className="step-indicator" animate={status} initial={false}>
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
                    active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },
                    complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }
                }}
                transition={{ duration: 0.3 }}
                className="step-indicator-inner"
            >
                {status === 'complete' ? (
                    <svg className="check-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : status === 'active' ? (
                    <div className="active-dot" />
                ) : (
                    <span className="step-number">{step}</span>
                )}
            </motion.div>
        </motion.div>
    );
}

function StepConnector({ isComplete }) {
    const lineVariants = {
        incomplete: { width: 0, backgroundColor: 'rgba(0,0,0,0)' },
        complete: { width: '100%', backgroundColor: '#5227FF' }
    };

    return (
        <div className="step-connector">
            <motion.div
                className="step-connector-inner"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? 'complete' : 'incomplete'}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}
