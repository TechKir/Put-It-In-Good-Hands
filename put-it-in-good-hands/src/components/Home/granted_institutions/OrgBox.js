import React,{useState,useEffect} from 'react';
import Pagination from './Paginantion';
import classnames from 'classnames';
import firebase from "firebase/app";
import 'firebase/database';

export default () =>{
    const [currentTypeOrg, setCurrentTypeOrg] = useState(1);
    const [organizations, setOrganizations] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orgsPerPage]=useState(3);
    
    useEffect(() => {
        //CODE IS IMPLEMENTED BY TWO SOLUTION: JSONSERVER AND FIREBASE. DEFAULT IS FIREBASE. YOU CAN COMMENT FIRST SOLUTION AND UNCOMMENT SECOND TO CHECK HOW DOES IT WORK.
        
        //FIREBASE:
        firebase.database().ref('organizations').once('value')
            .then( (snapshot) => {
            let dataFromFireBase = snapshot.val();
            setOrganizations(dataFromFireBase)})            
            .catch(error => console.log('error'))

        //JSONSERVER:
        // fetch('http://localhost:3005/organizations',{mode:"no-cors"})
        //     .then(res => res.json())
        //     .then(data => setOrganizations(data) )
        //     .catch(error => console.log('error'))
    }, []);

    const handleCurrentTypeOrg = (e) => {
        setCurrentTypeOrg(e.target.id)
        setCurrentPage(1)
    };

    const getOrg = () => organizations?.find(org => {
        return org.id === parseInt(currentTypeOrg)
    })
    
    //Get current orgs (only 3 per page):
    const indexOfLastOrg = currentPage * orgsPerPage;
    const indexOfFirstOrg = indexOfLastOrg - orgsPerPage;
    const displayedOrgs = getOrg()?.items.slice(indexOfFirstOrg, indexOfLastOrg);

    //Change page:
    const paginate = pageNumber => setCurrentPage(pageNumber);
 
    return (
        <>
            <div className='btnBox paddingTopCorrect'>
                {organizations?.map((org,index) => (
                    <button className={classnames('orgBtn', { active: org.id === currentTypeOrg })} key={index} id={org.id} onClick={handleCurrentTypeOrg}>{org.name}</button>
                ))}
            </div>

            <h3 className='orgText'>W naszej bazie znajdziesz listę Fundacji, z którymi współpracujemy. Możesz sprawdzic czym się zajmują, komu pomagają i czego potrzebują.</h3>

            <div className="orgBox">
                {displayedOrgs?.map( (item,index) => {
                    return (
                        <div key={index} className='orgItem'>
                            <h3>{item.type} {item.name}</h3>
                            <div>
                                <p> Cel i misja: {item.mission}</p>
                                <p> {item.stuff}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='paginationBox'>
                {getOrg()?.items.length && <Pagination orgsPerPage={orgsPerPage} totalOrgItems={getOrg()?.items.length} paginate={paginate} currentPage={currentPage}/>}
            </div>
        </>
    )
}
