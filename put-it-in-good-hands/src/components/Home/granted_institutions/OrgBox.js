import React,{useState,useEffect} from 'react';

export default (props) =>{
    
    //const [kindOfOrg,setKindOfOrg]=useState(1);
    const [pagination, setPaginantion]=useState([{from:0,to:2},{from:3,to:5},{from:6,to:8}]);
    const [paginationIndex,setPaginationIndex]=useState(0);
    const Fundations = [{name:'"Dbam o Zdrowie"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Dla Dzieci"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Bez Domu"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"Szansa"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Promyk nadzieji"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Razem"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"Nieść Pomoc"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"Nadzieja"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"Jesteśmy z Tobą"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    const NonGovOrg = [{name:'"LOREM1"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"LOREM2"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"LOREM3"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'},{name:'"LOREM4"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"LOREM5"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"LOREM6"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    const LocalCollections = [{name:'"IPSUM1"', mission:'Pomoc osobom znajdującym się w trudnej sytuacji życiowej.', stuff:'ubrania, jedzenie, sprzęt AGD, meble, zabawki'},{name:'"IPSUM2"', mission:'Pomoc dzieciom ubogich rodzin', stuff:'ubrania, meble, zabawki'},{name:'"IPSUM3"', mission:'Pomoc osobom nie posiadających miejsca zamieszkania.', stuff:'ubrania, jedzenie, ciepłe koce'}];

    //Fundations:
    const btnQuantity = Fundations.length/3; //We need in a box 3 rows.
    let btnArrayIndex=[];

    const btnGenerator = () => {
        for (let i=0; i<btnQuantity;i++){           
            btnArrayIndex.push(i)
        }
        return  
    }
    btnGenerator()

    //NonGovOrg:
    const btnsQuantity2 = NonGovOrg.length/3; //We need in a box 3 rows.
    let btnsNonGovOrg=[];

    const btnsGenerator2 = () => {
        for (let i=0; i<btnsQuantity2;i++){           
            btnsNonGovOrg.push(i)
        }
        return  
    }
    btnsGenerator2()

    //LocalCollections:
    const btnsQuantity3 = LocalCollections.length/3; //We need in a box 3 rows.
    let btnsLocalCol=[];

    const btnsGenerator3 = () => {
        for (let i=0; i<btnsQuantity3;i++){           
            btnsLocalCol.push(i)
        }
        return  
    }
    btnsGenerator3()

    const handlePagination = index => {
        console.log('zmieniam paginacje')           
        return setPaginationIndex(index)
    }

    switch (props.kindOfOrg) {
        case 1:
            return (
                <>
                    <div className="orgBox">
                        {Fundations.map( (element, index) => {

                            if(index>=pagination[paginationIndex].from && index<=pagination[paginationIndex].to){
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
                    btnArrayIndex.length>1 ?
                    btnArrayIndex.map( (element,index) => {
                            return <button onClick={() => handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>   
                </>
            )
        case 2:
            return (
                <>
                    <div className="orgBox">
                        {NonGovOrg.map( (element, index) => {

                            if(index>=pagination[paginationIndex].from && index<=pagination[paginationIndex].to){
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
                    btnsNonGovOrg.length>1 ?
                    btnsNonGovOrg.map( (element,index) => {
                            return <button onClick={() => handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>                   
                </>
            )
        case 3:
            return (
                <>
                    <div className="orgBox">
                        {LocalCollections.map( (element, index) => {

                            if(index>=pagination[paginationIndex].from && index<=pagination[paginationIndex].to){
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
                    btnsLocalCol.length>1 ?
                    btnsLocalCol.map( (element,index) => {
                            return <button onClick={() => handlePagination(index)}>{index+1}</button>
                    })
                    : null}</div>
                </>
            )
    }
}
