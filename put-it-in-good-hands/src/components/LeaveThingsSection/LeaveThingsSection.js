import React,{useEffect,useContext} from 'react';
import HomeNav from '../Home/welcome_section/HomeNav';
import MainTheme from './MainTheme';
import StepsInstruction from './StepsInstruction';
import LeaveThingsForm from './LeaveThingsForm';
import {AuthContext} from '../../App';

const LeaveThingsSection = () => {

    const {setIsForm, setIsHome}=useContext(AuthContext);

    useEffect ( () => {
        setIsForm(true);
        setIsHome(false);
    },[setIsForm, setIsHome])

    return (
        <>
            <HomeNav/>
            <div className='formSectionRWD'>
                <MainTheme/>
                <StepsInstruction/>
            </div>
            <LeaveThingsForm/>          
        </>
    )
}

export default LeaveThingsSection