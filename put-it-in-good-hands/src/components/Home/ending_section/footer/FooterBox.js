import React, {useContext} from 'react';
import {AuthContext} from '../../../../App';
import Copywrite from '../footer/Copywrite';
import SocialMedia from '../footer/SocialMedia';
import classnames from 'classnames';

export default () =>{

    const {isForm} = useContext(AuthContext);

    return (
        <div className={classnames('footerBox',{footerBoxCorrect:isForm})} id='section5'>
            <Copywrite/>
            <SocialMedia/>
        </div>
    )
}