import React,{useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../App';
import decoration from '../../assets/Decoration.svg';
import YellowBelt from './YellowBelt';
//import Step1 from './Steps/Step1';
// import Step2 from './Steps/Step2';
// import Step3 from './Steps/Step3';
// import Step4 from './Steps/Step4';
// import Summary from './Steps/Summary';
// import Thanks from './Steps/Thanks';

const LeaveThingsForm = () => {

    //Logic:
    const [step,setStep]=useState(1);
    const {user,setIsHome} = useContext(AuthContext);
    const [alert,setAlert]=useState(false);

    useEffect( () => {
        setIsHome(false);
    },[])

    //Step 1:
    const [kindOfThings,setKindOfThings]=useState(null);

    const handleThings = (e) => {
        const {value} = e.target;
        setKindOfThings(value);
        setAlert(false);
    };

    const handleStep1 = () => {
        if(kindOfThings != null){
            setAlertText('');
            setStep(2);
        } else {
            setAlert(true);
        };
    }; 

    //Step 2:
    const [quantOfBags,setQuantOfBags]=useState('wybierz');
    const handleBags = (e) => {
        const {value} = e.target;
        setQuantOfBags(value);
        setAlert(false);
    };


    const handleStep2 = () => {
        if(quantOfBags != 'wybierz'){           
            setAlert(false);
            setAlertText('');
            setStep(3);
        } else {
            setAlert(true);
        };
    }; 

    //Step 3:
    const [town,setTown]=useState('wybierz');
    const handleTown = (e) => {
        const {value} = e.target;
        setTown(value);
    };

    const [whoHelp,setWhoHelp]=useState([]);
    const handleWhoHelp= (e) => {
        const {value} = e.target;
        const copy = [...whoHelp];
        const has  = copy.includes(value);
        let result;
        if (has) {
            result = copy.filter(item => item != value)
        } else {
            result = [...copy, value]
        };
        setWhoHelp(result);
        setAlert(false);
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
        if (town=='wybierz'){
            setAlertText('Wybierz miasto')
            setAlert(true)
        } else if(whoHelp.length==0){
            setAlertText('Wybierz komu chcesz pomóc')
            setAlert(true)
        } else {
            setAlert(false)
            setAlertText('')
            setStep(4)
        };
    };

    //Step 4:

    const [userData,setUserData]=useState({street:'',city:'', zipCode:'', phoneNo:'',date:'', hour:'', comments:''});
    const [alertText,setAlertText]=useState('')

    const handleChange = (e) =>{
        const {name, value}=e.target;
        
        setUserData( prevState =>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    const handleStep4 = () => {

        //validation functions:
        const hasNumber = (myString) => {
            return /\d/.test(myString);
        };
        const streetResult=hasNumber(userData.street);

        const isZipCode = (zipCode) => {
            return /^\d\d-\d\d\d$/.test(zipCode)
        };
        const zipCodeResult = isZipCode(userData.zipCode);

        const isPhoneNo = (phoneNo) => {
            return /^\d{9}$/.test(phoneNo)
        };
        const phoneResult = isPhoneNo(userData.phoneNo);

        const isDate = (date) => {
            return /^202\d-\d\d-\d\d$/.test(date)
        };
        const dateResult = isDate(userData.date);

        const isHour = (hour) => {
            return /^\d\d:\d\d$/.test(hour)
        };
        const hourResult = isHour(userData.hour);
        //end validation functions:

        //Validation:
        if (userData.street<=2){
            setAlert(true);
            setAlertText('Nazwa ulicy musi mieć conajmniej 2 znaki')
        } else if (streetResult==false){
            setAlert(true);
            setAlertText('musisz podać numer domu lub mieszkania')
        } else if (userData.city<=2){
            setAlert(true);
            setAlertText('Nazwa miasta musi mieć conajmniej 2 znaki')
        } else if (zipCodeResult==false){
            setAlert(true);
            setAlertText('Wpisz poprawny kod pocztowy')
        } else if (phoneResult==false){
            setAlert(true);
            setAlertText('Wpisz poprawny numer telefonu')
        } else if (dateResult==false){
            setAlert(true);
            setAlertText('Wpisz poprawny format daty - użyj ikony kalendarza')
        } else if (hourResult==false){
            setAlert(true);
            setAlertText('Wpisz poprawny format godziny - użyj ikony zegara')
        } else{
            setAlert(false);
            setAlertText('');
            setStep(5);
        }
        // End Validation
    } 

    //Step 5:

    const handleStep5 = () => {
        setStep(6);

        const orderData={email:user.email, password: user.password, actualOrder:{ kindOfThings:kindOfThings, quantOfBags:quantOfBags, town:town, whoHelp:whoHelp, whatOrg:whatOrg, street:userData.street ,city:userData.city, zipCode:userData.zipCode, phoneNo:userData.phoneNo,date:userData.date, hour:userData.hour, comments:userData.comments}}
        fetch(`http://localhost:3005/users/${user.id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => console.log('Success:',data))
        .catch(error => console.log('Error',error))

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
    //End Logic
    
    //Display:
    switch (step) {
        case 1:
            return (
                <>
                    <YellowBelt text='Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu bedziemy wiedzieć komu najlepiej je przekazać.'/>
                    <div className='leaveThingsForm'>
                        <form onSubmit={handleStep1}>
                            {/* <div className='step1'>
                                
                            </div> */}

                            <span>krok 1/4</span>
                            
                            <h1>Zaznacz co chcesz oddać:</h1><br/>

                            <div className='chooseElement'>
                                <input checked={kindOfThings=='ubrania, które nadają się do ponownego użycia'} type="radio" name="things" value='ubrania, które nadają się do ponownego użycia' onChange={handleThings}></input>
                                <label> ubrania, które nadają się do ponownego użycia</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings=='ubrania do wyrzucenia'} type="radio" name="things" value='ubrania do wyrzucenia' onChange={handleThings}></input>
                                <label> ubrania do wyrzucenia</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings=='zabawki'} type="radio" name="things" value='zabawki' onChange={handleThings}></input>
                                <label> zabawki</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings=='książki'} type="radio" name="things" value='książki' onChange={handleThings}></input>
                                <label> książki</label><br/>
                            </div>

                            <div className='chooseElement'>
                                <input checked={kindOfThings=='inne'} type="radio" name="things" value='inne' onChange={handleThings}></input>
                                <label> inne</label><br/>
                            </div>

                            {alert ? <div className='alert'><strong >Wybierz kategorie, którą chcesz oddać</strong></div> : null}
                            <div className='btnBox'>
                                <button type='submit' className='btn' >Dalej</button>
                            </div>
                        </form>

                    </div>  
                </>
            );
            
        case 2:
            return (
                <>
                    <YellowBelt text='Wszystkie rzeczy zapakuj w 60l worki.'/>
                    <div className='leaveThingsForm'>
                        <span>krok 2/4</span>
                        <h1>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h1><br/>
                        <div className='step2Box'>
                            <p>Liczba 60l worków:</p>
                            <select onChange={handleBags}>
                                <option value='wybierz'>---wybierz---</option>
                                {/* i used 'selected' to change permament input color (when we click next and then prev, input lost his color)*/}
                                <option selected={quantOfBags=='1'} value="1">1</option>
                                <option selected={quantOfBags=='2'} value="2">2</option>
                                <option selected={quantOfBags=='3'} value="3">3</option>
                                <option selected={quantOfBags=='4'} value="4">4</option>
                                <option selected={quantOfBags=='5'} value="5">5</option>
                            </select>
                        </div>

                    {alert ? <div className='alert'><strong >Wybierz ilość worków do oddania</strong></div> : null}
                    <div className='btnBox'>
                            <button className='btn' onClick={() => setStep(1)}>Wstecz</button>
                            <button className='btn' onClick={handleStep2}>Dalej</button>
                        </div>
                    </div>
                </>
            );

        case 3:
            return (
                <>
                    <YellowBelt text='Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę organizacji z którymi współpracujemy'/>
                    <div className='leaveThingsForm'>

                        <span>krok 3/4</span>

                        <h1>Lokalizacja:</h1>                    
                        <select className='citySelect' onChange={handleTown}>
                            <option value='wybierz'>---wybierz---</option>
                            {/* i used 'selected' to change permament input color (when we click next and then prev, input lost his color)*/}
                            <option selected={town=="Poznań"} value="Poznań">Poznań</option>
                            <option selected={town=="Warszawa"} value="Warszawa">Warszawa</option>
                            <option selected={town=="Kraków"} value="Kraków">Kraków</option>
                            <option selected={town=="Wrocław"} value="Wrocław">Wrocław</option>
                            <option selected={town=="Katowice"} value="Katowice">Katowice</option>
                        </select>

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
                                                                

                        <h2>Wpisz nazwę konretnej organizacji (opcjonalnie):</h2>
                        <textarea value={whatOrg} onChange={handleOrg}></textarea>

                        {alert ? <div className='alert'><strong >{alertText}</strong></div> : null}
                        <div className='btnBox'>
                            <button className='btn' onClick={() => setStep(2)}>Wstecz</button>
                            <button className='btn' onClick={handleStep3}>Dalej</button>
                        </div>
                    </div>
                </>
            );

        case 4:
            return (
                <>
                    <YellowBelt text='Sprawdź dokładnie wpisane dane.'/>
                    <div className='leaveThingsForm'>
                        <div className='formDateBoxes'>

                            <div className='dateBox'>
                            <h2>Adres odbioru:</h2>
                                <label>Ulica:</label>
                                <input name='street' value={userData.street} onChange={handleChange}></input>

                                <label>Miasto:</label>
                                <input name='city' value={userData.city} onChange={handleChange}></input>

                                <label>Kod pocztowy:</label>
                                <input name='zipCode' value={userData.zipCode} onChange={handleChange}></input>

                                <label>Telefon:</label>
                                <input name='phoneNo' value={userData.phoneNo} onChange={handleChange}></input>
                            </div>

                            <div className='dateBox'>
                                <h2>Data odbioru:</h2>
                                <label>Data:</label>
                                <input type='date' name='date' value={userData.date} onChange={handleChange}></input>

                                <label>Godzina:</label>
                                <input type='time' name='hour' value={userData.hour} onChange={handleChange}></input>

                                <label>Uwagi dla kuriera:</label>
                                <input className='lastInput' name='comments' value={userData.comments} onChange={handleChange}></input>
                            </div>
                            
                        </div>

                        {alert ? <div className='alert'> <strong>{alertText}</strong></div> : null}

                        <div className='btnBox'>
                            <button className='btn' onClick={() => setStep(3)}>Wstecz</button>
                            <button className='btn' onClick={handleStep4}>Dalej</button>
                        </div>
                    </div>
                </>
            );

        case 5:
            return (
                <div className='leaveThingsForm'>

                    <div className='sumUp'>
                        <h1 className='h1Padding'>Podsumowanie twojej darowizny</h1>

                        <strong>Oddajesz:</strong>
                        <p>{quantOfBags} {quantOfBags==1 ? "worek" : "worki"}, {kindOfThings}, {whoHelp.map( (element,index) => <p key={index}>{element} </p> )}</p>
                        <p>dla lokalizacji: {town}</p>
                    </div>

                    <div className='formDateBoxes'>
                        <div className='dateBox'>
                            <h2>Adres odbioru:</h2>

                            <p>Ulica: {userData.street}</p>
                            <p>Miasto: {userData.city}</p>
                            <p>Kod pocztowy: {userData.zipCode}</p>
                            <p>Numer telefonu: {userData.phoneNo}</p>

                        </div>

                        <div className='dateBox'>

                            <h2>Data odbioru:</h2>
                            <p>Data: {userData.date}</p>
                            <p>Godzina: {userData.hour}</p>
                            <p>Uwagi dla kuriera: {userData.comments}</p>

                        </div>
                    </div>
                    <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(4)}>Wstecz</button>
                        <button className='btn' onClick={handleStep5}>Potwierdzam</button>
                    </div>
                </div>                
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
                </>
            )
            default: 
                    return null;
    }
}

export default LeaveThingsForm;