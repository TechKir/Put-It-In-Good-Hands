import React,{useState,useEffect} from 'react';

export default (props) =>{
    
    const [pagination, setPaginantion]=useState([{from:0,to:2},{from:3,to:5},{from:6,to:8}]);

    const Fundations = [{name:'"Dbam o Zdrowie"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Dla Dzieci"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Bez Domu"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"Szansa"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Promyk nadzieji"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Razem"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"Nieść Pomoc"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Nadzieja"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Jesteśmy z Tobą"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    const NonGovOrg = [{name:'"LOREM1"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"LOREM2"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"LOREM3"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"LOREM4"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"LOREM5"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"LOREM6"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    const LocalCollections = [{name:'"IPSUM1"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"IPSUM2"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"IPSUM3"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    //Fundations:
    const boxesQuantityF = Fundations.length/3; //We need in a box 3 rows.
    let btnsF=[];

    const btnGeneratorF = () => {
        for (let i=0; i<boxesQuantityF;i++){           
            btnsF.push(i)
        }
        return  
    };
    btnGeneratorF();

    //NonGovOrg:
    const boxesQuantityNGO = NonGovOrg.length/3; //We need in a box 3 rows.
    let btnsNGO=[];

    const btnsGeneratorNGO = () => {
        for (let i=0; i<boxesQuantityNGO;i++){           
            btnsNGO.push(i)
        }
        return  
    };
    btnsGeneratorNGO();

    //LocalCollections:
    const boxesQuantityLC = LocalCollections.length/3; //We need in a box 3 rows.
    let btnsLC=[];

    const btnsGeneratorLC = () => {
        for (let i=0; i<boxesQuantityLC;i++){           
            btnsLC.push(i)
        }
        return  
    };
    btnsGeneratorLC();

    switch (props.kindOfOrg) {
        case 1:
            return (
                <>
                    <div className="orgBox">
                        {Fundations.map( (element, index) => {

                            if(index>=pagination[props.paginationIndex].from && index<=pagination[props.paginationIndex].to){
                                return (
                                    <>
                                        <div className='orgItem'>
                                            <h3>Fundacja {element.name}</h3>
                                            <p>Cel i misja: {element.mission}</p>
                                            <p>{element.stuff}</p>
                                        </div>
                                    </>
                                )
                            }
                        } )}
                    </div>
                    <div className='paginationBox'>{
                    btnsF.length>1 ?
                    btnsF.map( (element,index) => {
                            return <button onClick={() => props.handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>   
                </>
            )
        case 2:
            return (
                <>
                    <div className="orgBox">
                        {NonGovOrg.map( (element, index) => {

                            if(index>=pagination[props.paginationIndex].from && index<=pagination[props.paginationIndex].to){
                                return (
                                    <>
                                        <div className='orgItem'>
                                            <h3>Organizacja pozarządowa {element.name}</h3>
                                            <p>Cel i misja: {element.mission}</p>
                                            <p>{element.stuff}</p>
                                        </div>
                                    </>
                                )
                            }
                        } )}
                    </div>
                    <div className='paginationBox'>{
                    btnsNGO.length>1 ?
                    btnsNGO.map( (element,index) => {
                            return <button onClick={() => props.handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>                   
                </>
            )
        case 3:
            return (
                <>
                    <div className="orgBox">
                        {LocalCollections.map( (element, index) => {

                            if(index>=pagination[props.paginationIndex].from && index<=pagination[props.paginationIndex].to){
                                return (
                                    <>
                                        <div className='orgItem'>
                                            <h3>Zbiórka lokalna {element.name}</h3>
                                            <p>Cel i misja: {element.mission}</p>
                                            <p>{element.stuff}</p>
                                        </div>
                                    </>
                                )
                            }
                        } )}
                    </div>
                    {}
                    <div className='paginationBox'>{
                    btnsLC.length>1 ?
                    btnsLC.map( (element,index) => {
                            return <button onClick={() => props.handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>
                </>
            )
    }
}
