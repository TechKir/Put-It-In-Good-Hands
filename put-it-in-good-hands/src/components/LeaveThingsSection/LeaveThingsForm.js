import React,{useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../App';
import decoration from '../../assets/Decoration.svg'
//import Step1 from './Steps/Step1';
// import Step2 from './Steps/Step2';
// import Step3 from './Steps/Step3';
// import Step4 from './Steps/Step4';
// import Summary from './Steps/Summary';
// import Thanks from './Steps/Thanks';

const LeaveThingsForm = () => {

    const [step,setStep]=useState(1);
    const {setIsHome} = useContext(AuthContext);

    useEffect( () => {
        setIsHome(false);
    },[])

    //Step 1:
    const [kindOfThings,setKindOfThings]=useState(null);
    const handleThings = (e) => {
        const {value} = e.target
        setKindOfThings(value)
    }

    //Step 2:
    const [quantOfBags,setQuantOfBags]=useState(1);
    const handleBags = (e) => {
        const {value} = e.target
        setQuantOfBags(value)
    }

    //Step 3:
    const [town,setTown]=useState('Poznań');
    const handleTown = (e) => {
        const {value} = e.target
        setTown(value)
    }

    const [whoHelp,setWhoHelp]=useState([]);
    const handleWhoHelp= (e) => {
        const {value} = e.target;
        const copy = [...whoHelp];
        const has  = copy.includes(value)
        let result;
        if (has) {
            result = copy.filter(item => item != value)
        } else {
            result = [...copy, value]
        }
        setWhoHelp(result)
    }

    const [isActiveColor1,setIsActiveColor1]=useState(false);
    const [isActiveColor2,setIsActiveColor2]=useState(false);
    const [isActiveColor3,setIsActiveColor3]=useState(false);
    const [isActiveColor4,setIsActiveColor4]=useState(false);
    const [isActiveColor5,setIsActiveColor5]=useState(false);

    const [whatOrg, setWhatOrg]=useState('');
    const handleOrg = (e) => {
        const {value}=e.target;
        setWhatOrg(value)
    }

    //Step 4:

    const [userData,setUserData]=useState({street:'',city:'', zipCode:'', phoneNo:'',date:'', hour:'', comments:''});

    const handleStreet = (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, street:value}
        })
    }

    const handleCity = (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, city:value}
        })
    }

    const handleZipCode = (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, zipCode:value}
        })
    }

    const handlePhoneNo= (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, phoneNo:value}
        })
    }

    const handleDate= (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, date:value}
        })
    }

    const handleHour= (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, hour:value}
        })
    }

    const handleComments= (e) => {
        const {value}=e.target;
        setUserData( prevState => {
            return {...prevState, comments:value}
        })
    }
    
    switch (step) {
        case 1:
            return (
                <div className='leaveThingsForm'>
                    <form onSubmit={() => setStep(2)}>
                        {/* <div className='step1'>
                            
                        </div> */}

                        <span>krok 1/4</span>
                        
                        <h1>Zaznacz co chcesz oddać:</h1><br/>

                        <div className='chooseElement'>
                            <input type="radio" name="things" value='ubrania, które nadają się do ponownego użycia' onChange={handleThings}></input>
                            <label> ubrania, które nadają się do ponownego użycia</label><br/>
                        </div>

                        <div className='chooseElement'>
                            <input type="radio" name="things" value='ubrania do wyrzucenia' onChange={handleThings}></input>
                            <label> ubrania do wyrzucenia</label><br/>
                        </div>

                        <div className='chooseElement'>
                            <input type="radio" name="things" value='zabawki' onChange={handleThings}></input>
                            <label> zabawki</label><br/>
                        </div>

                        <div className='chooseElement'>
                            <input type="radio" name="things" value='książki' onChange={handleThings}></input>
                            <label> książki</label><br/>
                        </div>

                        <div className='chooseElement'>
                            <input type="radio" name="things" value='inne' onChange={handleThings}></input>
                            <label> inne</label><br/>
                        </div>


                        <div className='btnBox'>
                            <button type='submit' className='btn' >Dalej</button>
                        </div>
                    </form>

                </div>          
            )
            
        case 2:
            return (
                <div className='leaveThingsForm'>
                    <span>krok 2/4</span>
                    <h1>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h1><br/>
                    <div className='step2Box'>
                        <p>Liczba 60l worków:</p>
                        <select onChange={handleBags}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

        <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(1)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(3)}>Dalej</button>
                    </div>
                </div>
            )

        case 3:
            return (
                <div className='leaveThingsForm'>

                    <span>krok 3/4</span>

                    <h1>Lokalizacja:</h1>                    
                    <select className='citySelect' onChange={handleTown}>
                        <option value="Poznań">Poznań</option>
                        <option value="Warszawa">Warszawa</option>
                        <option value="Kraków">Kraków</option>
                        <option value="Wrocław">Wrocław</option>
                        <option value="Katowice">Katowice</option>
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

                    <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(2)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(4)}>Dalej</button>
                    </div>
                </div>
            )

        case 4:
            return (
                <div className='leaveThingsForm'>
                    <div className='formDateBoxes'>

                        <div className='dateBox'>
                        <h2>Adres odbioru:</h2>
                            <label>Ulica:</label>
                            <input value={userData.street} onChange={handleStreet}></input>

                            <label>Miasto:</label>
                            <input value={userData.city} onChange={handleCity}></input>

                            <label>Kod pocztowy:</label>
                            <input value={userData.zipCode} onChange={handleZipCode}></input>

                            <label>Telefon:</label>
                            <input value={userData.phoneNo} onChange={handlePhoneNo}></input>
                        </div>

                        <div className='dateBox'>
                            <h2>Data odbioru:</h2>
                            <label>Data:</label>
                            <input value={userData.data} onChange={handleDate}></input>

                            <label>Godzina:</label>
                            <input value={userData.hour} onChange={handleHour}></input>

                            <label>Uwagi dla kuriera:</label>
                            <input className='lastInput' value={userData.comments} onChange={handleComments}></input>
                        </div>
                        

                    </div>
                    <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(3)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(5)}>Dalej</button>
                    </div>
                </div>
            )

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
                        <button className='btn' onClick={() => setStep(6)}>Potwierdzam</button>
                    </div>
                </div>                
            )

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