import React,{useEffect, useContext} from 'react';
import HomeNav from './Home/welcome_section/HomeNav';
import MainIdea from './Home/welcome_section/MainIdea'
import FourSteps from './Home/four_steps/FourSteps';
import FourStepsInstruction from './Home/four_steps/FourStepsInstruction';
import ThreeColumns from './Home/welcome_section/ThreeColumns';
import PutThingsBtn from './Home/four_steps/PutThingsBtn';
import AboutUsBox from './Home/about_us/AboutUsBox';
import WhoWeHelp from './Home/granted_institutions/WhoWeHelp';
import OrgBox from './Home/granted_institutions/OrgBox';
import EnderBox from './Home/ending_section/EnderBox';
import FooterBox from './Home/ending_section/footer/FooterBox';
import {AuthContext} from '../App';

export default () => {

    const {setIsHome,setIsForm}=useContext(AuthContext);
    
    useEffect( () => {
        setIsForm(false);
        setIsHome(true);
    },[setIsHome,setIsForm])

    return (
        <>
            <HomeNav/>
            <MainIdea/>
            <ThreeColumns/>
            <FourSteps/>
            <FourStepsInstruction/>
            <PutThingsBtn/>
            <AboutUsBox/>
            <WhoWeHelp/>
            <OrgBox/>
            <EnderBox/>
            <FooterBox/>
        </>
    )
}