import React from 'react';
import step1 from '../../../assets/Icon-1.svg';
import step2 from '../../../assets/Icon-2.svg';
import step3 from '../../../assets/Icon-3.svg';
import step4 from '../../../assets/Icon-4.svg';

export default () => {
    return(
        <div className='fourStepsBox'>
            <div className="step">
                <img className='stepImg' src={step1} alt='cloth'/>
                <h3>Wybierz rzeczy</h3>
                <p>ubrania, zabawki, sprzęt i inne</p>
            </div>
            <div className="step">
                <img className='stepImg' src={step2} alt='bag'/>
                <h3>Spakuj je</h3>
                <p>skorzystaj z worków na śmieci</p>
            </div>
            <div className="step">
                <img className='stepImg' src={step3} alt='search'/>
                <h3>Zdecyduj komu chcesz pomóc</h3>
                <p>wybierz zaufane miejsce</p>
            </div>
            <div className="step">
                <img className='stepImg' src={step4} alt='loop'/>
                <h3>Zamów kuriera</h3>
                <p>kurier przyjedzie w dogodnym terminie</p>
            </div>
        </div>
    )
}