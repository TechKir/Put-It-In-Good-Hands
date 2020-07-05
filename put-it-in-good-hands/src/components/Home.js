import React from 'react';
import HomeNav from './Home/welcome_section/HomeNav';
import MainIdea from './Home/welcome_section/MainIdea'
import FourSteps from './Home/four_steps/FourSteps';
import FourStepsInstruction from './Home/four_steps/FourStepsInstruction';
import ThreeColumns from './Home/three_columns/ThreeColumns';
import PutThingsBtn from './Home/four_steps/PutThingsBtn';
import AboutUsBox from './Home/about_us/AboutUsBox';
import GrantedInstitutions from './Home/granted_institutions/GrantedInstitutions';
import BtnBox from './Home/granted_institutions/BtnBox';
import OrgText from './Home/granted_institutions/OrgText';
import InstitutionBaseInfo from './Home/granted_institutions/InstitutionsBaseInfo';
import EnderBox from './Home/ending_section/EnderBox';
import FooterBox from './Home/ending_section/footer/FooterBox';

export default () => (
    <>
        <HomeNav/>
        <MainIdea/>
        <ThreeColumns/>
        <FourSteps/>
        <FourStepsInstruction/>
        <PutThingsBtn/>
        <AboutUsBox/>
        <GrantedInstitutions/>
        <BtnBox/>
        <OrgText/>
        <InstitutionBaseInfo/>
        <EnderBox/>
        <FooterBox/>
    </>
)