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
            <div className='formSectionRWD'>
                <MainTheme/>
                <StepsInstruction/>
            </div>

            {/* <BearImg/> */}
            <LeaveThingsForm/>  

            {/* <div >
                <ThingsImg2/>
                <ContactForm/>
            </div>

            <div className='footerBox' id='section5'>
                <p>Copyright by Coders Lab</p>
                <img src={FbIcon} alt='facebook'/>
                <img src={InstaIcon} alt='instagram'/>
            </div> */}

            <EnderBox />
            <FooterBox/>          
        </>
    )
}

export default LeaveThingsSection