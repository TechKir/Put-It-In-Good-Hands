import React,{useState, useEffect,} from 'react';
//import Step1 from './Steps/Step1';
// import Step2 from './Steps/Step2';
// import Step3 from './Steps/Step3';
// import Step4 from './Steps/Step4';
// import Summary from './Steps/Summary';
// import Thanks from './Steps/Thanks';

const LeaveThingsForm = () => {

    const [step,setStep]=useState(1);

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
                        <label> ubrania, które nadają się do ponownego użycia</label>
                        <input type="radio" name="things" value='goodClothes' onChange={handleThings}></input>

                        <label> ubrania do wyrzucenia</label>
                        <input type="radio" name="things" value='trashClothes' onChange={handleThings}></input>

                        <label> zabawki</label>
                        <input type="radio" name="things" value='toys' onChange={handleThings}></input>

                        <label> Książki</label>
                        <input type="radio" name="things" value='books' onChange={handleThings}></input>

                        <label> inne</label>
                        <input type="radio" name="things" value='other' onChange={handleThings}></input>

                        <div className='btnBox'>
                            <button type='submit' className='btn' >Dalej</button>
                        </div>
                    </form>

                </div>          
            )
            
        case 2:
            return (
                <div className='leaveThingsForm'>
                    <select onChange={handleBags}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
        <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(1)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(3)}>Dalej</button>
                    </div>
                </div>
            )

        case 3:
            return (
                <div className='leaveThingsForm'>
                    <h2>Wybierz miasto:</h2>
                    <select onChange={handleTown}>
                        <option value="Poznań">Poznań</option>
                        <option value="Warszawa">Warszawa</option>
                        <option value="Kraków">Kraków</option>
                        <option value="Wrocław">Wrocław</option>
                        <option value="Katowice">Katowice</option>
                    </select>

                    <h2>Komu chcesz pomóc:</h2>
                    <input type="checkbox" name="dzieciom" value='dzieciom' onChange={handleWhoHelp}></input>
                    <label>dzieciom</label>

                    <input type="checkbox" name="samotnym matkom" value='samotnym matkom' onChange={handleWhoHelp}></input>
                    <label>samotnym matkom</label>

                    <input type="checkbox" name="bezdomnym" value='bezdomnym' onChange={handleWhoHelp}></input>
                    <label>bezdomnym</label>

                    <input type="checkbox" name="niepełnosprawnym" value='niepełnosprawnym' onChange={handleWhoHelp}></input>
                    <label>niepełnosprawnym</label>

                    <input type="checkbox" name="osobom starszym" value='osobom starszym' onChange={handleWhoHelp}></input>
                    <label>osobom starszym</label>

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
                    <div className='btnBox'>
                        <button className='btn' onClick={() => setStep(4)}>Wstecz</button>
                        <button className='btn' onClick={() => setStep(6)}>Dalej</button>
                    </div>
                </div>
            )

        case 6:
            return <p>thank you</p>
            default: 
                    return null;
    }
}

export default LeaveThingsForm;