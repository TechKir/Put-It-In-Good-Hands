import React,{useEffect,useContext} from 'react';
import HomeNav from '../Home/welcome_section/HomeNav';
import MainTheme from './MainTheme';
import StepsInstruction from './StepsInstruction';
import LeaveThingsForm from './LeaveThingsForm';
import {AuthContext} from '../../App';
// import EnderBox from '../Home/ending_section/EnderBox';
// import FooterBox from '../Home/ending_section/footer/FooterBox';



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

            {/* it was necessery to set up below components deeper - it helps me push additional CSS classes in step 5 and 6. Exacly ~'correctPositions' */}
            {/* <EnderBox />
            <FooterBox/>           */}
            
        </>
    )
}

export default LeaveThingsSection