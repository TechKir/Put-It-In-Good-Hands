import React,{useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../App';
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

    const [whoHelp,setWhoHelp]=useState([])
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
                            <input type='checkbox' name="dzieciom" value='dzieciom' onChange={handleWhoHelp}></input>
                        </div>

                        <div className='chooseElements'>
                            <input type='checkbox' name="samotnym matkom" value='samotnym matkom' onChange={handleWhoHelp}></input>
                        </div>

                        <div className='chooseElements'>
                            <input type='checkbox' name="bezdomnym" value='bezdomnym' onChange={handleWhoHelp}></input>
                        </div>

                        <div className='chooseElements'>
                            <input type='checkbox' name="niepełnosprawnym" value='niepełnosprawnym' onChange={handleWhoHelp}></input>
                        </div>

                        <div className='chooseElements'>
                            <input type='checkbox' name="osobom starszym" value='osobom starszym' onChange={handleWhoHelp}></input>
                        </div>
                    </div>
                                                            

                    <h2>Wpisz nazwę konretnej organizacji:</h2>
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
                    <div className='btnBox'>
                        <label>Ulica:</label>
                        <input value={userData.street} onChange={handleStreet}></input>

                        <label>Miasto:</label>
                        <input value={userData.city} onChange={handleCity}></input>

                        <label>Kod pocztowy:</label>
                        <input value={userData.zipCode} onChange={handleZipCode}></input>

                        <label>Telefon:</label>
                        <input value={userData.phoneNo} onChange={handlePhoneNo}></input>
                      
                        <label>Data:</label>
                        <input value={userData.data} onChange={handleDate}></input>

                        <label>Godzina:</label>
                        <input value={userData.hour} onChange={handleHour}></input>

                        <label>Uwagi dla kuriera:</label>
                        <input value={userData.comments} onChange={handleComments}></input>

                        <button className='btn' onClick={() => setStep(3)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(5)}>Dalej</button>
                    </div>
                </div>
            )

        case 5:
            return (
                <div className='leaveThingsForm'>
                    <div>
                        <h1>Podsumowanie twojej darowizny</h1>

                        <strong>Oddajesz:</strong>
                        <p>{quantOfBags} {quantOfBags==1 ? "worek" : "worki"}, {kindOfThings}, {whoHelp.map( (element,index) => <span key={index}>{element} </span> )}</p>
                        <p>dla lokalizacji: {town}</p>

                        <strong>Adres odbioru:</strong>
                        <p>Ulica</p><span> {userData.street}</span>
                        <p>Miasto</p><span> {userData.city}</span>
                        <p>Kod pocztowy</p><span> {userData.zipCode}</span>
                        <p>Numer telefonu</p><span> {userData.phoneNo}</span>
                        <br></br>
                        <strong>Termin odbioru:</strong>
                        <p>Data</p><span> {userData.date}</span>
                        <p>Godzina</p><span> {userData.hour}</span>
                        <p>Uwagi dla kuriera</p><span> {userData.comments}</span>
                    </div>  
                    <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(4)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(6)}>Potwierdzam</button>
                    </div>
                </div>
            )

        case 6:
            return (
                <div>
                    <h1>Dziękujemy za wypełnienie formularza.</h1>
                    <p>Na maila prześlemy wszelkie</p>
                    <p>informacje o odbiorze.</p>
                </div>
            )
            default: 
                    return null;
    }
}

export default LeaveThingsForm;