import React from 'react';
import decoration from '../../../assets/Decoration.svg'
import LeaveStuffBox from './LeaveStuffBox';
export default () => {
    return(
        <div className='firstSectionBox'>
            <header className='mainIdea' id='section1'>
                <h1>Zacznij pomagać!<br/>Oddaj niechciane rzeczy w zaufane ręce</h1>
            </header>
            <LeaveStuffBox/>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
        </div>
    )
}