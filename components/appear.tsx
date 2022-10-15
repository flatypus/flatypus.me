import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import { useInView } from 'react-intersection-observer';

export default function Appear({ children, delay = 0, enterTo = "translate-x-0 opacity-100 fade-in", duration = 500 }: any) {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true
    });
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(true)
            // delays 100ms to prevent flicker
        }, 100)
    }, [])
    return (
        <>
            <Transition show={inView} appear={true}>
                <Transition.Child
                    enter={`duration-1000 delay-[${delay}ms]`}
                    enterTo={enterTo}
                    leave={`transition-opacity duration-[${duration}ms]`}
                    leaveFrom={`translate-x-0 opacity-100`}
                    leaveTo={`translate-x-0 opacity-100`}>
                    <div className={!show ? "hidden" : ""}>{children}</div>
                </Transition.Child>
            </Transition>
            <div ref={ref}>{!show ? <div className='opacity-0'>{children}</div> : null}</div>
        </>
    )
}