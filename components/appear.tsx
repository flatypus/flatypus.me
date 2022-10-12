import React from 'react';
import { Transition } from '@headlessui/react'
import { useInView } from 'react-intersection-observer';

export default function Appear({ children, delay = 0, x = 0, y = 0, opacity = 60, duration = 500 }: any) {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true
    });
    const enterFrom = `overflow-clip -translate-x-[${Math.abs(x)}px] opacity-[60%]`
    console.log(enterFrom)

    return (
        <>
            <Transition show={inView} appear={true}>
                <Transition.Child
                    enter={`duration-1000 delay-[${delay}ms]`}
                    enterFrom={enterFrom}
                    enterTo={`translate-x-0 opacity-100`}
                    leave={`transition-opacity duration-[${duration}ms]`}
                    leaveFrom={`translate-x-0 opacity-100`}
                    leaveTo={`translate-x-0 opacity-100`}>
                    <div>{children}</div>
                </Transition.Child>
            </Transition>
            <div ref={ref} />
        </>
    )
}