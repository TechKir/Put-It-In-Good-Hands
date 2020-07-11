import React,{useState,useEffect} from 'react';
import Pagination from './Paginantion';
import classnames from 'classnames';

export default () =>{
    const [currentTypeOrg, setCurrentTypeOrg] = useState(1);
    const [organizations, setOrganizations] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orgsPerPage]=useState(3);
    
    useEffect(() => {
        fetch('http://localhost:3005/organizations')
            .then(res => res.json())
            .then(data => setOrganizations(data) )
            .catch(error => console.log('error'))
    }, []);

    const handleCurrentTypeOrg = (e) => {
        setCurrentTypeOrg(e.target.id)
        setCurrentPage(1)
    };

    const getOrg = () => organizations?.find(org => org.id == currentTypeOrg)
    
    //Get current orgs (only 3 per page):
    const indexOfLastOrg = currentPage * orgsPerPage;
    const indexOfFirstOrg = indexOfLastOrg - orgsPerPage;
    const displayedOrgs = getOrg()?.items.slice(indexOfFirstOrg, indexOfLastOrg);

    //Change page:
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <div className='btnBox'>
                {organizations?.map((org,index) => (
                    <button className={classnames('orgBtn', { active: org.id == currentTypeOrg })} key={index} id={org.id} onClick={handleCurrentTypeOrg}>{org.name}</button>
                ))}
            </div>

            <h3 className='orgText'>W naszej bazie znajdziesz listę Fundacji, z którymi współpracujemy. Możesz sprawdzic czym się zajmują, komu pomagają i czego potrzebują.</h3>

            <div className="orgBox">
                {displayedOrgs?.map( (item,index) => {
                    return (
                        <div key={index} className='orgItem'>
                            <h3>{item.type} {item.name}</h3>
                            <p> Cel i misja: {item.mission}</p>
                            <p> {item.stuff}</p>
                        </div>
                    )
                })}
            </div>
            <div className='paginationBox'>
                {getOrg()?.items.length > orgsPerPage && <Pagination orgsPerPage={orgsPerPage} totalOrgItems={getOrg()?.items.length} paginate={paginate} currentPage={currentPage}/>}
            </div>

        </>
    )
}