import React,{useState, useEffect,useContext} from 'react';
import HomeNav from '../Home/welcome_section/HomeNav';
import MainTheme from './MainTheme';
import StepsInstruction from './StepsInstruction';
import BearImg from './BearImg';
import LeaveThingsForm from './LeaveThingsForm';
import EnderBox from '../Home/ending_section/EnderBox';
import FooterBox from '../Home/ending_section/footer/FooterBox';
import {AuthContext} from '../../App';



const LeaveThingsSection = () => {

    const {setIsForm, setIsHome}=useContext(AuthContext);

    useEffect ( () => {
        setIsForm(true);
        setIsHome(false);
    },[])

    return (
        <>
            <HomeNav/>
            <MainTheme/>
            <StepsInstruction/>
            {/* <BearImg/> */}
            <LeaveThingsForm/>  
            <EnderBox/>
            <FooterBox/>          
        </>
    )
}

export default LeaveThingsSection