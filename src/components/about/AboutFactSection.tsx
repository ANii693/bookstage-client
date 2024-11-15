"use client"
import React from 'react';
import CountUpContent from '../common/counter/CountUpContent';
const CounterItem = [
    {
        id: 1,
        number: 89,
        numberLetter: 'k+',
        title: 'Organic Products',
    },
    {
        id: 2,
        number: 80,
        numberLetter: 'k+',
        title: 'Metric to supplied',
    },
    {
        id: 3,
        number: 40,
        numberLetter: 'k+',
        title: 'Experienced Farmer',
    },
    {
        id: 4,
        number: 25,
        numberLetter: 'k+',
        title: 'Organic Awards',
    }
]

const AboutFactSection = () => {
    return (
        <section className="bd-counter__area-2 pb-70">
            <div className="counter-style-2">
                <div className="container">
                    <div className="row">
                    {CounterItem.map((item, num) => (
                        <div className="col-xl-3 col-lg-3 col-md-6" key={num}>
                            <div className="bd-counter__single-item mb-60">
                                <div className="bd-counter__content">
                                <span className="counter"><CountUpContent number={item.number} text={item.numberLetter} /></span>
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFactSection;