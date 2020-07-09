import React,{useState} from 'react';
import HomeNav from './Home/welcome_section/HomeNav';
import MainIdea from './Home/welcome_section/MainIdea'
import FourSteps from './Home/four_steps/FourSteps';
import FourStepsInstruction from './Home/four_steps/FourStepsInstruction';
import ThreeColumns from './Home/welcome_section/ThreeColumns';
import PutThingsBtn from './Home/four_steps/PutThingsBtn';
import AboutUsBox from './Home/about_us/AboutUsBox';
import WhoWeHelp from './Home/granted_institutions/WhoWeHelp';
import BtnBox from './Home/granted_institutions/BtnBox';
import OrgText from './Home/granted_institutions/OrgText';
import OrgBox from './Home/granted_institutions/OrgBox';
import EnderBox from './Home/ending_section/EnderBox';
import FooterBox from './Home/ending_section/footer/FooterBox';

export default () => {
    //This state helps render kinds of organizations(Fundation,NonGovOrg,LocalOrg) in OrgBox:
    const [kindOfOrg,setKindOfOrg]=useState(1);
    //This state helps setting paginations in OrgBox:
    const [paginationIndex,setPaginationIndex]=useState(0);

    const handleFundation = () => {
        setKindOfOrg(1)
        setPaginationIndex(0)
    };
    const handleNonGovOrg = () => {
        setKindOfOrg(2)
        setPaginationIndex(0)
    };
    const handleLocalCol = () => {
        setKindOfOrg(3)
        setPaginationIndex(0)
    };

    const handlePagination = index => {
        return setPaginationIndex(index)
    };

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
        <BtnBox handleFundation={handleFundation} handleNonGovOrg={handleNonGovOrg} handleLocalCol={handleLocalCol}/>
        <OrgText/>
        <OrgBox kindOfOrg={kindOfOrg} paginationIndex={paginationIndex} handlePagination={handlePagination}/>
        <EnderBox/>
        <FooterBox/>
    </>
    )
}