import React,{useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../App';
import decoration from '../../assets/Decoration.svg';
import YellowBelt from './YellowBelt';
import EnderBox from '../Home/ending_section/EnderBox';
import FooterBox from '../Home/ending_section/footer/FooterBox';
import firebase from "firebase/app";
import 'firebase/database';
import $ from 'jquery';
import Inputmask from 'inputmask';

const LeaveThingsForm = () => {

    //LOGIC:
    const [step,setStep]=useState(1);
    const {user,setIsHome,isTogether} = useContext(AuthContext);
    //WARNINGS STATES:
    const [alert,setAlert]=useState(false);
    const [cityAlert,setCityAlert]=useState(false);
    const [beneficiaryAlert,setBeneficiaryAlert]=useState(false);
    const [streetAlert,setStreetAlert]=useState(false);
    const [townAlert,setTownAlert]=useState(false);
    const [zipCodeAlert,setZipCodeAlert]=useState(false);
    const [numberAlert,setNumberAlert]=useState(false);
    const [dateAlert,setDateAlert]=useState(false);
    const [hourAlert,setHourAlert]=useState(false);

    useEffect( () => {
        setIsHome(false);
    },[setIsHome])

    //STEP 1:
    const [kindOfThings,setKindOfThings]=useState(null);

    const handleThings = (e) => {
        const {value} = e.target;
        setKindOfThings(value);
        setAlert(false);
    };

    const handleStep1 = (e) => {
        e.preventDefault()
        if(kindOfThings != null){
            setStep(2);
        } else {
            setAlert(true);
        };
    }; 

    //STEP 2:
    const [quantOfBags,setQuantOfBags]=useState('wybierz');
    const handleBags = (e) => {
        const {value} = e.target;
        setQuantOfBags(value);
        setAlert(false);
    };

    const handleStep2 = () => {
        if(quantOfBags !== 'wybierz'){           
            setAlert(false);
            setStep(3);
        } else {
            setAlert(true);
        };
    }; 

    const prevStep2 = () => {
        setStep(1);
        setAlert(false);
    }

    //STEP 3:
    const [town,setTown]=useState('wybierz');
    const handleTown = (e) => {
        const {value} = e.target;
        setTown(value);
        setCityAlert(false);
    };

    const [whoHelp,setWhoHelp]=useState([]);
    const handleWhoHelp= (e) => {
        const {value} = e.target;
        const copy = [...whoHelp];
        const has  = copy.includes(value);
        let result;
        if (has) {
            result = copy.filter(item => item !== value)
        } else {
            result = [...copy, value]
        };
        setWhoHelp(result);
        setBeneficiaryAlert(false);
    };

    const [isActiveColor1,setIsActiveColor1]=useState(false);
    const [isActiveColor2,setIsActiveColor2]=useState(false);
    const [isActiveColor3,setIsActiveColor3]=useState(false);
    const [isActiveColor4,setIsActiveColor4]=useState(false);
    const [isActiveColor5,setIsActiveColor5]=useState(false);

    const [whatOrg, setWhatOrg]=useState('');
    const handleOrg = (e) => {
        const {value}=e.target;
        setWhatOrg(value);
        setAlert(false);
    }

    const handleStep3 = () => {
        if (town==='wybierz'){
            setCityAlert(true);
        }
        if(whoHelp.length===0){
            setBeneficiaryAlert(true);
        }
        if(town!=='wybierz' && whoHelp.length!==0){
            setAlert(false);
            setStep(4);
        };
    };

    const prevStep3 = () => {
        setStep(2);
        setAlert(false);
    }

    //STEP 4:
    const [userData,setUserData]=useState({street:'',city:'', zipCode:'', phoneNo:'',date:'', hour:'', comments:''});

    const handleChange = (e) =>{
        const {name, value}=e.target;
        
        setUserData( prevState =>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }
    //INPUT MASKS (Inputmask library):
    const zipCodeMask = new Inputmask("99-999");
    zipCodeMask.mask($("#zipCode"));        
    const phoneMask = new Inputmask("999-999-999");
    phoneMask.mask($("#phone"));


    const handleStep4 = () => {

        //VALIDATION FUNCTIONS:
        const hasNumber = (myString) => {
            return /\d/.test(myString);
        };
        const streetResult=hasNumber(userData.street);

        const isZipCode = (zipCode) => {
            return /^\d\d-\d\d\d$/.test(zipCode)
        };
        const zipCodeResult = isZipCode(userData.zipCode);

        const isPhoneNo = (phoneNo) => {
            return /^\d{3}-\d{3}-\d{3}$/.test(phoneNo)
        };
        const phoneResult = isPhoneNo(userData.phoneNo);

        const isDate = (date) => {
            const now = new Date();
            const actualDate = `${now.getFullYear()}-${removeZeros(now.getMonth()+1)}-${removeZeros(now.getDate()+1)}`

            if(date<actualDate){
                return false
            }
            if( /^202\d-\d\d-\d\d$/.test(date) || /^\d\d-\d\d-202\d$/.test(date)){
                return true
            }
        };

        const dateResult = isDate(userData.date);

        const isHour = (hour) => {
            if(hour<"08:00" || hour>"18:00"){
                return false
            }
            return /^\d\d:\d\d$/.test(hour)
        };
        const hourResult = isHour(userData.hour);
        //END VALIDATION FUNCTIONS//

        //VALIDATION:
        if (userData.street.length<2 || !streetResult){
            setStreetAlert(true);
        }else{
            setStreetAlert(false);
        }

        if (userData.city.length<2){
            setTownAlert(true);
        }else{
            setTownAlert(false);
        }

        if (!zipCodeResult){
            setZipCodeAlert(true);
        }else{
            setZipCodeAlert(false);
        }

        if (!phoneResult){
            setNumberAlert(true);
        }else{
            setNumberAlert(false);
        }

        if (!dateResult){
            setDateAlert(true);
        }else{
            setDateAlert(false);
        }

        if (!hourResult){
            setHourAlert(true);
        }else{
            setHourAlert(false);
        }

        if(userData.street.length>=2 && streetResult && userData.city.length>=2 && zipCodeResult && phoneResult && dateResult && hourResult){
            setStep(5);
        }
        // END VALIDATION //
    } 

    const prevStep4 = () => {
        setStep(3);
        setAlert(false);
    }

    //STEP 5:   
    const handleStep5 = () => {
        setStep(6);

        const orderData={id:user.id, email:user.email, password: user.password, actualOrder:{ kindOfThings:kindOfThings, quantOfBags:quantOfBags, town:town, whoHelp:whoHelp, whatOrg:whatOrg, street:userData.street ,city:userData.city, zipCode:userData.zipCode, phoneNo:userData.phoneNo,date:userData.date, hour:userData.hour, comments:userData.comments}}

        //CODE IS IMPLEMENTED BY TWO SOLUTION: JSONSERVER AND FIREBASE. DEFAULT IS FIREBASE. YOU CAN COMMENT FIRST SOLUTION AND UNCOMMENT SECOND TO CHECK HOW DOES IT WORK.

        //FIREBASE:
        firebase.database().ref(`users/${user.id}`).set(orderData)

        //JSONSERVER:
        // fetch(`http://localhost:3005/users/${user.id}`,{
        //     method:'PUT',
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify(orderData),
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:',data))
        // .catch(error => console.log('Error',error))

        //Cleaning:
        setKindOfThings(null);
        setQuantOfBags('wybierz');
        setTown('wybierz');
        setWhoHelp([]);
        setIsActiveColor1(false);
        setIsActiveColor2(false);
        setIsActiveColor3(false);
        setIsActiveColor4(false);
        setIsActiveColor5(false);
        setWhatOrg('');
        setUserData({street:'',city:'', zipCode:'', phoneNo:'',date:'', hour:'', comments:''});
    }
    //END LOGIC//

    //DISPLAY CASES:
    const now = new Date();
    const removeZeros = (calendarNumber) => {
        if(calendarNumber<10){
            return "0"+calendarNumber
        }
        return calendarNumber
    }

    const afterActualDate = `${now.getFullYear()}-${removeZeros(now.getMonth()+1)}-${removeZeros(now.getDate()+1)}`

    switch (step) {
        case 1:
            return (
                <>
                    <YellowBelt text={isTogether ? 'Powiedz znajomym o akcji i zbierzcie więcej rzeczy w jedno miejsce!' : 'Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu bedziemy wiedzieć komu najlepiej je przekazać.'}/>
                    <div className='leaveThingsForm' id='section-form'>
                        <form onSubmit={handleStep1}>

                            <span>krok 1/4</span>
                            
                            <h1>Zaznacz co chcesz oddać:</h1><br/>

                            <div className='chooseElement'>
                                <input checked={kindOfThings==='ubrania, które nadają się do ponownego użycia'} type="radio" name="things" value='ubrania, które nadają się do ponownego użycia' onChange={handleThings}></input>
                                <label> ubrania, które nadają się do ponownego użycia</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings==='ubrania do wyrzucenia'} type="radio" name="things" value='ubrania do wyrzucenia' onChange={handleThings}></input>
                                <label> ubrania do wyrzucenia</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings==='zabawki'} type="radio" name="things" value='zabawki' onChange={handleThings}></input>
                                <label> zabawki</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings==='książki'} type="radio" name="things" value='książki' onChange={handleThings}></input>
                                <label> książki</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings==='inne'} type="radio" name="things" value='inne' onChange={handleThings}></input>
                                <label> inne</label><br/>
                            </div>
                            <div className='warningFormDivs'>{alert ? <strong className='formAlert'>Wybierz kategorie, którą chcesz oddać</strong> : null}</div>
                            <div className='btnBox btnBoxCorrect'>
                                <button type='submit' className='btn btnCorrect' >Dalej</button>
                            </div>
                        </form>
                        
                    </div>  
                    <EnderBox />
                    <FooterBox/>          
                </>
            );
            
        case 2:
            return (
                <>
                    <YellowBelt text='Wszystkie rzeczy zapakuj w 60l worki.'/>
                    <div className='leaveThingsForm'>
                        <span>krok 2/4</span>
                        <h1>Podaj liczbę wykorzystanych worków:</h1><br/>
                        <div className='step2Box'>
                            <p>Liczba 60l worków:</p>
                            <select value={quantOfBags} onChange={handleBags}>
                                <option value='wybierz'>---wybierz---</option>
                                {/* i used 'selected' to change permament input color (when we click next and then prev, input lost his color)*/}
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                    <div className='warningFormDivs'>{alert ? <strong className='formAlert'>Wybierz ilość worków do oddania</strong> : null}</div>
                    <div className='btnBox btnBoxCorrect'>
                            <button className='btn btnCorrect' onClick={prevStep2}>Wstecz</button>
                            <button className='btn btnCorrect btnRightCorrect' onClick={handleStep2}>Dalej</button>
                        </div>
                    </div>
                    <EnderBox />
                    <FooterBox/>          
                </>
            );

        case 3:
            return (
                <>
                    <YellowBelt text='Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę organizacji z którymi współpracujemy'/>
                    <div className='leaveThingsForm'>

                        <span>krok 3/4</span>

                        <h1>Lokalizacja:</h1>                    
                        <select value={town} className='citySelect' onChange={handleTown}>
                            <option value='wybierz'>---wybierz---</option>
                            {/* i used 'selected' to change permament input color (when we click next and then prev, input lost his color)*/}
                            <option value="Poznań">Poznań</option>
                            <option value="Warszawa">Warszawa</option>
                            <option value="Kraków">Kraków</option>
                            <option value="Wrocław">Wrocław</option>
                            <option value="Katowice">Katowice</option>
                        </select>
                        <div className='warningFormDivs'>{cityAlert ? <strong className='formAlert'>Wybierz miasto</strong> : null}</div>

                        <h2>Komu chcesz pomóc:</h2>
                        <div className='chooseElementsBox'>
                            <div className='chooseElements'>
                                <label style={ isActiveColor1 ? {backgroundColor:'#FAD648'} : { backgroundColor:'#F0F1F1'}}>dzieciom
                                    <input type='checkbox' name="dzieciom" value='dzieciom' onClick ={() => setIsActiveColor1(prevState=>!prevState)} onChange={handleWhoHelp}></input>
                                </label>
                            </div>

                            <div className='chooseElements'>
                                <label style={ isActiveColor2 ? {backgroundColor:'#FAD648'} : { backgroundColor:'#F0F1F1'}}>samotnym matkom
                                    <input type='checkbox' name="samotnym matkom" value='samotnym matkom' onClick ={() => setIsActiveColor2(prevState=>!prevState)} onChange={handleWhoHelp}></input>
                                </label>
                            </div>

                            <div className='chooseElements'>
                                <label style={ isActiveColor3 ? {backgroundColor:'#FAD648'} : { backgroundColor:'#F0F1F1'}}>bezdomnym
                                    <input type='checkbox' name="bezdomnym" value='bezdomnym' onClick ={() => setIsActiveColor3(prevState=>!prevState)} onChange={handleWhoHelp}></input>
                                </label>

                            </div>

                            <div className='chooseElements'>
                                <label style={ isActiveColor4 ? {backgroundColor:'#FAD648'} : { backgroundColor:'#F0F1F1'}}>niepełnosprawnym
                                    <input type='checkbox' name="niepełnosprawnym" value='niepełnosprawnym' onClick ={() => setIsActiveColor4(prevState=>!prevState)} onChange={handleWhoHelp}></input>
                                </label>
                            </div>

                            <div className='chooseElements'>
                                <label style={ isActiveColor5 ? {backgroundColor:'#FAD648'} : { backgroundColor:'#F0F1F1'}}>osobom starszym
                                    <input type='checkbox' name="osobom starszym" value='osobom starszym' onClick ={() => setIsActiveColor5(prevState=>!prevState)} onChange={handleWhoHelp}></input>
                                </label>
                            </div>
                        </div>
                        <div className='warningFormDivs'>{beneficiaryAlert ? <strong className='formAlert'>Wybierz komu chcesz pomóc</strong> : null}</div>                                                             

                        <h2>Wpisz nazwę konretnej organizacji (opcjonalnie):</h2>
                        <textarea value={whatOrg} onChange={handleOrg}></textarea>

                        <div className='btnBox btnBoxCorrect'>
                            <button className='btn btnCorrect' onClick={prevStep3}>Wstecz</button>
                            <button className='btn btnCorrect btnRightCorrect' onClick={handleStep3}>Dalej</button>
                        </div>
                    </div>
                    <EnderBox />
                    <FooterBox/>          
                </>
            );

        case 4:
            return (
                <>
                    <YellowBelt text='Sprawdź dokładnie wpisane dane.'/>
                    <div className='leaveThingsForm'>

                        <span>krok 4/4</span>

                        <div className='formDateBoxes'>

                            <div className='dateBox'>
                            <h2>Adres odbioru:</h2>
                                <label>Ulica i numer:</label>
                                <input name='street' value={userData.street} onChange={handleChange}></input>
                                <div className='warningFormDivs'>{streetAlert ? <strong className='formAlert'>Podaj ulice wraz z numerem</strong> : null}</div>  

                                <label>Miasto:</label>
                                <input name='city' value={userData.city} onChange={handleChange}></input>
                                <div className='warningFormDivs'>{townAlert ? <strong className='formAlert'>Wpisz nazwe miasta </strong> : null}</div>  

                                <label>Kod pocztowy:</label>
                                <input id='zipCode' name='zipCode' value={userData.zipCode} type='tel' placeholder="__-___" onChange={handleChange}></input>
                                <div className='warningFormDivs'>{zipCodeAlert ? <strong className='formAlert'>Wprowadź kod pocztowy</strong> : null}</div>  

                                <label>Telefon komórkowy:</label>
                                <input id='phone' name='phoneNo' value={userData.phoneNo} type='tel' placeholder="___-___-___" onChange={handleChange}></input>
                                <div className='warningFormDivs'>{numberAlert ? <strong className='formAlert'>Wprowadź numer telefonu</strong> : null}</div>  
                            </div>

                            <div className='dateBox'>
                                <h2>Data odbioru:</h2>
                                <label>Data:</label>
                                <input type='date' name='date' min={afterActualDate} value={userData.date} onChange={handleChange}></input>
                                <div className='warningFormDivs'>{dateAlert? <strong className='formAlert'>Wprowadź poprawną datę</strong> : null}</div>  

                                <label>Godzina:</label>
                                <input type='time' name='hour' value={userData.hour} onChange={handleChange}></input>
                                <div className='warningFormDivs'>{hourAlert ? <strong className='formAlert'>Wprowadź godzinę z zakresu 8-18</strong> : null}</div>  

                                <label>Uwagi dla kuriera:</label>
                                <input className='lastInput' name='comments' value={userData.comments} onChange={handleChange}></input>
                            </div>
                            
                        </div>

                        <div className='btnBox btnBoxCorrect'>
                            <button className='btn btnCorrect' onClick={prevStep4}>Wstecz</button>
                            <button className='btn btnCorrect btnRightCorrect' onClick={handleStep4}>Dalej</button>
                        </div>
                    </div>
                    <EnderBox />
                    <FooterBox/>          
                </>
            );

        case 5:
            return (
                <>
                {/* <div className='emptyBelt'></div> */}
                    <div className='leaveThingsForm'>

                        <div className='sumUp'>
                            <h1 className='h1Padding'>Podsumowanie twojej darowizny:</h1>

                            <p>Ilość worków: {quantOfBags}</p>
                            <p>Zawartość: {kindOfThings}</p>
                            <p>Zostanie darowane: {whoHelp.map( (element,index) => <strong style={{display:'inline'}} key={index}>{index===whoHelp.length-1 ? element : element+', '} </strong> )}</p>
                            <p>Dla lokalizacji: {town}</p>
                            {/* <strong>Oddajesz:</strong>
                            <p>{quantOfBags} {quantOfBags===1 ? "worek" : "worki"}, {kindOfThings}, {whoHelp.map( (element,index) => <p key={index}>{element} </p> )}</p>
                            <p>dla lokalizacji: {town}</p> */}
                        </div>

                        <div className='formDateBoxes'>
                            <div className='dateBox'>
                                <h2>Adres odbioru:</h2>

                                <p>Ulica: {userData.street}</p>
                                <p>Miasto: {userData.city}</p>
                                <p>Kod pocztowy: {userData.zipCode}</p>
                                <p>Numer telefonu:{userData.phoneNo}</p>
                            </div>

                            <div className='dateBox'>

                                <h2>Data odbioru:</h2>
                                <p>Data: {userData.date}</p>
                                <p>Godzina: {userData.hour}</p>
                                <p>Uwagi dla kuriera: {userData.comments}</p>

                            </div>
                        </div>
                        <div className='btnBox btnBoxCorrect'>
                            <button className='btn btnCorrect' onClick={() => setStep(4)}>Wstecz</button>
                            <button className='btn btnCorrect btnRightCorrect' onClick={handleStep5}>Potwierdzam</button>
                        </div>
                    </div>   
                    <EnderBox correctPosition='correctPosition'/>
                    <FooterBox footerCorrectPosition='footerCorrectPosition'/>          
                </>             
            );

        case 6:
            return (
                <>
                    <div className='lastStepThanks'>
                        <h1>Dziękujemy za wypełnienie formularza.</h1>
                        <p>Na maila prześlemy wszelkie</p>
                        <p>informacje o odbiorze.</p>
                    </div>
                    <div className='decorationBox' style={{backgroundColor:'#F0F1F1', padding:'5vw'}}>
                        <img src={decoration} alt='decoration'/>
                    </div>
                    <EnderBox correctPosition2='correctPosition2'/>
                    <FooterBox footerCorrectPosition2='footerCorrectPosition2'/>          
                </>
            )
            default: 
                    return null;
    }
}

export default LeaveThingsForm;