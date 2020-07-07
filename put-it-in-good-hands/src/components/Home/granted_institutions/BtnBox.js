import React from 'react';
import FundationBtn from './FundationBtn';
import LocalCollectionBtn from './LocalCollectionBtn';
import NonGovernOrgBtn from './NonGovernOrgBtn';

export default (props) =>{
    return (
        <div className='btnBox'>
            <LocalCollectionBtn handleLocalCol={props.handleLocalCol}/>
            <NonGovernOrgBtn handleNonGovOrg={props.handleNonGovOrg}/>
            <FundationBtn handleFundation={props.handleFundation}/>
        </div>
    )
}