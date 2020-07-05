import React from 'react';
import FundationBtn from './FundationBtn';
import LocalCollectionBtn from './LocalCollectionBtn';
import NonGovernOrgBtn from './NonGovernOrgBtn';

export default () =>{
    return (
        <div className='btnBox'>
            <LocalCollectionBtn/>
            <NonGovernOrgBtn/>
            <FundationBtn/>
        </div>
    )
}